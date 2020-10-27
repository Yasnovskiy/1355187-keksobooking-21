'use strict';

(function () {
  let templateError = document.querySelector('#error').content.querySelector('.error');
  let mapElement = document.querySelector('.map');
  let filtersElement = document.querySelector('.map__filters-container');
  // let buttonErorr = templateError.querySelector('.error__button');
  // let buttonErorr = document.querySelector('.error__button');

  const errorHandler = function (errorMessage) {
    let error = templateError.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;

    mapElement.insertBefore(error, filtersElement);
  };

  const buttonErorr = function (evt) {
    let error = document.querySelector('.error');

    evt.preventDefault();
    error.remove();
    console.log('Привет');
  };

  window.message = {
    error: errorHandler,
    closeError: buttonErorr
  };
})();
