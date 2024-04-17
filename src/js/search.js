import { items } from '/js/collections.js';
const headerSearchBlock = document.querySelector('.header__search-block');
const keys = ['ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', 'Escape', 'Tab'];
const searchInput = document.querySelector('#sFilter');
const searchList = document.querySelector('.search__list');
const sMsg = document.querySelector('#sMsg');
const sInfo = document.querySelector('.search__info--text');
const errorIcon = headerSearchBlock.querySelector('.search__info--icon');
let arrFiltered = [];
let currItem;
let isInvalid = false;

const togglePanel = (state) => {
  searchInput.setAttribute('aria-expanded', state);
  searchInput.parentElement.setAttribute('data-expanded', state);
  if (state === 'true') {
    setTimeout(() => {
      headerSearchBlock.setAttribute('data-filter-expanded', '');
    }, 100);
  } else {
    headerSearchBlock.removeAttribute('data-filter-expanded');
  }
}

const updateDescendant = (item) => {
  currItem = item;
  searchList.querySelectorAll('.search__item').forEach(el => {
    if (el !== item) {
      el.removeAttribute('data-current')
      el.removeAttribute('aria-selected')
    }
  })
  
  item.setAttribute('data-current', '');
  item.scrollIntoView({ block: "nearest", inline: "nearest" });
  debounceDescendant();
}

const removeDescendant = () => {
  currItem = '';
  searchList.querySelector('[data-current]').removeAttribute('data-current')
}

searchInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Tab') togglePanel('false')
  if (keys.includes(evt.key) && arrFiltered.length) {
    evt.preventDefault();
    handleKeys(evt.key)
  }
})

const handleKeys = (key) => {
  let resultsLength = searchList.querySelectorAll('.search__option').length.toString();
  
  if (key === 'ArrowDown') {
    if (!searchList.querySelector('[data-current]')) {
      updateDescendant(searchList.querySelector('[data-pos="1"]'));
    } else if (searchList.querySelector('[data-current]') && currItem.nextElementSibling) {
      updateDescendant(currItem.nextElementSibling);
    }
  }
  
  if (key === 'ArrowUp') {
    if (!currItem) {
      updateDescendant(searchList.querySelector(`data-pos="${resultsLength}"`));
    } else if (currItem && currItem.previousElementSibling) {
      updateDescendant(currItem.previousElementSibling);
    }
  }
  
  if (key === 'Home') updateDescendant(searchList.querySelector('[data-pos="1"]'));
  if (key === 'End') updateDescendant(searchList.querySelector(`[data-pos="${resultsLength}"]`));
  if (key === 'Enter') navigateToPage();
  if (key === 'Escape') removeDescendant();
  if (key === 'Tab') togglePanel('false');
}

const navigateToPage = () => {
  if (currItem) currItem.firstElementChild.click();
  
  if (!currItem && searchInput.value.length) {
    searchList.querySelectorAll('.search__text').forEach(el => {
      if (cleanStr(el.textContent) === cleanStr(searchInput.value)) {
        el.closest('a').click();
      }
    })
  }
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
      let results = `<li class="search__item" data-pos="${idx + 1}">
        <a class="search__option" id="${item.id}" href="${item.url}" tabindex="-1">
        <span class="search__text">${item.title}</span><span class="search__type">${item.type}</span></a></li>`
      searchList.insertAdjacentHTML('beforeend', results);
    });

    if (currItem) {
      if (searchList.querySelector(`#${currItem.firstElementChild.id}`)) {
        updateDescendant(searchList.querySelector(`#${currItem.firstElementChild.id}`).parentElement);
      } else {
        updateDescendant(searchList.querySelector('[data-pos="1"]'));
        debounceDescendant();
      }  
    }
  }
  displayCount();
}

const displayCount = () => {
  searchList.querySelectorAll('li').length ? isInvalid = false : isInvalid = true;
  isInvalid ? errorIcon.classList.remove('visually-hidden') : errorIcon.classList.add('visually-hidden');
  if (!isInvalid) {
    sInfo.textContent = `Showing ${searchList.querySelectorAll('li').length} of ${arrFiltered.length} results`;
  } else {
    sInfo.textContent = 'No results match your search term!';
  }
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
  sMsg.textContent = sInfo.textContent;
};

const announceDescendant = () => {
  sMsg.textContent = '';
  let title = `Link, ${currItem.querySelector('.search__text').textContent}, ${currItem.querySelector('.search__type').textContent}, `;
  let count = `${currItem.getAttribute('data-pos')} of ${searchList.querySelectorAll('li').length}`;
  sMsg.textContent = `${title} ${count}`;
}

searchInput.addEventListener('focus', () => {
  togglePanel('true');
  searchInput.value.length ? filterItems(searchInput.value) : filterItems();
  headerSearchBlock.scrollIntoView(true);
  isInvalid ? searchInput.setAttribute('aria-invalid', 'true') : searchInput.removeAttribute('aria-invalid');
  debounceCount();
  if (currItem) debounceDescendant(currItem); 
})

document.addEventListener('click', (evt) => {
  if ((!evt.target.closest('.search__panel') && evt.target !== searchInput ) && headerSearchBlock.hasAttribute('data-filter-expanded')) {
    togglePanel('false');
  }
})

searchInput.addEventListener('input', () => {
  filterItems(searchInput.value);
})

const debounceCount = debounce(announceCount, 300);
const debounceDescendant = debounce(announceDescendant, 300);