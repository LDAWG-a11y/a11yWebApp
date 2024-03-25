import { items } from '/js/collections.js';
const headerSearchBlock = document.querySelector('.header__search-block');
const keys = ['ArrowUp', 'ArrowDown', 'Enter', 'Tab', 'Home', 'End'];
const search = document.querySelector('#sFilter');
const searchList = document.querySelector('.search__list');
const sMsg = document.querySelector('.search__msg');
let arrFiltered = [];
let currItem;
let isInvalid = false;

search.addEventListener('keydown', (evt) => {
  if (keys.includes(evt.key)) {
    if (evt.key === 'Tab') togglePanel('false');
    
    if (searchList.querySelector('li') && evt.key !== 'Tab') {
      evt.preventDefault();
      evt.stopPropagation();
      if ((!currItem && evt.key === 'ArrowDown' || evt.key === 'Home')) {
        highlightCurrent(searchList.firstElementChild);
      } else if (currItem && evt.key === 'ArrowDown' && currItem.nextSibling) {
        highlightCurrent(currItem.nextElementSibling);
      } else if ((!currItem && evt.key === 'ArrowUp') || evt.key === 'End') {
        highlightCurrent(searchList.lastElementChild)
      } else if (evt.key === 'ArrowUp' && currItem.previousSibling) {
        highlightCurrent(currItem.previousElementSibling);
      } 

      if (currItem && evt.key !== 'Enter') {
        currItem.scrollIntoView({ block: "nearest", inline: "nearest" });
      }

      if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        let title = `Link, ${currItem.querySelector('.underline').textContent}, ${currItem.querySelector('.search__type').textContent}, `;
        let count = `${currItem.getAttribute('data-pos')} of ${searchList.querySelectorAll('li').length}`;
        handleMessage('safari', title + count);
      }
  
      if (currItem && evt.key === 'Enter') {
        currItem.firstElementChild.click();
      } else if (searchList.firstElementChild && evt.key === 'Enter') {
        searchList.querySelectorAll('.underline').forEach(el => {
          if (cleanStr(el.textContent) === cleanStr(search.value)) {
            el.closest('a').click();
          }
        })
      }
      
       if (searchList.querySelectorAll('li').length === 1 && evt.key === 'Enter') {
        searchList.querySelector('a').click();
      }
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
  search.value ? filterItems(search.value) : filterItems();
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

const highlightCurrent = (currEl) => {
  search.setAttribute('aria-activedescendant', currEl.firstElementChild.id);
  currEl.setAttribute('data-current', '');
  currItem = currEl;
  searchList.querySelectorAll('li').forEach(item => {
    if (item !== currItem) item.removeAttribute('data-current');
  })
}

const cleanStr = (str) => {
  let newStr = str.replace('-', ' ').toLowerCase().trimStart();
  newStr = newStr.replace(/[\"'..,!]/g, '');
  return newStr;
}

const handleMessage = (action, msg) => {
  if (action === 'show') {
    sMsg.classList.remove('visually-hidden');
    sMsg.querySelector('.search__msg--text').innerText = msg;
    search.setAttribute('aria-activedescendant', '');
    currItem = '';
    isInvalid = true;
  } else if (action === 'hide') {
    sMsg.classList.add('visually-hidden');
    sMsg.querySelector('.search__msg--text').innerText = '';
    isInvalid = false;
  } else {
    sMsg.classList.add('visually-hidden');
    isInvalid = false;
    sMsg.innerText = msg;
  }
}

const filterItems = (term) => {
  if (term) {
    arrFiltered = items.filter(item => cleanStr(item.title).includes(cleanStr(term)));
  } else {
    arrFiltered = items.filter(item => item);
  }
  searchList.innerHTML = '';
  
  if (!arrFiltered.length) {
    handleMessage('show', 'No results match your search term!');
  } else {
    handleMessage('hide');
    
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
}