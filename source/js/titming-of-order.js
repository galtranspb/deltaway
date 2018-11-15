(function () {

  var bar = document.querySelector('#timing-of-order .slider__bar'),
    thumb = document.querySelector('#timing-of-order .slider__thumb'),
    output = document.querySelector('#timing-of-order .slider__output');

  var onSlideChange = function (value) {
    var NUMBER = 12;
    var str = '';
    var month = value * NUMBER / 100 ^ 0;


    var getMonthDeclination = function (month) {
      if (month === 1) {
        str = 'месяц';
      } else if (month >= 2 && month <= 4) {
        str = 'месяца';
      } else {
        str = 'месяцев';
      }
      return str;
    }

    output.textContent = month + ' ' + getMonthDeclination(month);
  }

  window.slider(bar, thumb, onSlideChange);
})();
