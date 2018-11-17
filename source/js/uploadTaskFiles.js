'use strict';

(function () {

  $(document).ready(function () {

    var ENTER_KEYCODE = 13;
    var MAX_FILES_SIZE = 31457280;
    var fileTypes = ['pdf', 'jpeg', 'jpg', 'png', 'tiff'];
    var errorMessage = {
      FALSE_SIZE: 'Размер файлов превышает 30 Мб',
      FALSE_TYPE: ' имеет неподходящий формат файла'
    };

    var input = document.querySelector('#upload'),
      preview = document.querySelector('#preview'),
      template = document.querySelector('#li-task-template').content.querySelector('.form__item--upload');

    var deletePrevFiles = function (list) {
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
    };

    var getFileType = function (file, arr) {
      var fileName = file.name.toLowerCase();
      return arr.some(function (el) {
        return fileName.endsWith(el);
      });
    };

    var devideByType = function (list, trueType, falseType) {
      Array.from(list).forEach(function (el) {
        if (getFileType(el, fileTypes)) {
          trueType.push(el);
        } else {
          falseType.push(el);
        }
      });
    }

    var outputFalseType = function (arr) {
      if (arr) {
        arr.forEach(function (el) {
          console.log(el.name + errorMessage.FALSE_TYPE);
        });
      } else {
        return false;
      }
    };

    var getMaxFilesSize = function (arr) {
      var sizeArr = [];
      arr.forEach(function (el) {
        sizeArr.push(el.size);
      });
      return sizeArr.reduce(function (sum, current) {
        return sum + current;
      }, 0);
    };

    var getOneLabel = function (obj) {
      var liElement = template.cloneNode(true);
      liElement.querySelector('.form__uploaded-file').textContent = obj.name;
      return liElement;
    };

    var onListCLick = function (evt) {
      var target = evt.target;
      preview.removeChild(target.parentNode);
    };

    var onListEnterPress = function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        var target = evt.target;
        preview.removeChild(target.parentNode);
      }
    };

    var displayLabels = function (arr) {
      if (getMaxFilesSize(arr) <= MAX_FILES_SIZE) {
        var fragment = document.createDocumentFragment();
        arr.forEach(function (el) {
          fragment.appendChild(getOneLabel(el));
        });
        preview.appendChild(fragment);
        preview.addEventListener('click', onListCLick);
        preview.addEventListener('keydown', onListEnterPress);
      } else {
        console.log(errorMessage.FALSE_SIZE);
      }
    };

    var onInputFileChange = function () {
      var trueTypeArr = [];
      var falseTypeArr = [];

      deletePrevFiles(preview);
      devideByType(input.files, trueTypeArr, falseTypeArr);
      outputFalseType(falseTypeArr);
      displayLabels(trueTypeArr);
    };

    input.addEventListener('change', onInputFileChange);
  });

})();
