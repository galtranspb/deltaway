'use strict';

(function () {

  var MAX_FILES_SIZE = 31457280;
  var fileTypes = ['application/pdf', 'image/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/tiff'];
  var errorMessage = {
    FALSE_SIZE: 'Размер файлов превышает 30 Мб',
    FALSE_TYPE: ' имеет неподходящий формат файла'
  };

  var input = document.querySelector('#upload');

  var compareType = function (file) {
    return fileTypes.some(function (el) {
      return el === file.type;
    });
  };

  var devideByType = function (list, trueType, falseType) {
    Array.from(list).forEach(function (el) {
      if (compareType(el, fileTypes)) {
        trueType.push(el);
      } else {
        falseType.push(el);
      }
    });
  };

  var handleFalseType = function (arr) {
    if (arr) {
      arr.forEach(function (el) {
        console.log(el.name + errorMessage.FALSE_TYPE);
      });
    } else {
      return false;
    }
  };

  var getTotalFilesSize = function (arr) {
    var total = [];
    arr.forEach(function (el) {
      total.push(el.size);
    });
    return total.reduce(function (sum, current) {
      return sum + current;
    }, 0);
  };

  var checkInputLoad = function (list) {
    var trueArr = [];
    var falseArr = [];

    devideByType(list, trueArr, falseArr);
    handleFalseType(falseArr);

    if (getTotalFilesSize(trueArr) <= MAX_FILES_SIZE) {
      // отправить через Ajax(sendfile(trueArr)) или передать в data функции formSubmit()
      window.showUploadedFiles(trueArr);
    } else {
      console.log(errorMessage.FALSE_SIZE);
    }
  };

  var onInputLoadChange = function () {
    checkInputLoad(input.files);
  };

  input.addEventListener('change', onInputLoadChange);

})();
