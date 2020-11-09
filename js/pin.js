'use strict';

(function () {
  const templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  const similarListmMapPins = document.querySelector('.map__pins');
  const fragment = document.createDocumentFragment();

  const createTemplatePin = function (obj) {
    const pin = templatePin.cloneNode(true);
    pin.style.left = obj.location.x + 'px';
    pin.style.top = obj.location.y + 'px';
    pin.querySelector('img').src = obj.author.avatar;

    pin.addEventListener('click', function () {
      window.card.render(obj);
    });

    return pin;
  };

  const renderPins = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      const pin = createTemplatePin(arr[i]);
      fragment.appendChild(pin);
    }
    similarListmMapPins.appendChild(fragment);
  };

  const removePins = function () {
    let list = similarListmMapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    list.forEach((el) => {
      el.remove();
    });
  };

  window.pin = {
    render: renderPins,
    removePins: removePins
  };
})();
