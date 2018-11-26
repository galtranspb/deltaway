'use strict';

(function () {

  var MAX_FILES_SIZE = 31457280;
  var fileTypes = ['application/pdf', 'image/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/tiff'];
  var errorMessage = {
    FALSE_SIZE: 'Размер файлов превышает 30 Мб',
    FALSE_TYPE: ' имеет неподходящий формат файла'
  };

  var compareType = function (file) {
    return fileTypes.some(function (el) {
      return el === file.type;
    });
  };

  var handleFalseType = function (el) {
    if (el) {
      console.log(el.name + errorMessage.FALSE_TYPE);
    } else {
      return false;
    }
  };

  window.checkUploadedFiles = function (list) {
    var arr = [],
      size = [];
    Array.from(list).forEach(function (el) {
      if (compareType(el, fileTypes)) {
        arr.push(el);
        size.push(el.size);
      } else {
        handleFalseType(el);
      }
    });

    var amount = size.reduce(function (sum, current) {
      return sum + current;
    }, 0);

    if (amount <= MAX_FILES_SIZE) {
      return arr;
    } else {
      console.log(errorMessage.FALSE_SIZE);
      return arr = [];
    }
  };

})();
