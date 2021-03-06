'use strict';

(function () {
  const MIN_NAME_LENGTH = 30;
  const MAX_NAME_LENGTH = 100;
  const typeElement = document.querySelector(`[name="type"]`);
  const priceElement = document.querySelector(`[name="price"]`);
  const timeInElement = document.querySelector(`#timein`);
  const timeOutElement = document.querySelector(`#timeout`);
  const roomsElement = document.querySelector(`[name="rooms"]`);
  const capacityElement = document.querySelector(`[name="capacity"]`);
  const capacityElementOption = capacityElement.querySelectorAll(`option`);
  const addressElement = document.querySelector(`[name="address"]`);
  const formElement = document.querySelector(`.ad-form`);
  const typeText = document.querySelector(`input[type="text"]`);
  const onClear = document.querySelector(`.ad-form__reset`);
  const field = formElement.querySelectorAll(`fieldset`);

  typeText.addEventListener(`input`, function () {
    let valueLength = typeText.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      typeText.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      typeText.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
    } else {
      typeText.setCustomValidity(``);
    }

    typeText.reportValidity();
  });

  const pressPrice = function () {
    let newValue = 0;
    switch (typeElement.value) {
      case `bungalow`:
        newValue = 0;
        priceElement.setAttribute(`min`, newValue);
        break;
      case `flat`:
        newValue = 1000;
        priceElement.setAttribute(`min`, newValue);
        break;
      case `house`:
        newValue = 5000;
        priceElement.setAttribute(`min`, newValue);
        break;
      case `palace`:
        newValue = 10000;
        priceElement.setAttribute(`min`, newValue);
        break;
    }

    priceElement.placeholder = newValue;
    priceElement.minValue = newValue;
  };

  typeElement.addEventListener(`change`, pressPrice);

  timeInElement.addEventListener(`change`, function () {
    timeOutElement.value = timeInElement.value;
  });

  timeOutElement.addEventListener(`change`, function () {
    timeInElement.value = timeOutElement.value;
  });

  let disabledRooms = {
    '1': [`1`],
    '2': [`1`, `2`],
    '3': [`1`, `2`, `3`],
    '100': [`0`]
  };

  const disabledCapacity = function () {
    for (let i = 0; i < capacityElementOption.length; i++) {
      capacityElementOption[i].setAttribute(`disabled`, `disabled`);
    }

    const toEnable = disabledRooms[roomsElement.value];

    for (let i = 0; i < capacityElementOption.length; i++) {
      const option = capacityElementOption[i];
      if (toEnable.includes(option.value)) {
        option.removeAttribute(`disabled`);
      }
    }
  };

  roomsElement.addEventListener(`change`, function () {
    disabledCapacity();
    switch (roomsElement.value) {
      case `1`:
        capacityElement.value = `1`;
        break;
      case `2`:
        capacityElement.value = `2`;
        break;
      case `3`:
        capacityElement.value = `3`;
        break;
      case `100`:
        capacityElement.value = `0`;
        break;
    }
  });

  const activateForm = function () {
    formElement.classList.remove(`ad-form--disabled`);
    disabledCapacity();
  };

  const deactivateForm = function () {
    formElement.classList.add(`ad-form--disabled`);
    formElement.reset();
    window.photo.remove();
    window.avatar.reset();
    pressPrice();
  };

  const addressRecord = function (x, y) {
    addressElement.value = `` + Math.round(x) + `, ` + Math.round(y);

    return addressElement;
  };

  formElement.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.upload(new FormData(formElement), onSuccess, onError);
  });

  const onSuccess = function () {
    window.main.deactivate();
    window.message.showSuccess();
  };

  const onError = function (res) {
    window.message.showError(res);
  };

  onClear.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    window.main.deactivate();
  });

  const offForm = function () {
    for (let i = 0; i < field.length; i++) {
      field[i].setAttribute(`disabled`, `disabled`);
    }
  };

  const onForm = function () {
    for (let i = 0; i < field.length; i++) {
      field[i].removeAttribute(`disabled`);
    }
  };


  window.form = {
    disabled: disabledCapacity,
    activate: activateForm,
    deactivate: deactivateForm,
    setAddress: addressRecord,
    formOff: offForm,
    formOn: onForm
  };
})();


