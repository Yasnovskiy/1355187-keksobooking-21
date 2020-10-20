'use strict';
(function () {
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

  fieldOff();

  window.main = {
    on: fieldOn,
    off: fieldOff
  };

})();
