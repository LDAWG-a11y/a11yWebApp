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
    block.insertAdjacentHTML('beforebegin', `<section class="code__wrapper" aria-labelledby="cb${idx + 1}"><div class="code__header">
    <span id="cb${idx + 1}" class="visually-hidden">Code block ${idx + 1}, ${label}</span></div></section>`);
    
    let header = block.previousElementSibling.querySelector('.code__header');
    block.previousElementSibling.appendChild(block);
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
  let output = btn.closest('section').querySelector('.copy__announcement');
  output.innerText = '';
  const code = btn.parentElement.nextElementSibling.querySelector('code');
  let text = code.innerText;
  await navigator.clipboard.writeText(text);
  output.innerText = 'Copied to clipboard';

  setTimeout(() => {
    output.innerText = '';
  }, 5000);
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

window.addEventListener('resize', toggleTabStopOnTable);
window.onresize = toggleTabStopOnTable;
toggleTabStopOnTable();