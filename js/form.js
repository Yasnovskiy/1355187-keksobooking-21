'use strict';

(function () {
  const MIN_NAME_LENGTH = 30;
  const MAX_NAME_LENGTH = 100;
  let typeElement = document.querySelector('[name="type"]');
  let priceElement = document.querySelector('[name="price"]');
  let timeInElement = document.querySelector('#timein');
  let timeOutElement = document.querySelector('#timeout');
  let roomsElement = document.querySelector('[name="rooms"]');
  let capacityElement = document.querySelector('[name="capacity"]');
  let capacityElementOption = capacityElement.querySelectorAll('option');
  let addressElement = document.querySelector('[name="address"]');
  let formElementOne = document.querySelector('.map__filters');
  let formElementTwo = document.querySelector('.ad-form');
  let typeText = document.querySelector('input[type="text"]');
  let onClear = document.querySelector('.ad-form__reset');

  typeText.addEventListener('input', function () {
    let valueLength = typeText.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      typeText.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      typeText.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
      typeText.setCustomValidity('');
    }

    typeText.reportValidity();
  });

  typeElement.addEventListener('change', function () {
    let newValue = 0;
    switch (typeElement.value) {
      case 'bungalow':
        newValue = 0;
        break;
      case 'flat':
        newValue = 1000;
        break;
      case 'house':
        newValue = 5000;
        break;
      case 'palace':
        newValue = 10000;
        break;
    }

    priceElement.placeholder = newValue;
    priceElement.minValue = newValue;
  });

  timeInElement.addEventListener('change', function () {
    timeOutElement.value = timeInElement.value;
  });

  timeOutElement.addEventListener('change', function () {
    timeInElement.value = timeOutElement.value;
  });

  let disabledRooms = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  const disabledCapacity = function () {
    for (let i = 0; i < capacityElementOption.length; i++) {
      capacityElementOption[i].setAttribute('disabled', 'disabled');
    }

    const toEnable = disabledRooms[roomsElement.value];

    for (let i = 0; i < capacityElementOption.length; i++) {
      const option = capacityElementOption[i];
      if (toEnable.includes(option.value)) {
        option.removeAttribute('disabled');
      }
    }
  };

  roomsElement.addEventListener('change', function () {
    disabledCapacity();

    if (roomsElement.value === '1') {
      capacityElement.value = '1';
    } else if (roomsElement.value === '2') {
      capacityElement.value = '2';
    } else if (roomsElement.value === '3') {
      capacityElement.value = '3';
    } else if (roomsElement.value === '100') {
      capacityElement.value = '0';
    }
  });

  const activate = function () {
    formElementTwo.classList.remove('ad-form--disabled');
    disabledCapacity();
  };

  const addressRecord = function (X, Y) {
    addressElement.value = ' X ' + X + ' , Y ' + (Y + 10);

    return addressElement;
  };


  formElementTwo.addEventListener('submit', function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    window.upload(new FormData(formElementTwo), function () {
      // window.upload(onSuccess, onError);
      formElementTwo.reset();
    });
  });

  const onSuccess = function (res) {
    window.message.submittedForm(res);
  };

  const onError = function (res) {
    window.message.showError(res);
  };

  onClear.addEventListener('click', function (evt) {
    evt.preventDefault();
    formElementOne.reset();
    formElementTwo.reset();
    mainPinStart();
  });

  let mainPin = document.querySelector('.map__pin--main');

  const mainPinStart = function () {
    // let pinX = mainPin.style.left;
    // let pinY = mainPin.style.top;

    let pinX = '570px';
    let pinY = '375px';

    mainPin.style.left = pinX;
    mainPin.style.top = pinY;

    addressElement.value = ' X 570 , Y 375';

  };

  window.form = {
    disabled: disabledCapacity,
    activate: activate,
    address: addressRecord
  };
})();
