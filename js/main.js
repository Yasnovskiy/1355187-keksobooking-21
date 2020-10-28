'use strict';
(function () {
  let field = document.querySelectorAll('fieldset');
  let mapEr = document.querySelector('.map__filters');
  let child = mapEr.querySelectorAll('.map__filter');

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

  const onSuccess = function (res) {
    window.pin.render(res);
  };

  const onError = function (res) {
    window.message.showError(res);
  };

  formOff();

  window.main = {
    on: formOn,
    off: formOff,
    activatePage: activatePage
  };
})();
