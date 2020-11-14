'use strict';

(function () {
  const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
  const templetSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const main = document.querySelector(`main`);

  const showError = function (errorMessage) {
    let error = templateError.cloneNode(true);
    error.querySelector(`.error__message`).textContent = errorMessage;
    error.addEventListener(`click`, function () {
      closeError();
    });

    document.addEventListener(`keydown`, onDocumentKeydown);

    main.appendChild(error);
  };

  const showSuccess = function () {
    let success = templetSuccess.cloneNode(true);
    success.addEventListener(`click`, function () {
      closeSuccess();
    });

    document.addEventListener(`keydown`, onDocumentKeydown);

    main.appendChild(success);
    success.focus();
  };

  const closeError = function () {
    let error = main.querySelector(`.error`);
    if (error) {
      error.remove();
      document.removeEventListener(`keydown`, onDocumentKeydown);
    }
  };

  const closeSuccess = function () {
    let success = main.querySelector(`.success`);
    if (success) {
      success.remove();
      document.removeEventListener(`keydown`, onDocumentKeydown);
    }
  };

  const onDocumentKeydown = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeSuccess();
      closeError();
    }
  };

  window.message = {
    showError: showError,
    showSuccess: showSuccess
  };
})();
