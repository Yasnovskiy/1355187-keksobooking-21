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

const generateData = function (num) {
  let objectArray = [];
  for (let i = 0; i < num; i++) {
    objectArray.push(generateObject(i));
  }
  return objectArray;
};

let templatePin = document.querySelector('#pin').content.querySelector('.map__pin ');
const createTemplatePin = function (obj) {
  const pin = templatePin.cloneNode(true);
  pin.style.left = obj.location.x + 'px';
  pin.style.top = obj.location.y + 'px';
  pin.querySelector('img').src = obj.author.avatar;

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

let templateCards = document.querySelector('#card').content.querySelector('.map__card');
let templatePhoto = templateCards.querySelector('.popup__photo');
const createTemplateCards = function (obj) {
  const card = templateCards.cloneNode(true);

  card.querySelector('.popup__title').textContent = obj.offer.title;
  card.querySelector('.popup__text--address').textContent = obj.offer.address;
  card.querySelector('.popup__text--price').textContent = obj.offer.price + '₽';
  card.querySelector('.popup__type').textContent = translaiteType(obj.offer.type);
  card.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  card.querySelector('.popup__description').textContent = obj.offer.description;
  card.querySelector('.popup__avatar').src = obj.author.avatar;

  const featuresList = card.querySelector('.popup__features');
  featuresList.innerHTML = '';
  for (let i = 0; i < obj.offer.features.length; i++) {
    const features = obj.offer.features[i];
    const featureElement = '<li class="popup__feature popup__feature--' + features + '"></li>';
    featuresList.insertAdjacentHTML('afterbegin', featureElement);
  }

  const photosList = card.querySelector('.popup__photos');
  photosList.innerHTML = '';
  for (let j = 0; j < obj.offer.photos.length; j++) {
    const photo = templatePhoto.cloneNode(true);
    photo.src = obj.offer.photos[j];
    photosList.appendChild(photo);
  }

  return card;
};

const translaiteType = function (type) {
  if (type === 'palace') {
    return 'Дворец';
  } else if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'house') {
    return 'Дом';
  } else if (type === 'bungalow') {
    return 'Бунгало';
  }

  return type;
};

let filtersElemen = document.querySelector('.map__filters-container');
let mapElemen = document.querySelector('.map');
const renderCard = function (obj) {
  const card = createTemplateCards(obj);
  mapElemen.insertBefore(card, filtersElemen);
};

const data = generateData(8);
renderPins(data);
renderCard(data[0]);
