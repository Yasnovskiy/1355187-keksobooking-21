'use strict';

(function () {
  let templateError = document.querySelector('#error').content.querySelector('.error');
  let templetSuccess = document.querySelector('#success').content.querySelector('.success');
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
    let success = main.querySelector('.success');
    if (error) {
      error.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    } else if (success) {
      success.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  const submittedForm = function () {
    let success = templetSuccess.cloneNode(true);

    success.addEventListener('click', function () {
      closeError();
    });

    document.addEventListener('keydown', onDocumentKeydown);

    main.appendChild(success);
  };

  const notSubmittedForm = function () {
    let errorForm = templateError.cloneNode(true);

    errorForm.addEventListener('click', function () {
      closeError();
    });

    document.addEventListener('keydown', onDocumentKeydown);

    main.appendChild(errorForm);
  };

  let similarListmMapPins = document.querySelector('.map__pins');

  const renderForm = function () {
    let success = submittedForm();
    let error = notSubmittedForm();

    if (success) {
      similarListmMapPins.appendChild(success);
    } else if (error) {
      similarListmMapPins.appendChild(error);
    }

  };

  // let button = document.querySelector('.ad-form__submit');

  // button.addEventListener('click', function (evt) {
  //   evt.preventDefault();
  //   renderForm();
  // });

  window.message = {
    showError: showError,
    closeError: closeError,
    renderForm: renderForm
  };
})();
