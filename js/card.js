'use strict';

(function () {
  const templateCards = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const templatePhoto = templateCards.querySelector(`.popup__photo`);
  const filtersElement = document.querySelector(`.map__filters-container`);
  const mapElement = document.querySelector(`.map`);

  const createTemplateCards = function (obj) {
    const card = templateCards.cloneNode(true);

    card.querySelector(`.popup__title`).textContent = obj.offer.title;
    card.querySelector(`.popup__text--address`).textContent = obj.offer.address;
    card.querySelector(`.popup__text--price`).textContent = obj.offer.price + ` ₽`;
    card.querySelector(`.popup__type`).textContent = translaiteType(obj.offer.type);
    card.querySelector(`.popup__text--capacity`).textContent = obj.offer.rooms + ` комнаты для ` + obj.offer.guests + ` гостей`;
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + obj.offer.checkin + `, выезд до ` + obj.offer.checkout;
    card.querySelector(`.popup__description`).textContent = obj.offer.description;
    card.querySelector(`.popup__avatar`).src = obj.author.avatar;

    const featuresList = card.querySelector(`.popup__features`);
    featuresList.innerHTML = ``;
    for (let i = 0; i < obj.offer.features.length; i++) {
      const features = obj.offer.features[i];
      const featureElement = `<li class="popup__feature popup__feature--` + features + `"></li>`;
      featuresList.insertAdjacentHTML(`afterbegin`, featureElement);
    }

    const photosList = card.querySelector(`.popup__photos`);
    photosList.innerHTML = ``;
    for (let j = 0; j < obj.offer.photos.length; j++) {
      const photo = templatePhoto.cloneNode(true);
      photo.src = obj.offer.photos[j];
      photosList.appendChild(photo);
    }

    card.querySelector(`.popup__close`).addEventListener(`click`, function () {
      closeCard();
    });

    return card;
  };

  const onDocumentKeydown = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeCard();
      window.pin.removeClassActive(evt);
    }
  };

  const closeCard = function () {
    const card = mapElement.querySelector(`.map__card`);
    if (card) {
      card.remove();
      window.pin.removeActive();
      document.removeEventListener(`keydown`, onDocumentKeydown);
    }
  };

  const translaiteType = function (type) {
    if (type === `palace`) {
      return `Дворец`;
    } else if (type === `flat`) {
      return `Квартира`;
    } else if (type === `house`) {
      return `Дом`;
    } else if (type === `bungalow`) {
      return `Бунгало`;
    }

    return type;
  };

  const renderCard = function (obj) {
    closeCard();
    const card = createTemplateCards(obj);
    mapElement.insertBefore(card, filtersElement);
    document.addEventListener(`keydown`, onDocumentKeydown);
  };

  window.card = {
    render: renderCard,
    closeCard: closeCard
  };
})();
