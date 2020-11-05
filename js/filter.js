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

  formTypeFilter.addEventListener('change', function () {
    window.map.rerenderPins();
  });

  window.filter = {
    apply: applyFilter
  };
})();
