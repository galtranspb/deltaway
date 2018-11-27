(function () {

  $(document).ready(function () {

    var convertValueToMoney = {
      '0': 'до 1',
      '1': '1-5',
      '2': '> 5'
    }

    $('#slider-range-budget').slider({
      range: 'min',
      min: 0,
      max: 2,
      change: function (event, ui) {
        $('#budget-output').text(convertValueToMoney[ui.value]);
        $('#budget').attr('value', ui.value);
      }
    });
  });

})();
