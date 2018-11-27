(function () {

  $(document).ready(function () {

    var getMonthDeclination = function (value) {
      var content = '';

      switch (value) {
        case 1:
          content = ' месяц';
          break;
        case 2:
        case 3:
        case 4:
          content = ' месяца';
          break;
        default:
          content = ' месяцев';
      }
      return content;
    }

    $('#slider-range-term').slider({
      range: 'min',
      min: 1,
      max: 12,
      value: 2,
      change: function (event, ui) {
        $('#term-output').text(ui.value + getMonthDeclination(ui.value));
        $('#term').attr('value', ui.value);
      }
    });
  });

})();
