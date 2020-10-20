'use strict';

let templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
const createTemplatePin = function (obj) {
  const pin = templatePin.cloneNode(true);
  pin.style.left = obj.location.x + 'px';
  pin.style.top = obj.location.y + 'px';
  pin.querySelector('img').src = obj.author.avatar;

  pin.addEventListener('click', function () {
    renderCard(obj);
  });

  return pin;
};
