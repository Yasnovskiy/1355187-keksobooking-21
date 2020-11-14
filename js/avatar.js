'use strict';

(function () {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const fileChooser = document.querySelector(`#avatar`);
  const avatarDiv = document.querySelector(`.ad-form-header__preview`);
  const preview = avatarDiv.querySelector(`img`);

  fileChooser.addEventListener(`change`, function () {
    let file = fileChooser.files[0];
    let fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  const resetBeginning = function () {
    preview.src = `img/muffin-grey.svg`;
  };

  window.avatar = {
    reset: resetBeginning
  };
})();
