'use strict';

(function () {

  var form = document.querySelector('#form'),
    input = form.querySelector('#upload');

  var url = '#',
    checkedFiles = [];

  var onInputLoadChange = function () {
    checkedFiles = window.checkUploadedFiles(input.files, checkedFiles);
    window.showUploadedFiles(checkedFiles);
  };

  var onFormSubmit = function (evt) {
    var formData = new FormData(form);

    evt.preventDefault();
    if (checkedFiles) {
      formData.set('upload', checkedFiles);
    }
    window.sendForm(formData, url);
  };

  input.addEventListener('change', onInputLoadChange);
  form.addEventListener('submit', onFormSubmit);

})();
