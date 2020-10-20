'use strict';

(function () {
  // let filtersElement = document.querySelector('.map__filters-container');
  // let mapElement = document.querySelector('.map');
  let mainPins = document.querySelector('.map__pin--main');

  mainPins.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      // activatePage();
      window.form.activate();
    }
  });

  mainPins.addEventListener('click', function (evt) {
    // activatePage();
    window.form.activate();
  });


  mainPins.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPins.style.top = (mainPins.offsetTop - shift.y) + 'px';
      mainPins.style.left = (mainPins.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
