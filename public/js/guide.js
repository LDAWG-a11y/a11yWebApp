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
    block.classList.add('code--with-copy');
    let header;
    if (navigator.clipboard) {
      header = `<div class="code__header"><span class="code__fake-btns"><span class="code__fake-btn"></span></span><button class="code__copy-btn">Copy ${
        language[1] == 'javascript'
          ? (language[1] = 'JavaScript')
          : language[1].toUpperCase()
      }</button></div>`;
      document.body.addEventListener('click', e => {
        if (e.target.classList.contains('code__copy-btn')) {
          copySnippet(e);
        }
      });
    } else {
      header = `<div class="code__header"><span class="code__fake-btn"></span><span class="code__label">${language[1].toUpperCase()}</span></div>`;
    }
    block.insertAdjacentHTML('beforebegin', header);
  }
});

async function copySnippet(e) {
  document.querySelector('.announcement').innerText = '';
  const btn = e.srcElement;
  const code = btn.parentElement.nextElementSibling.querySelector('code');
  let text = code.innerText;
  await navigator.clipboard.writeText(text);
  document.querySelector('.announcement').innerText =
    'Copied code to clipboard';
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

const infoPanels = document.querySelectorAll('[class^="callout"]');

infoPanels.forEach(panel => {
  if (panel.classList.contains('callout__tip')) {
    panel.firstElementChild.innerHTML = `
    <svg aria-hidden="true" focusable="false" width="24px" height="24px">
      <path fill="currentColor" d="M1 11h3v2H1v-2m9 11c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-1h-4v1m3-21h-2v3h2V1M4.9 3.5 3.5 4.9 5.6 7 7 5.6 4.9 3.5M20 11v2h3v-2h-3m-.9-7.5L17 5.6 18.4 7l2.1-2.1-1.4-1.4M18 12a6 6 0 0 1-3 5.2V19c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-1.8A6 6 0 0 1 12 6a6 6 0 0 1 6 6M8 12l.1 1H16l.1-1a4 4 0 1 0-8 0Z"/>
    </svg><p class="visually-hidden">Tip</p>`;
  } else if (panel.classList.contains('callout__info')) {
    panel.firstElementChild.innerHTML = `
    <svg aria-hidden="true" focusable="false" aria-label="Info: " width="24px" height="24px">
      <path fill="currentColor" d="M13.5 4A1.5 1.5 0 0 0 12 5.5 1.5 1.5 0 0 0 13.5 7 1.5 1.5 0 0 0 15 5.5 1.5 1.5 0 0 0 13.5 4m-.4 4.8c-1.2 0-4.4 2.7-4.4 2.7-.2.1-.1.1 0 .4.2.3.2.3.4.1.2 0 .5-.3 1-.6 2.2-1.4.4 1.7-.5 7-.4 2.7 2 1.3 2.6.9l2.3-1.6c.3-.2.1-.3 0-.5-.2-.2-.3 0-.3 0-.7.4-1.8 1.3-2 .7-.2-.6 1-4.5 1.7-7.2.1-.6.4-2-.8-2Z"/>
    </svg><p class="visually-hidden">Info</p>`;
  } else if (panel.classList.contains('callout__warn')) {
    panel.firstElementChild.innerHTML = `
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
      <path fill="#currentColor" d="M18 0C8.059 0 0 8.059 0 18s8.059 18 18 18 18-8.059 18-18S27.941 0 18 0Zm0 29.488c-1.406 0-2.371-1.082-2.371-2.488 0-1.445 1.004-2.488 2.371-2.488 1.445 0 2.371 1.043 2.371 2.488 0 1.406-.926 2.488-2.371 2.488Zm.934-9.508c-.36 1.223-1.489 1.247-1.864 0-.433-1.433-1.976-6.875-1.976-10.41 0-4.668 5.836-4.687 5.836 0 0 3.555-1.625 9.14-1.996 10.41Zm0 0"/>
    </svg><p class="visually-hidden">Warning</p>`;
  }
});
