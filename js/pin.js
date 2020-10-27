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

  const errorHandler = function (errorMessage) {
    let node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(renderPins, errorHandler);

  window.pin = {
    render: renderPins,
    error: errorHandler
  };

})();
