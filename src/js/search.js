import { items } from '/js/collections.js';
const headerSearchBlock = document.querySelector('.header__search-block');
const keys = ['ArrowUp', 'ArrowDown', 'Enter', 'Tab', 'Home', 'End'];
const search = document.querySelector('#sFilter');
const searchList = document.querySelector('.search__list');
const sMsg = document.querySelector('#sMsg');
const sFix = document.querySelector('#sFix');
const sInfo = document.querySelector('.search__info--text');
let arrFiltered = [];
let displayedItems = [];
let currItem;
let isInvalid = false;
const isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

search.addEventListener('keydown', (evt) => {
  if (keys.includes(evt.key)) {
    if (evt.key === 'Tab') togglePanel('false');
    
    if (searchList.querySelector('li') && evt.key !== 'Tab') {
      evt.preventDefault();
      evt.stopPropagation();
      
      if ((!currItem && evt.key === 'ArrowDown') || evt.key === 'Home') {
        highlightCurrent(searchList.firstElementChild);
      } else if (currItem && evt.key === 'ArrowDown' && currItem.nextElementSibling) {
        console.log( currItem );
        highlightCurrent(currItem.nextElementSibling);
      } else if ((!currItem && evt.key === 'ArrowUp') || evt.key === 'End') {
        highlightCurrent(searchList.lastElementChild)
      } else if (evt.key === 'ArrowUp' && currItem.previousElementSibling) {
        highlightCurrent(currItem.previousElementSibling);
      } else if (currItem && evt.key !== 'Enter') {
        currItem.scrollIntoView({ block: "nearest", inline: "nearest" });
      }

      if (isSafari) {
        let title = `Link, ${currItem.querySelector('.underline').textContent}, ${currItem.querySelector('.search__type').textContent}, `;
        let count = `${currItem.getAttribute('data-pos')} of ${searchList.querySelectorAll('li').length}`;
        sFix.textContent = title + count;
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
  displayedItems.forEach(li => {
    if (li === currEl) {
      currItem = li;
      li.setAttribute('data-current', '');
      console.log( li, 'li' );
      console.log( li.firstElementChild, 'fec' );
      search.setAttribute('aria-activedescendant', li.firstElementChild.id);
    } else {
      li.removeAttribute('data-current');
    }
  })  
}

const cleanStr = (str) => {
  let newStr = str.replace('-', ' ').toLowerCase().trimStart();
  newStr = newStr.replace(/[\"'..,!]/g, '');
  return newStr;
}

function debounce( callback, delay ) {
  let timeout;
  return function() {
    clearTimeout( timeout );
    timeout = setTimeout( callback, delay );
  }
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
    displayedItems.splice(0, displayedItems.length, ...searchList.querySelectorAll('li'));

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
    sInfo.textContent = `Showing ${searchList.querySelectorAll('li').length} of ${arrFiltered.length} results`;
    sInfo.closest('.search__info').querySelector('.search__info--icon').classList.add('visually-hidden');
  } else {
    isInvalid = true;
    sInfo.textContent = 'No results match your search term!';
    sInfo.closest('.search__info').querySelector('.search__info--icon').classList.remove('visually-hidden');
  }

  if (isInvalid || search.value.length < 1) {
    announceDetailsNow();
  } else {
    announceDetailsSoon();
  }
}

const announceDetailsNow = debounce(() => {
  sMsg.textContent = '';
  sMsg.textContent = sInfo.textContent;
}, 0);

const announceDetailsSoon = debounce(() => {
  if (isSafari && currItem) {
    sMsg.textContent = `${sFix.textContent} - ${sInfo.textContent}`;
    sFix.textContent = '';
  } else {
    sMsg.textContent = sInfo.textContent;
  }
}, 500);
