'use strict';

(function () {

  var ENTER_KEYCODE = 13;

  var preview = document.querySelector('#preview'),
  template = document.querySelector('#li-task-template').content.querySelector('.form__item--upload');

  var cleanPreview = function () {
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
  };

  var createOneLabel = function (obj) {
    var liElement = template.cloneNode(true);
    liElement.querySelector('.form__uploaded-file').textContent = obj.name;
    return liElement;
  };

  var findIndex = function (target) {
    var index;
    Array.from(preview.children).forEach(function (el, i) {
      if (el === target) {
        index = i;
      }
    })
    return index;
  };

  var handleRemovableFile = function (evt, arr) {
    var target = evt.target;
    while (target != this) {
      if (target.classList.contains('form__item--upload')) {
        var index = findIndex(target);
        preview.removeChild(target);
        arr.splice(index, 1);
        return;
      }
      target = target.parentNode;
    }
  };

  var onListCLick = function (evt, arr) {
    handleRemovableFile(evt, arr);
  };

  var onListEnterPress = function (evt, arr) {
    if (evt.keyCode === ENTER_KEYCODE) {
      handleRemovableFile(evt, arr);
    }
  };

  var displayLabels = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (el) {
      fragment.appendChild(createOneLabel(el));
    });
    preview.appendChild(fragment);
  };

  window.handleUploadedFiles = function (arr) {
    cleanPreview();
    displayLabels(arr);
    preview.addEventListener('click', function (evt) {
      onListCLick(evt, arr);
    });
    preview.addEventListener('keydown', function (evt) {
      onListEnterPress(evt, arr);
    });
  };

  // window.handleUploadedFiles = {
  //   cleanPreview: cleanPreview,
  //   handleUploadedFiles: handleUploadedFiles 
  // };

        // form.js
  // var onInputLoadChange = function () {
  //   checkedFiles = window.checkUploadedFiles(input.files);
  //   if (checkedFiles) {
  //21   window.handleUploadedFiles.handleUploadedFiles(checkedFiles);      
  //   }
  // }; 
   //    error form.js 21 - handleUploadedFiles is not a function


})();
