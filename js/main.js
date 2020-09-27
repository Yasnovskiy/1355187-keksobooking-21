'use strict';
// Получаем элементы с классом map__pin. Используем селектор.
let pins = document.querySelectorAll('.map__pin');
// Получаем элемент с идентификатором "housing-price". Используем селектор.
let housePriceField = document.querySelector('#housing-price');

const getRandomInt = function (max) {
  return  Math.floor(Math.random() * max);
};

let titleArray = ['Title1', 'Title2', 'Title3'];
let photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
let checkArray = ['12:00', '13:00', '14:00'];
let featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let typeArray = ['palace', 'flat', 'house', 'bungalow'];

let generateObject = function (num) {
  const ad = {
    author: {
      avatar: 'img/avatars/user0' + (num + 1) + '.png'
    },
    offer: {
      title: titleArray[Math.floor(Math.random() * titleArray.length)],
      address: "{{location.x}}, {{location.y}}",
      price: Math.floor(Math.random() * (5001 - 0)) + 0,
      rooms: Math.floor(Math.random() * (3 - 1)) + 1,
      type: typeArray[Math.floor(Math.random() * typeArray.length)],
      photos: photosArray.slice(getRandomInt(photosArray.length)),
      description: '',
      checkin: checkArray[Math.floor(Math.random() * checkArray.length)],
      checkout: checkArray[Math.floor(Math.random() * checkArray.length)],
      features: featuresArray.slice(getRandomInt(featuresArray.length - 1))
    },
    location: {
      x: Math.floor(Math.random() * (1200 - 0)),
      y: Math.floor(Math.random() * (630 - 130))
    }
  };
  return ad;
};

let objectArray = [];
for (let i = 0; i < 8; i++) {
  objectArray.push(generateObject(i));
};

let similarListmMapPins = document.querySelector('.map__pins');
let similarWizardPin = document.querySelector('#pin').content.querySelector('.map__pin ');

for (let i = 0; i < 1; i++) {
  let mark = similarWizardPin.cloneNode(true);

  similarListmMapPins.appendChild(mark);
};

console.log(objectArray);
