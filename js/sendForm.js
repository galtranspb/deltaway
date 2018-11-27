'use strict';

(function () {

  window.sendForm = function (data, url) {
    var request = new XMLHttpRequest();

    request.addEventListener('load', function () {
      if (request.status === 200) {
        console.log(request.response);
      } else {
        console.log('Статус ответа: ' + request.status + ' ' + request.statusText);
      }
    });

    request.addEventListener('error', function () {
      console.log('Произошла ошибка соединения');
    });
    request.addEventListener('timeout', function () {
      console.log('Запрос не успел выполниться за ' + request.timeout + 'мс');
    });

    request.timeout = 10000;
    request.open("POST", url);
    request.send(data);
  };

})();
