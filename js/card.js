'use strict';

(function () {
  const templateCards = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const templatePhoto = templateCards.querySelector(`.popup__photo`);
  const filtersElement = document.querySelector(`.map__filters-container`);
  const mapElement = document.querySelector(`.map`);

  const setTextContentWithHide = function (element, value) {
    element.textContent = value;
    if (!value) {
      element.hidden = true;
    }
  };

  const createTemplateCards = function (obj) {
    const card = templateCards.cloneNode(true);

    setTextContentWithHide(card.querySelector(`.popup__title`), obj.offer.title);
    setTextContentWithHide(card.querySelector(`.popup__text--address`), obj.offer.address);
    setTextContentWithHide(card.querySelector(`.popup__description`), obj.offer.description);
    setTextContentWithHide(card.querySelector(`.popup__type`), translaiteType(obj.offer.type));

    const priceValue = (obj.offer.price !== undefined) ? obj.offer.price + ` ₽` : undefined;
    const capacityValue = (obj.offer.rooms !== undefined && obj.offer.guests !== undefined) ? obj.offer.rooms + ` комнаты для ` + obj.offer.guests + ` гостей` : undefined;
    const timeValue = (obj.offer.checkin !== undefined && obj.offer.checkout !== undefined) ? `Заезд после ` + obj.offer.checkin + `, выезд до ` + obj.offer.checkout : undefined;
    setTextContentWithHide(card.querySelector(`.popup__text--price`), priceValue);
    setTextContentWithHide(card.querySelector(`.popup__text--capacity`), capacityValue);
    setTextContentWithHide(card.querySelector(`.popup__text--time`), timeValue);

    const popupAvatar = card.querySelector(`.popup__avatar`);
    if (obj.author.avatar) {
      popupAvatar.src = obj.author.avatar;
    } else {
      popupAvatar.hidden = true;
    }

    const featuresList = card.querySelector(`.popup__features`);
    featuresList.innerHTML = ``;
    if (obj.offer.features && obj.offer.features.length > 0) {
      for (let i = 0; i < obj.offer.features.length; i++) {
        const features = obj.offer.features[i];
        const featureElement = `<li class="popup__feature popup__feature--` + features + `"></li>`;
        featuresList.insertAdjacentHTML(`afterbegin`, featureElement);
      }
    } else {
      featuresList.hidden = true;
    }

    const photosList = card.querySelector(`.popup__photos`);
    photosList.innerHTML = ``;
    if (obj.offer.photos && obj.offer.photos.length > 0) {
      for (let j = 0; j < obj.offer.photos.length; j++) {
        const photo = templatePhoto.cloneNode(true);
        photo.src = obj.offer.photos[j];
        photosList.appendChild(photo);
      }
    } else {
      photosList.style = `display:none;`;
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
