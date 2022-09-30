const codeBlocks = document.querySelectorAll('pre');

codeBlocks.forEach(block => {
  let language = block.getAttribute('class').split("-")
  const label = `<span class="code__label">${language[1].toUpperCase()}</span>`;
  block.insertAdjacentHTML('beforebegin', label)
})