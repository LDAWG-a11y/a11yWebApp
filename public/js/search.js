import { items } from '/js/collections.js';
const headerSearchBlock = document.querySelector('.header__search-block');
const keys = ['ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', 'Tab'];
const search = document.querySelector('#sFilter');
const searchList = document.querySelector('.search__list');
const sMsg = document.querySelector('#sMsg');
const sInfo = document.querySelector('.search__info--text');
const errorIcon = headerSearchBlock.querySelector('.search__info--icon');
let arrFiltered = [];
let currItem;
let isInvalid = false;
const isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

search.addEventListener('keydown', (evt) => {
  if (keys.includes(evt.key)) {
    if (evt.key === 'Tab') togglePanel('false');
    if (evt.key !== 'Enter' || evt.key !== 'Tab') highlightCurrent(evt.key);

    if (evt.key === 'Enter' && searchList.hasChildNodes()) {
      searchList.querySelectorAll('.underline').forEach(el => {
        if (cleanStr(el.textContent) === cleanStr(search.value)) {
          el.closest('a').click();
        }
      })
      if (currItem) currItem.firstElementChild.click();
      if (searchList.querySelectorAll('li').length === 1) searchList.querySelector('a').click();
    }
  }
})

document.addEventListener('click', (evt) => {
  if ((!evt.target.closest('.search__panel') && evt.target !== search ) && headerSearchBlock.hasAttribute('data-filter-expanded')) {
    togglePanel('false');
  }
})

search.addEventListener('focus', () => {
  togglePanel('true');
  search.value.length ? filterItems(search.value) : filterItems();
  headerSearchBlock.scrollIntoView(true);
  if (isInvalid) search.setAttribute('aria-activedescendant', 'sMsg');
})

search.addEventListener('input', () => {
  filterItems(search.value);
})

const togglePanel = (state) => {
  search.setAttribute('aria-expanded', state);
  search.parentElement.setAttribute('data-expanded', state);
  if (state === 'true') {
    setTimeout(() => {
      headerSearchBlock.setAttribute('data-filter-expanded', '');
    }, 250);
  } else {
    headerSearchBlock.removeAttribute('data-filter-expanded');
  }
}

const highlightCurrent = (key) => {
  if (!currItem) {
    key === 'ArrowDown' || key === 'Home' ? currItem = searchList.firstElementChild : currItem = searchList.lastElementChild
  } else {
    if (key === 'ArrowDown' && currItem.nextElementSibling) currItem = currItem.nextElementSibling;
    if (key === 'ArrowUp' && currItem.previousElementSibling) currItem = currItem.previousElementSibling;
  }

  searchList.querySelectorAll('li').forEach(li => {
    if (li === currItem) {
      search.setAttribute('aria-activedescendant', currItem.firstElementChild.id);
      currItem.setAttribute('data-current', '');
      if (isSafari) debounceSafari(currItem);
    } else {
      li.removeAttribute('data-current');
    }
  }) 
  currItem.scrollIntoView({ block: "nearest", inline: "nearest" });
}

const polyfillSafari = (currItem) => {
  let title = `Link, ${currItem.querySelector('.underline').textContent}, ${currItem.querySelector('.search__type').textContent}, `;
  let count = `${currItem.getAttribute('data-pos')} of ${searchList.querySelectorAll('li').length}`;
  sMsg.textContent = '';
  sMsg.textContent = `${title} ${count}`;
}

const cleanStr = (str) => {
  let newStr = str.replace('-', ' ').toLowerCase().trimStart();
  newStr = newStr.replace(/[\"'..,!]/g, '');
  return newStr;
}

const filterItems = (term) => {
  if (term) {
    arrFiltered = items.filter(item => cleanStr(item.title).includes(cleanStr(term)));
  } else {
    arrFiltered = items.filter(item => item);
  }
  searchList.innerHTML = '';
  
  if (arrFiltered.length) {
    arrFiltered.slice(0, 10).forEach((item, idx) => {
      let res = `<li class="search__item" data-pos="${idx + 1}">
        <a class="search__option" id="${item.id}" href="${item.url}" tabindex="-1">
        <span class="underline">${item.title}</span><span class="search__type">${item.type}</span></a></li>`
      searchList.insertAdjacentHTML('beforeend', res);
    });

    if (currItem) {
      if (searchList.querySelector(`#${currItem.firstElementChild.id}`)) {
        highlightCurrent(searchList.querySelector(`#${currItem.firstElementChild.id}`).parentElement);
      } else {
        highlightCurrent(searchList.querySelector('[data-pos="1"]'));
      }  
    }
  }
  displayDetails();
}

const displayDetails = () => {
  if (searchList.querySelectorAll('li').length) {
    isInvalid = false;
  } else {
    isInvalid = true;
  }
  isInvalid ? errorIcon.classList.remove('visually-hidden') : errorIcon.classList.add('visually-hidden');
  debounceCount();
}

const debounce = (mainFunction, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};

const announceCount = () => {
  if (!isInvalid) {
    sInfo.textContent = `Showing ${searchList.querySelectorAll('li').length} of ${arrFiltered.length} results`;
  } else {
    sInfo.textContent = 'No results match your search term!';
  }
  sMsg.textContent = '';
  sMsg.textContent = sInfo.textContent;
};

const debounceCount = debounce(announceCount, 500);
const debounceSafari = debounce(polyfillSafari, 350);

// TODO ==================================

// REuse debounce
// Handle when currItem disappears
// Handle Safari
// Handle showing n of n
// Change border & perhaps shadow
// Test FF
// Test Enter & Tab as removed preventD()