const codeBlocks = document.querySelectorAll('pre');
const tables = document.querySelectorAll('table')

codeBlocks.forEach(block => {
  let language = block.getAttribute('class').split("-");
  if (language) {
    const label = `<span class="code__label">${language[1].toUpperCase()}</span>`;
    block.insertAdjacentHTML('beforebegin', label)
  }
})

const toggleTabStopOnTable = () => {
  tables.forEach((table, idx) => {
    if (table.scrollWidth > window.innerWidth) {
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