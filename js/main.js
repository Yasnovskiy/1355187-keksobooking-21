'use strict';
const getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
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
      address: '{{location.x}}, {{location.y}}',
      price: Math.floor(Math.random() * (5001 - 0)) + 0,
      rooms: Math.floor(Math.random() * (3 - 1)) + 1,
      guests: Math.floor(Math.random() * (5 - 1)) + 1,
      type: typeArray[Math.floor(Math.random() * typeArray.length)],
      photos: photosArray.slice(getRandomInt(photosArray.length)),
      description: '',
      checkin: checkArray[Math.floor(Math.random() * checkArray.length)],
      checkout: checkArray[Math.floor(Math.random() * checkArray.length)],
      features: featuresArray.slice(getRandomInt(featuresArray.length - 1))
    },
    location: {
      x: Math.floor(Math.random() * (1150 - 50)) + 50,
      y: Math.floor(Math.random() * (580 - 180)) + 180,
    }
  };

  return ad;
};

//Генерируем данные для созданного массива из объекта сверху
const generateData = function (num) {
  let objectArray = [];
  for (let i = 0; i < num; i++) {
    objectArray.push(generateObject(i));
  }

  return objectArray;
};

//Получаем шаблон и заменяем данные из массива
let templatePin = document.querySelector('#pin').content.querySelector('.map__pin ');
const createTemplatePin = function (obj) {
  const pin = templatePin.cloneNode(true);
  pin.style.left = obj.location.x + 'px';
  pin.style.top = obj.location.y + 'px';
  pin.querySelector('img').src = obj.author.avatar;

  return pin;
};

//Отрисовываем метки с полученными данными с помощью Документ Фрагмента
let similarListmMapPins = document.querySelector('.map__pins');
const fragment = document.createDocumentFragment();
const renderPins = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    const pin = createTemplatePin(arr[i]);
    fragment.appendChild(pin);
  }
  similarListmMapPins.appendChild(fragment);
};

//Получаем шаблон и заменяем данные из массива
let templateCards = document.querySelector('#card').content.querySelector('.map__card');
const createTemplateCards = function (obj) {
  const card = templateCards.cloneNode(true);
  card.querySelector('popup__title').innerHTML = obj.offer.title;
  card.querySelector('popup__text--address').innerHTML = obj.offer.address;
  card.querySelector('popup__text--price').innerHTML = obj.offer.price + '₽';

  card.querySelector('popup__text--capacity').innerHTML = obj.offer.rooms + 'комнаты для' + obj.offer.guests + 'гостей';
  card.querySelector('popup__text--time').innerHTML = 'Заезд после' + obj.offer.checkin + ', выезд до' + obj.offer.checkout;
  card.querySelector('popup__features').innerHTML = obj.offer.features;
  card.querySelector('popup__description').innerHTML = obj.offer.description;
  card.querySelector('popup__photos').content.querySelector('.popup__photo').src = obj.offer.photos;
  card.querySelector('popup__avatar').src = obj.author.avatar;

  return pin;
};

// //Для отрисовки карточки
// let ideansertBeforeCards = document.querySelector('.map__filters-container');
// let similarListmMapCards = document.querySelector('.map');
// const fragmentCards = document.createDocumentFragment();
// const renderCards = function (arr) {
//   for (let i = 0; i < arr.length; i++) {
//     const card = createTemplatePin(arr[i]);
//     fragmentCards.appendChild(pin);
//   }
//
//   similarListmMapCards.appendChild(fragmentCards);
// };


const data = generateData(8);
renderPins(data);
