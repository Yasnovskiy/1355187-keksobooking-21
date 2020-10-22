'use strict';

(function () {
  let mapElement = document.querySelector('.map');
  let mainPins = document.querySelector('.map__pin--main');

  mainPins.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      window.main.activatePage();
    }
  });

  mainPins.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.main.activatePage();
  });

  mainPins.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
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

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  const activate = function () {
    mapElement.classList.remove('map--faded');
  };

  window.map = {
    activate: activate
  };
})();
