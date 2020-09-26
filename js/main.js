'use strict';
// Получаем элементы с классом map__pin. Используем селектор.
let pins = document.querySelectorAll('.map__pin');
// Получаем элемент с идентификатором "housing-price". Используем селектор.
let housePriceField = document.querySelector('#housing-price');



let generateObject = function () {
  const ad = {
    author: {},
    offer: {},
    location: {}
  };
  let avatarRnd = Math.floor(Math.random() * Math.floor(9));
  // let avatarRnd = Math.floor(Math.random() * (8 - 1) + 1);
  let titleArray = ['Title1', 'Title2', 'Title3'];
  let photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  let check = ['12:00', '13:00', '14:00'];

  ad.author.avatar = 'img/avatars/user0' + avatarRnd + '.png';
  ad.offer.title = titleArray[Math.floor(Math.random() * titleArray.length)];
  // ad.offer.address = titleArray[Math.floor(Math.random() * Math.floor(titleArray.lenght - 1))] ;
  ad.offer.photos = photosArray[Math.floor(Math.random() * photosArray.length)];
  ad.offer.checkin = check[Math.floor(Math.random() * check.length)];
  ad.offer.checkout = check[Math.floor(Math.random() * check.length)];
  return ad;
};


let objectArray = [];
for (let i = 0; i < 8; i++) {
  objectArray.push(generateObject());
  console.log(objectArray)
};
