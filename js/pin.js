'use strict';

(function () {
  let templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  let similarListmMapPins = document.querySelector('.map__pins');
  let fragment = document.createDocumentFragment();
  let MAX_SIMILAR_WIZARD_COUNT = 8;

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
    for (let i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      const pin = createTemplatePin(arr[i]);
      fragment.appendChild(pin);
    }
    similarListmMapPins.appendChild(fragment);
  };

  window.pin = {
    render: renderPins
  };

})();
