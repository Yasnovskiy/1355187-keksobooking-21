'use strict';

(function () {
  const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const similarListMapPins = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  const createTemplatePin = function (obj) {
    const pin = templatePin.cloneNode(true);
    pin.style.left = obj.location.x + `px`;
    pin.style.top = obj.location.y + `px`;
    pin.querySelector(`img`).src = obj.author.avatar;

    pin.addEventListener(`click`, function () {
      window.card.render(obj);
      addClassActive(pin);
    });

    return pin;
  };

  const renderPins = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      const pin = createTemplatePin(arr[i]);
      fragment.appendChild(pin);
    }
    similarListMapPins.appendChild(fragment);
  };

  const removePins = function () {
    let list = similarListMapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    list.forEach((el) => {
      el.remove();
    });
  };

  const addClassActive = function (pin) {
    let list = similarListMapPins.querySelectorAll(`.map__pin`);
    list.forEach((el) => {
      el.classList.remove(`map__pin--active`);
    });
    pin.classList.add(`map__pin--active`);
  };

  const removeActive = function () {
    let list = similarListMapPins.querySelectorAll(`.map__pin`);
    list.forEach((el) => {
      el.classList.remove(`map__pin--active`);
    });
  };

  // const removeClassActive = function () {
  //   .classList.remove('map__pin--active');
  // };

  window.pin = {
    render: renderPins,
    removePins: removePins,
    removeActive: removeActive
    // removeClassActive: removeClassActive
  };
})();
