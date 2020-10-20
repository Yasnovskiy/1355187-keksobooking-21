'use strict';

(function () {
  let templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
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

  let similarListmMapPins = document.querySelector('.map__pins');
  const fragment = document.createDocumentFragment();
  const renderPins = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      const pin = createTemplatePin(arr[i]);
      fragment.appendChild(pin);
    }
    similarListmMapPins.appendChild(fragment);
  };

  window.pin = {
    render: renderPins
  };

})();
