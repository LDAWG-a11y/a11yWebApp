const codeBlocks = document.querySelectorAll('pre');
const tables = document.querySelectorAll('table');
if (navigator.clipboard) {
  const alert = document.createElement('span');
  alert.classList.add('announcement', 'visually-hidden');
  alert.setAttribute('aria-live', 'polite')
  document.body.insertBefore(alert, document.querySelector('footer'));
}

codeBlocks.forEach((block, idx) => {
  let language = block.getAttribute('class').split("-");
  if (language) {
    block.classList.add('code--with-copy')
    let header;
    if (navigator.clipboard) {
      header = `<div class="code__header"><span class="code__fake-btns"><span class="code__fake-btn"></span></span><button class="code__copy-btn">Copy ${language[1] == 'javascript' ? language[1] = 'JavaScript' : language[1].toUpperCase()}</button></div>`;
      document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('code__copy-btn')) {
          copySnippet(e)
        }
      })
    } else {
      header = `<div class="code__header"><span class="code__fake-btn"></span><span class="code__label">${language[1].toUpperCase()}</span></div>`
    }
    block.insertAdjacentHTML('beforebegin', header);
  }
})

async function copySnippet(e) {
  document.querySelector('.announcement').innerText = '';
  const btn = e.srcElement;
  const code = btn.parentElement.nextElementSibling.querySelector('code');
  let text = code.innerText;
  await navigator.clipboard.writeText(text);
  document.querySelector('.announcement').innerText = 'Copied code to clipboard';
}

const toggleTabStopOnTable = () => {
  tables.forEach((table, idx) => {
    if (table.scrollWidth > (window.innerWidth - 20)) {
      table.setAttribute('tabindex', '0');
      if (table.querySelector('caption')) {
        table.querySelector('caption').id = `caption-${idx + 1}`;
        table.setAttribute("aria-labelledby", table.querySelector('caption').id) 
      } else {
        table.setAttribute("aria-label", 'Scrollable') 
      }
    } else {
      table.removeAttribute('tabindex');
      if (table.querySelector('caption')) {
        table.removeAttribute('aria-labelledby');
      } else {
        table.removeAttribute('aria-label');
      }
    }
  })
}

window.addEventListener('resize', toggleTabStopOnTable);
window.onresize = toggleTabStopOnTable;
toggleTabStopOnTable();