'use strict';
(function () {
  let isActive = false;
  const activatePage = function () {
    if (!isActive) {
      isActive = true;
      window.form.activate();
      window.map.activate();
      const dataPin = window.map.getMainPinPosition();
      window.form.address(dataPin.x, dataPin.y);
      window.form.formOn();

      window.load(onSuccess, onError);
    }
  };

  const deactivatePage = function () {
    isActive = false;
    window.form.deactivate();
    window.filter.clearFilter();
    window.map.deactivate();
    window.pin.removePins();
    window.card.closeCard();
    window.form.formOff();
    window.filter.offFilter();
  };

  const onSuccess = function (data) {
    window.map.setData(data);
    window.map.rerenderPins();
    window.filter.onFilter();
  };

  const onError = function (data) {
    window.message.showError(data);
  };

  window.form.formOff();
  window.filter.offFilter();

  window.main = {
    activate: activatePage,
    deactivate: deactivatePage,
  };
})();
