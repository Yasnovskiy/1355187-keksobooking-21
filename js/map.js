'use strict';

(function () {
  const mapElement = document.querySelector(`.map`);
  const formElement = document.querySelector(`.map__filters`);
  const mainPins = document.querySelector(`.map__pin--main`);
  const addressElement = document.querySelector(`[name="address"]`);

  mainPins.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      window.main.activatePage();
    }
  });

  mainPins.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    window.main.activatePage();
  });

  mainPins.addEventListener(`mousedown`, function (evt) {
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

      if (nextX < -30) {
        nextX = -30;
      }

      if (nextX > 1165) {
        nextX = 1165;
      }

      if (nextY < 100) {
        nextY = 100;
      }

      if (nextY > 620) {
        nextY = 620;
      }

      mainPins.style.top = nextY + `px`;
      mainPins.style.left = nextX + `px`;

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

  const getDataPin = function () {
    let dataPit = {
      x: mainPins.offsetLeft,
      y: mainPins.offsetTop
    };

    return dataPit;
  };

  const mainPinStart = function () {
    let pinX = `570px`;
    let pinY = `375px`;

    mainPins.style.left = pinX;
    mainPins.style.top = pinY;

    addressElement.value = ` 613, 428`;
  };

  const disabledFilters = function () {
    formElement.reset();
  };

  const activate = function () {
    mapElement.classList.remove(`map--faded`);
  };

  const deactivate = function () {
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
    activate: activate,
    deactivate: deactivate,
    getdatapin: getDataPin,
    disabledFilters: disabledFilters,
    setData: setData,
    rerenderPins: rerenderPins
  };
})();
