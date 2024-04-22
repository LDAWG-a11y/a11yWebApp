const codeBlocks = document.querySelectorAll('pre');
const tables = document.querySelectorAll('table');
if (navigator.clipboard) {
  const alert = document.createElement('span');
  alert.classList.add('announcement', 'visually-hidden');
  alert.setAttribute('aria-live', 'polite');
  document.querySelector('footer').appendChild(alert);
}

codeBlocks.forEach((block, idx) => {
  let language = block.getAttribute('class').split('-');
  if (language) {
    let label = `${language[1] == 'javascript' ? language[1] = 'JavaScript' : language[1].toUpperCase()}`;
    block.insertAdjacentHTML('beforebegin', `<div class="code__wrapper"><section class="code__region" aria-labelledby="cb${idx + 1}"><div class="code__header">
    <span id="cb${idx + 1}" class="visually-hidden">Code block ${idx + 1}, ${label}</span></div></section></div>`);
    
    let header = block.previousElementSibling.querySelector('.code__header');
    block.previousElementSibling.querySelector('.code__region').appendChild(block)
    if (navigator.clipboard) {
      block.classList.add('code--with-copy');
      header.insertAdjacentHTML('afterbegin', `<output class="copy__announcement flex--middle"></output><button class="code__copy-btn btn btn--default">Copy ${label}</button>`);
    } else {
      header.insertAdjacentHTML('afterbegin', `<span class="code__label">${label}</span>`);
    }
  }
});

document.querySelectorAll('.code__copy-btn').forEach(btn => {
  btn.addEventListener('click', (evt) => {
    copySnippet(evt.target);
  });
});  

async function copySnippet(btn) {
  let output = btn.closest('.code__header').querySelector('.copy__announcement');
  output.innerText = '';
  const code = btn.closest('.code__wrapper').querySelector('code');
  let text = code.innerText;
  await navigator.clipboard.writeText(text);
  output.innerText = 'Copied to clipboard';

  setTimeout(() => {
    output.innerText = '';
  }, 5000);
}

const addTabStopToCodeBlock = () => { 
  document.querySelectorAll('.code__region').forEach(region => {
    if (region.scrollWidth > region.getBoundingClientRect().width) {
      region.setAttribute('tabindex', '0');
    } else {
      region.removeAttribute('tabindex');
    }
  })
}

const toggleTabStopOnTable = () => {
  tables.forEach((table, idx) => {
    if (table.scrollWidth > window.innerWidth - 20) {
      table.setAttribute('tabindex', '0');
      if (table.querySelector('caption')) {
        table.querySelector('caption').id = `caption-${idx + 1}`;
        table.setAttribute(
          'aria-labelledby',
          table.querySelector('caption').id
        );
      } else {
        table.setAttribute('aria-label', 'Scrollable');
      }
    } else {
      table.removeAttribute('tabindex');
      if (table.querySelector('caption')) {
        table.removeAttribute('aria-labelledby');
      } else {
        table.removeAttribute('aria-label');
      }
    }
  });
};

// TODO: Tidy this and reuse functionality for both
window.addEventListener('resize', toggleTabStopOnTable);
window.addEventListener('resize', addTabStopToCodeBlock);
window.onresize = toggleTabStopOnTable;
window.onresize = addTabStopToCodeBlock;
toggleTabStopOnTable();
addTabStopToCodeBlock();

document.querySelectorAll('.callout__info').forEach(panel => {
  panel.querySelector('.callout__icon').insertAdjacentHTML('afterbegin', '<svg width="24px" height="24px"><use href="#cInfo"></use></svg>')
})

document.querySelectorAll('.callout__tip').forEach(panel => {
  panel.querySelector('.callout__icon').insertAdjacentHTML('afterbegin', '<svg width="24px" height="24px"><use href="#cTip"></use></svg>')
})

document.querySelectorAll('.callout__warn').forEach(panel => {
  panel.querySelector('.callout__icon').insertAdjacentHTML('afterbegin', '<svg width="24px" height="24px"><use href="#cWarn"></use></svg>')
})