'use strict';

(function () {
  const formFilters = document.querySelector('.map__filters');
  const formTypeFilter = formFilters.querySelector('#housing-type');

  const applyFilter = function (data) {
    const filtered = data.filter(function (item) {
      return (formTypeFilter.value === 'any') || (item.offer.type === formTypeFilter.value);
    });

    return filtered;
  };

  let filter = {
    onTypeValue: function (type) {}
  };

  formTypeFilter.addEventListener('change', function () {
    const newColor = applyFilter();
    filter.onCoatChange(newColor);
  });

  window.filter = {
    apply: applyFilter,

    setEyesChangeHandler: function (cb) {
      filter.onTypeValue = cb;
    }
  };

  // formTypeFilter.addEventListener('change', function () {
  //   window.pin.filterPins();
  // });

  // window.filter = {
  //   apply: applyFilter
  // };
})();

// (function () {
//   const COAT_COLORS = [
//     'rgb(146, 100, 161)',
//     'rgb(215, 210, 55)',
//     'rgb(241, 43, 107)',
//     'rgb(101, 137, 164)',
//     'rgb(0, 0, 0)',
//     'rgb(215, 210, 55)',
//     'rgb(56, 159, 117)',
//     'rgb(241, 43, 107)'
//   ];

//   const EYES_COLORS = [
//     'red',
//     'orange',
//     'yellow',
//     'green',
//     'lightblue',
//     'blue',
//     'purple'
//   ];

//   let wizard = {
//     onEyesChange: function (color) {},
//     onCoatChange: function (color) {}
//   };

//   const wizardElement = document.querySelector('.setup-wizard');

//   const wizardCoatElement = wizardElement.querySelector('.wizard-coat');
//   wizardCoatElement.addEventListener('click', function () {
//     const newColor = window.utils.getRandomElement(COAT_COLORS);
//     this.style.fill = newColor;
//     wizard.onCoatChange(newColor);
//   });

//   const wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
//   wizardEyesElement.addEventListener('click', function () {
//     const newColor = window.utils.getRandomElement(EYES_COLORS);
//     this.style.fill = newColor;
//     wizard.onEyesChange(newColor);
//   });

//   window.wizard = {
//     setCoatChangeHandler: function (cb) {
//       wizard.onCoatChange = cb;
//     },

//     setEyesChangeHandler: function (cb) {
//       wizard.onEyesChange = cb;
//     }
//   }
// })();
