(function () {

  window.slider = function (bar, thumb, callback) {

    var onThumbDragstart = function () {
      return false;
    }

    var moveThumb = function (evt) {
      var THUMB_WIDTH = thumb.offsetWidth;

      var barWidth = {
        min: bar.offsetLeft,
        max: bar.offsetLeft + bar.offsetWidth - THUMB_WIDTH
      }

      var thumbCoordX = thumb.offsetLeft + evt.movementX;
      var value = thumbCoordX * 100 / barWidth.max ^ 0;

      if (thumbCoordX < barWidth.min) {
        thumbCoordX = barWidth.min;
      } else if (thumbCoordX > barWidth.max) {
        thumbCoordX = barWidth.max;
      }

      thumb.style.left = thumbCoordX + 'px';
      callback(value);
    };

    var onThumbMousedown = function () {

      var onDocumentMousemove = function (evt) {
        moveThumb(evt);
      };

      var onThumbMouseup = function () {
        document.removeEventListener('mousemove', onDocumentMousemove);
        thumb.removeEventListener('mouseup', onThumbMouseup);
      };

      document.addEventListener('mousemove', onDocumentMousemove);
      thumb.addEventListener('mouseup', onThumbMouseup);
    };

    thumb.addEventListener('dragstart', onThumbDragstart);
    thumb.addEventListener('mousedown', onThumbMousedown);
  };

}());
