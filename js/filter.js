'use strict';

(function () {
  const formFilters = document.querySelector(`.map__filters`);
  const formFieldset = formFilters.querySelector(`fieldset`);
  const mapChild = formFilters.querySelectorAll(`.map__filter`);
  const formTypeFilter = formFilters.querySelector(`#housing-type`);
  const formPriceFilter = formFilters.querySelector(`#housing-price`);
  const formRoomsFilter = formFilters.querySelector(`#housing-rooms`);
  const formGuestsFilter = formFilters.querySelector(`#housing-guests`);

  const offFilter = function () {
    for (let i = 0; i < mapChild.length; i++) {
      mapChild[i].setAttribute(`disabled`, `disabled`);
    }

    formFieldset.setAttribute(`disabled`, `disabled`);
  };

  const onFilter = function () {
    for (let i = 0; i < mapChild.length; i++) {
      mapChild[i].removeAttribute(`disabled`);
    }

    formFieldset.removeAttribute(`disabled`);
  };

  const checkType = function (item) {
    return (formTypeFilter.value === `any`) || (item.offer.type === formTypeFilter.value);
  };

  const checkPrice = function (item) {
    let price = true;
    if (formPriceFilter.value === `any`) {
      price = price;
    } else if (formPriceFilter.value === `middle`) {
      price = item.offer.price > 10000 && item.offer.price < 50000;
    } else if (formPriceFilter.value === `low`) {
      price = item.offer.price <= 10000;
    } else if (formPriceFilter.value === `high`) {
      price = item.offer.price >= 50000;
    }

    return price;
  };

  const checkRooms = function (item) {
    return (formRoomsFilter.value === `any`) || (item.offer.rooms === Number.parseInt(formRoomsFilter.value, 10));
  };

  const checkGuests = function (item) {
    let price = true;
    if (formGuestsFilter.value === `any`) {
      price = price;
    } else if (formGuestsFilter.value === `2`) {
      price = item.offer.guests > 2;
    } else if (formGuestsFilter.value === `1`) {
      price = item.offer.guests > 1;
    } else if (formGuestsFilter.value === `0`) {
      price = item.offer.guests === 0;
    }

    return price;
  };

  const checkByFeatures = function (item, checked) {
    return checked.every(function (el) {
      return item.offer.features.includes(el.value);
    });
  };

  const applyFilter = function (data) {
    const checked = formFilters.querySelectorAll(`.map__checkbox:checked`);
    const checkedArr = Array.from(checked);

    const filtered = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (checkType(item) &&
      checkByFeatures(item, checkedArr) &&
      checkRooms(item) &&
      checkGuests(item) &&
      checkPrice(item)) {
        filtered.push(item);
      }

      if (filtered.length >= 5) {
        break;
      }
    }


    // // const filtered = data.filter(function (item) {
    // //   return checkType(item) &&
    // //     checkByFeatures(item, checkedArr) &&
    // //     checkRooms(item) &&
    // //     checkGuests(item) &&
    // //     checkPrice(item);
    // // });

    return filtered;
  };

  const onFilterChange = function () {
    window.map.rerenderPins();
  };

  const onFilterChangeDebounce = window.debounce(onFilterChange);

  formFilters.addEventListener(`change`, onFilterChangeDebounce);

  const clearFilter = function () {
    formFilters.reset();
  };

  window.filter = {
    apply: applyFilter,
    clearFilter: clearFilter,
    onFilter: onFilter,
    offFilter: offFilter
  };
})();
