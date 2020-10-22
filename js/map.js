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

      let nixeY = mainPins.offsetTop - shift.y;
      let nixeX = mainPins.offsetLeft - shift.x;

      if (nixeX < 0) {
        nixeX = 0;
      }

      if (nixeX > 1135) {
        nixeX = 1135;
      }

      if (nixeY < 130) {
        nixeY = 130;
      }

      if (nixeY > 620) {
        nixeY = 620;
      }


      mainPins.style.top = nixeY + 'px';
      mainPins.style.left = nixeX + 'px';

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
