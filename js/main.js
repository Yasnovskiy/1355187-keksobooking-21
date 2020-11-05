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

  const deactivatePage = function () {
    window.form.deactivate();
    window.map.deactivate();
    window.pin.removePins();
    window.card.closeCard();
    formOff();
  };

  let eyesColor = 'any';
  let wizards = [];

  // window.filter.setEyesChangeHandler(function (type) {
  //   eyesColor = type;
  // });

  const onSuccess = function (data) {
    // wizards = data;
    const filteredData = window.filter.apply(data.slice(0, 5));
    window.pin.render(filteredData);

    // window.pin.render(data.slice(0, 5));
  };

  const onError = function (data) {
    window.message.showError(data);
  };

  // const formFilters = document.querySelector('.map__filters');
  // const formTypeFilter = formFilters.querySelector('#housing-type');

  // formTypeFilter.addEventListener('change', function () {
  //   const leput = formTypeFilter.value;

  //   //удаляет пины (все кроме главного)
  //   window.pin.removePins();
  //   //думал получится как в main (показал как было в main)
  //   // const filteredData = window.filter.apply(data.slice(0, 5));
  //   // window.pin.render(filteredData);
  //   const pin = window.filter.apply(leput);
  //   window.pin.render(pin);

  //   //но ошибку выдает и пишет, что (const filtered = data.filter(function (item) {
  //   //   return (formTypeFilter.value === 'any') || (item.offer.type === formTypeFilter.value);
  //   // }); ) не функция
  // });

  formOff();

  window.main = {
    on: formOn,
    off: formOff,
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };
})();
