(function () {

  $(document).ready(function () {

    var getOutput = function (value) {
      var content = '';

      switch (value) {
        case 0:
          content = 'до 1';
          break;
        case 1:
          content = '1-5';
          break;
        default:
          content = '> 5';
      }
      return content;
    }

    $('#slider-range-budget').slider({
      range: 'min',
      min: 0,
      max: 2,
      value: 0,
      change: function (event, ui) {
        $('#budget-output').text(getOutput(ui.value));
      }
    });

  });

})();
