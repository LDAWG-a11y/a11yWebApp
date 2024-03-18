import { items } from '/js/collections.js';
const headerSearchBlock = document.querySelector('.header__search-block');
const searchWrapper = document.querySelector('.search__wrapper');
const keys = ['ArrowUp', 'ArrowDown', 'Enter'];
const search = document.querySelector('#sFilter');
let itemsArr = [];
let currItem;

headerSearchBlock.insertAdjacentHTML('beforeend', `<div class="search__panel" role="dialog" aria-labelledby="sFilter">
<ul class="search__list" id="lBox"></ul><span class="visually-hidden" aria-live="polite"></span></div>`);

const searchList = document.querySelector('.search__list');

search.addEventListener('input', (evt) => {
  searchList.insertAdjacentHTML('afterbegin', items.join(''))
})
