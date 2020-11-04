'use strict';

(function () {
  let coatColor = 'flat';
  let typeArray = [];


  const formFilters = document.querySelector('.map__filters');

  const updateWizards = function () {

    const sameCoatWizards = typeArray.filter(function (type) {
      return type.colorCoat === coatColor;
    });

    // const sameEyesWizards = typeArray.filter(function (type) {
    //   return type.colorEyes === eyesColor;
    // });

    window.pin.render(sameCoatWizards);
    // window.pin.render(data.slice(0, 5));
  };

  const formTypeFilter = formFilters.querySelector('#housing-type');

  formTypeFilter.addEventListener('change', function () {
    const type = formTypeFilter.value;

    console.log(type);
  });


  const onSuccess = function (res) {
    typeArray = res;
    // window.pin.render(typeArray.slice(0, 5));
    updateWizards();
  };

  const onError = function (data) {
    window.message.showError(data);
  };

  window.load(onSuccess, onError);
})();
