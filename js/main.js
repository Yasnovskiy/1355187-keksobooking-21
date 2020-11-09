'use strict';
(function () {
  const field = document.querySelectorAll('fieldset');
  const mapEr = document.querySelector('.map__filters');
  const child = mapEr.querySelectorAll('.map__filter');

  const formOn = function () {
    for (let i = 0; i < field.length; i++) {
      field[i].removeAttribute('disabled');
    }

    for (let i = 0; i < child.length; i++) {
      child[i].removeAttribute('disabled');
    }
  };

  const formOff = function () {
    for (let i = 0; i < field.length; i++) {
      field[i].setAttribute('disabled', 'disabled');
    }

    for (let i = 0; i < child.length; i++) {
      child[i].setAttribute('disabled', 'disabled');
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
    window.map.deactivate();
    window.pin.removePins();
    window.card.closeCard();
    formOff();
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
