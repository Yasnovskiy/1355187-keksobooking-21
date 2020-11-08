'use strict';

(function () {
  const formFilters = document.querySelector('.map__filters');
  const formTypeFilter = formFilters.querySelector('#housing-type');
  const formPriceFilter = formFilters.querySelector('#housing-price');
  const formRoomsFilter = formFilters.querySelector('#housing-rooms');
  const formGuestsFilter = formFilters.querySelector('#housing-guests');

  const transformation = function (string) {
    let valo = '';
    valo = Number(string);

    return valo;
  };

  const checkType = function (item) {
    return (formTypeFilter.value === 'any') || (item.offer.type === formTypeFilter.value);
  };

  const checkPrice = function (item) {
    let price = true;
    if (formPriceFilter.value === 'any') {
      price = price;
    } else if (formPriceFilter.value === 'middle') {
      price = item.offer.price > 10000 && item.offer.price < 50000;
    } else if (formPriceFilter.value === 'low') {
      price = item.offer.price <= 10000;
    } else if (formPriceFilter.value === 'high') {
      price = item.offer.price >= 50000;
    }

    return price;
  };

  const checkRooms = function (item) {
    return (formRoomsFilter.value === 'any') || (item.offer.rooms === transformation(formRoomsFilter.value));
  };

  const checkGuests = function (item) {
    return (formGuestsFilter.value === 'any') || (item.offer.guests === transformation(formGuestsFilter.value));
  };

  const checkByFeatures = function (item, checked) {
    return checked.every(function (el) {
      return item.offer.features.includes(el.value);
    });
  };

  const applyFilter = function (data) {
    const checked = formFilters.querySelectorAll('.map__checkbox:checked');
    const checkedArr = Array.from(checked);

    const filtered = data.filter(function (item) {
      return checkType(item) &&
        checkByFeatures(item, checkedArr) &&
        checkRooms(item) &&
        checkGuests(item) &&
        checkPrice(item);
    });

    return filtered;
  };

  formFilters.addEventListener('change', function () {
    window.map.rerenderPins();
  });

  window.filter = {
    apply: applyFilter
  };
})();
