'use strict';

(function () {

  var ENTER_KEYCODE = 13;

  var preview = document.querySelector('#preview'),
    template = document.querySelector('#li-task-template').content.querySelector('.form__item--upload');

  var deletePrevFiles = function (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
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
    var fragment = document.createDocumentFragment();
    arr.forEach(function (el) {
      fragment.appendChild(getOneLabel(el));
    });
    preview.appendChild(fragment);
    preview.addEventListener('click', onListCLick);
    preview.addEventListener('keydown', onListEnterPress);
  };

  window.showUploadedFiles = function (arr) {
    deletePrevFiles(preview);
    displayLabels(arr);
  };

})();
