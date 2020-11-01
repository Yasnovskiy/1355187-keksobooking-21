'use strict';

(function () {
  let mapElement = document.querySelector('.map');
  let formElement = document.querySelector('.map__filters');
  let mainPins = document.querySelector('.map__pin--main');
  let addressElement = document.querySelector('[name="address"]');

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

      let nextY = mainPins.offsetTop - shift.y;
      let nextX = mainPins.offsetLeft - shift.x;

      if (nextX < 0) {
        nextX = 0;
      }

      if (nextX > 1135) {
        nextX = 1135;
      }

      if (nextY < 120) {
        nextY = 120;
      }

      if (nextY > 620) {
        nextY = 620;
      }

      mainPins.style.top = nextY + 'px';
      mainPins.style.left = nextX + 'px';

      window.form.address(nextX, nextY);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  const getDataPin = function () {
    let dataPit = {
      x: mainPins.offsetLeft,
      y: mainPins.offsetTop
    };

    return dataPit;
  };

  const mainPinStart = function () {
    let pinX = '570px';
    let pinY = '375px';

    mainPins.style.left = pinX;
    mainPins.style.top = pinY;

    addressElement.value = ' X 570 , Y 375';

  };

  const disabledFilters = function () {
    formElement.reset();
  };

  const activate = function () {
    mapElement.classList.remove('map--faded');
  };

  const deactivateActivate = function () {
    mainPinStart();
    mapElement.classList.add('map--faded');
  };

  window.map = {
    activate: activate,
    deactivateActivate: deactivateActivate,
    getdatapin: getDataPin,
    disabledFilters: disabledFilters
  };
})();
