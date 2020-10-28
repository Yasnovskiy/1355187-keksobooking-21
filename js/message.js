'use strict';

(function () {
  let templateError = document.querySelector('#error').content.querySelector('.error');
  let main = document.querySelector('main');

  const showError = function (errorMessage) {
    let error = templateError.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;
    error.addEventListener('click', function () {
      closeError();
    });

    document.addEventListener('keydown', onDocumentKeydown);

    main.appendChild(error);
  };

  const onDocumentKeydown = function (evt) {
    if (evt.key === 'Escape') {
      closeError();
    }
  };

  const closeError = function () {
    let error = main.querySelector('.error');
    if (error) {
      error.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  window.message = {
    showError: showError,
    closeError: closeError
  };
})();
