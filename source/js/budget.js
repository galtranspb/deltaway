(function () {

  var bar = document.querySelector('#budget .slider__bar'),
    thumb = document.querySelector('#budget .slider__thumb'),
    output = document.querySelector('#budget .slider__output');

  var onSlideChange = function (value) {
    var str = '';

    if (value < 50) {
      str = 'до 1';
    } else if (value < 100) {
      str = '1-5';
    } else {
      str = '> 5';
    }

    // bar.style.backgroundImage = 'linear-gradient(to right, red 50%, gray 50%);';
    // bar.style.backgroundImage = 'linear-gradient(to left, red ' + value + '%, gray ' + value + '%);';
    output.textContent = str;
  }

  window.slider(bar, thumb, onSlideChange);
})();
