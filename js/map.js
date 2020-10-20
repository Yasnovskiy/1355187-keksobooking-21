'use strict';

const onDocumentKeydown = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeCard();
  }
};

const closeCard = function () {
  const card = mapElement.querySelector('.map__card');
  if (card) {
    card.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};
