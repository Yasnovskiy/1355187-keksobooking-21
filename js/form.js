'use strict';

let formElement = document.querySelector('.ad-form');
let field = document.querySelectorAll('fieldset');

const fieldOn = function () {
  for (let i = 0; i < field.length; i++) {
    field[i].removeAttribute('disabled');
  }
};

const fieldOff = function () {
  for (let i = 0; i < field.length; i++) {
    field[i].setAttribute('disabled', 'disabled');
  }
};

let isActive = false;
const activatePage = function () {
  if (!isActive) {
    isActive = true;
    mapElement.classList.remove('map--faded');
    formElement.classList.remove('ad-form--disabled');
    fieldOn();
    const data = generateData(8);
    renderPins(data);
  }
};

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

let typeText = document.querySelector('input[type="text"]');

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

const typeElement = formElement.querySelector('[name="type"]');
const priceElement = formElement.querySelector('[name="price"]');

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

const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');

timeInElement.addEventListener('change', function () {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', function () {
  timeInElement.value = timeOutElement.value;
});

const roomsElement = document.querySelector('[name="rooms"]');
const capacityElement = document.querySelector('[name="capacity"]');

let disabledRooms = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

let capacityElementOption = capacityElement.querySelectorAll('option');
let disabledCapacity = function () {
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


