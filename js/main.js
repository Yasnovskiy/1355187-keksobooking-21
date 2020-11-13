'use strict';
(function () {
  const field = document.querySelectorAll(`fieldset`);
  const map = document.querySelector(`.map__filters`);
  const mapChild = map.querySelectorAll(`.map__filter`);

  const formOn = function () {
    for (let i = 0; i < field.length; i++) {
      field[i].removeAttribute(`disabled`);
    }

    for (let i = 0; i < mapChild.length; i++) {
      mapChild[i].removeAttribute(`disabled`);
    }
  };

  const formOff = function () {
    for (let i = 0; i < field.length; i++) {
      field[i].setAttribute(`disabled`, `disabled`);
    }

    for (let i = 0; i < mapChild.length; i++) {
      mapChild[i].setAttribute(`disabled`, `disabled`);
    }
  };

  let isActive = false;
  const activatePage = function () {
    if (!isActive) {
      isActive = true;
      window.form.activate();
      window.map.activate();
      const dataPin = window.map.getdatapin();
      window.form.address(dataPin.x, dataPin.y);
      formOn();

      window.load(onSuccess, onError);
    }
  };

  const deactivatePage = function () {
    window.form.deactivate();
    window.filter.clearFilter();
    window.map.deactivate();
    window.pin.removePins();
    window.card.closeCard();
    formOff();
    isActive = false;
  };

  const onSuccess = function (data) {
    window.map.setData(data);
    window.map.rerenderPins();
  };

  const onError = function (data) {
    window.message.showError(data);
  };

  formOff();

  window.main = {
    on: formOn,
    off: formOff,
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };
})();
