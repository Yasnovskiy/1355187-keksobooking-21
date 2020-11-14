'use strict';

(function () {
  const mapElement = document.querySelector(`.map`);
  const formElement = document.querySelector(`.map__filters`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const addressElement = document.querySelector(`[name="address"]`);

  const getMainPinPosition = function () {
    return {
      x: mainPin.offsetLeft + mainPin.offsetWidth / 2,
      y: mainPin.offsetTop + mainPin.offsetHeight
    };
  };

  const setMainPinPosition = function (x, y) {
    mainPin.style.top = (y - mainPin.offsetHeight) + `px`;
    mainPin.style.left = (x - mainPin.offsetWidth / 2) + `px`;
  };

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      window.main.activate();
    }
  });

  mainPin.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    window.main.activate();
  });

  mainPin.addEventListener(`mousedown`, function (evt) {
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

      const pinPosition = getMainPinPosition();

      let nextY = pinPosition.y - shift.y;
      let nextX = pinPosition.x - shift.x;

      if (nextX < 0) {
        nextX = 0;
      }

      if (nextX > 1200) {
        nextX = 1200;
      }

      if (nextY < 130) {
        nextY = 130;
      }

      if (nextY > 630) {
        nextY = 630;
      }

      setMainPinPosition(nextX, nextY);

      window.form.address(nextX, nextY);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

  });

  const mainPinStart = function () {
    let pinX = `570px`;
    let pinY = `375px`;

    mainPin.style.left = pinX;
    mainPin.style.top = pinY;

    addressElement.value = `603, 440`;
  };

  const disabledFilters = function () {
    formElement.reset();
  };

  const activateMap = function () {
    mapElement.classList.remove(`map--faded`);
  };

  const deactivateMap = function () {
    mainPinStart();
    mapElement.classList.add(`map--faded`);
  };

  let dataAds = [];
  const setData = function (data) {
    dataAds = data;
  };

  const rerenderPins = function () {
    window.card.closeCard();
    window.pin.removePins();
    const filteredData = window.filter.apply(dataAds);
    window.pin.render(filteredData.slice(0, 5));
  };

  mainPinStart();

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    getMainPinPosition: getMainPinPosition,
    disabledFilters: disabledFilters,
    setData: setData,
    rerenderPins: rerenderPins
  };
})();
