'use strict';

(function () {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  const fileChooser = document.querySelector('#images');
  const photoDiv = document.querySelector('.ad-form__photo');

  fileChooser.addEventListener('change', function () {
    let file = fileChooser.files[0];
    let fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        let preview = document.createElement('img');
        preview.src = reader.result;
        preview.style = 'width:100%; height:100%';
        photoDiv.appendChild(preview);
      });

      reader.readAsDataURL(file);
    }
  });

  const removePhoto = function () {
    photoDiv.remove('img');
  };

  window.photo = {
    removePhoto: removePhoto
  };
})();
