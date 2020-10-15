'use strict';
const getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

let titleArray = ['Title 1', 'Title 2', 'Title 3'];
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

let templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
const createTemplatePin = function (obj) {
  const pin = templatePin.cloneNode(true);
  pin.style.left = obj.location.x + 'px';
  pin.style.top = obj.location.y + 'px';
  pin.querySelector('img').src = obj.author.avatar;

  pin.addEventListener('click', function () {
    if (dragged === true) {
      renderCard(obj);
    };
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

  // const openCard = document.querySelector('.map__pin');
  // similarListmMapPins.addEventListener('click', function () {
  //   renderCard(data[0]);
  // });

};

let templateCards = document.querySelector('#card').content.querySelector('.map__card');
let templatePhoto = templateCards.querySelector('.popup__photo');
const createTemplateCards = function (obj) {
  const card = templateCards.cloneNode(true);

  card.querySelector('.popup__title').textContent = obj.offer.title;
  card.querySelector('.popup__text--address').textContent = obj.offer.address;
  card.querySelector('.popup__text--price').textContent = obj.offer.price + ' ₽';
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

  card.querySelector('.popup__close').addEventListener('click', function () {
    closeCard();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCard();
    }
  });


  return card;
};

const closeCard = function () {
  let cardFin = document.querySelector('article');
  cardFin.parentNode.removeChild(cardFin)
};

// cardFin.removeChild(cardFin);


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

let filtersElement = document.querySelector('.map__filters-container');
let mapElement = document.querySelector('.map');
const renderCard = function (obj) {
  const card = createTemplateCards(obj);
  mapElement.insertBefore(card, filtersElement);
  // closeCard();
};

let formElement = document.querySelector('.ad-form');
let field = document.querySelectorAll('fieldset');

const fieldOn = function () {
  for (let i = 0; i < field.length; i++) {
    field[i].removeAttribute('disabled');
  }
};

const fieldOff = function () {
  for (let i = 0; i < field.length; i++) {
    field[i].setAttribute('disabled', 'disabled');
  }
};

const activatePage = function () {
  mapElement.classList.remove('map--faded');
  formElement.classList.remove('ad-form--disabled');
  fieldOn();
};

let mainPins = document.querySelector('.map__pin--main');
let dragged = false;
mainPins.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    dragged = true;
    evt.preventDefault();
    activatePage();
  }
});

mainPins.addEventListener('click', function (evt) {
  activatePage();
});

// document.addEventListener('keydown', function (evt) {
//   if (evt.key === 'Escape') {
//     evt.preventDefault();
//     mapElement.classList.add('map--faded');
//     formElement.classList.add('ad-form--disabled');
//     fieldOn();
//   }
// });

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

let typeText = document.querySelector('input[type="text"]');

typeText.addEventListener('input', function () {
  let valueLength = typeText.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    typeText.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    typeText.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    typeText.setCustomValidity('');
  }

  typeText.reportValidity();
});

const typeElement = formElement.querySelector('[name="type"]');
const priceElement = formElement.querySelector('[name="price"]');

typeElement.addEventListener('change', function () {
  let newValue = 0;
  switch (typeElement.value) {
    case 'bungalow':
      newValue = 0;
      break;
    case 'flat':
      newValue = 1000;
      break;
    case 'house':
      newValue = 5000;
      break;
    case 'palace':
      newValue = 10000;
      break;
  }

  priceElement.placeholder = newValue;
  priceElement.minValue = newValue;
});

const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');

timeInElement.addEventListener('change', function () {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', function () {
  timeInElement.value = timeOutElement.value;
});

const roomsElement = document.querySelector('[name="rooms"]');
const capacityElement = document.querySelector('[name="capacity"]');

let disabledRooms = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

let capacityElementOption = capacityElement.querySelectorAll('option');
let disabledCapacity = function () {
  for (let i = 0; i < capacityElementOption.length; i++) {
    capacityElementOption[i].setAttribute('disabled', 'disabled');
  }

  const toEnable = disabledRooms[roomsElement.value];

  for (let i = 0; i < capacityElementOption.length; i++) {
    const option = capacityElementOption[i];
    if (toEnable.includes(option.value)) {
      option.removeAttribute('disabled');
    }
  }
};

roomsElement.addEventListener('change', function () {
  disabledCapacity();

  if (roomsElement.value === '1') {
    capacityElement.value = '1';
  } else if (roomsElement.value === '2') {
    capacityElement.value = '2';
  } else if (roomsElement.value === '3') {
    capacityElement.value = '3';
  } else if (roomsElement.value === '100') {
    capacityElement.value = '0';
  }
});

// similarListmMapPins.addEventListener('click', function () {
//   renderCard(data[0]);
// });

fieldOff();
disabledCapacity();
const data = generateData(8);
renderPins(data);
