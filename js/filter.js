'use strict';

(function () {
  const formFilters = document.querySelector('.map__filters');
  const formTypeFilter = formFilters.querySelector('#housing-type');
  const formPriceFilter = formFilters.querySelector('#housing-price');
  const formRoomsFilter = formFilters.querySelector('#housing-rooms');
  const formGuestsFilter = formFilters.querySelector('#housing-guests');

  const applyFilter = function (data) {
    const filtered = data.filter(function (item) {
      (formTypeFilter.value === 'any') || (item.offer.type === formTypeFilter.value);
      (formPriceFilter.value === 'any') || (item.offer.price === formPriceFilter.value);
      (formRoomsFilter.value === 'any') || (item.offer.rooms === formRoomsFilter.value);
      return (formGuestsFilter.value === 'any') || (item.offer.guests === formGuestsFilter.value);
    });

    return filtered;
  };

  let data = [];
  const renderPins = function (arr) {
    data = arr;
    window.main.rerenderPins(data);
  };

  formFilters.addEventListener('change', function () {
    window.main.rerenderPins();
  });

  // const rerenderPins = function () {
  //   window.card.closeCard();
  //   window.pin.removePins();
  //   const filteredData = window.filter.apply(data);
  //   window.pin.render(filteredData.slice(0, 5));
  // };

  // const rerenderPins = function () {
  //   window.card.closeCard();
  //   window.pin.removePins();
  //   const filteredData = window.filter.apply(data);
  //   window.pin.render(filteredData.slice(0, 5));
  // };

  window.filter = {
    apply: applyFilter,
    renderPins: renderPins
  };
})();
