'use strict';

(function () {

  var form = document.querySelector('#form'),
    input = form.querySelector('#upload');

  var url = '#',
    checkedFiles = [];

  var cleanPreview = function () {
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
  };

  var resetForm = function (form) {
    var preview = form.querySelector('#preview');

    form.reset();
    cleanPreview();
    checkedFiles = [];
    $('#slider-range-budget').slider('value', 0);
    $('#slider-range-term').slider('value', 2);
  };

  var onInputLoadChange = function () {
    checkedFiles = window.checkUploadedFiles(input.files);
    if (checkedFiles) {
      window.handleUploadedFiles(checkedFiles);
    }
  };

  var onFormSubmit = function (evt) {
    var formData = new FormData(form);

    evt.preventDefault();
    if (checkedFiles) {
      formData.set('upload', checkedFiles);
    }
    window.sendForm(formData, url);
    resetForm(form);
  };

  input.addEventListener('change', onInputLoadChange);
  form.addEventListener('submit', onFormSubmit);

})();
