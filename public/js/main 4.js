const accordions = document.querySelectorAll('.accordion');

accordions.forEach( (accordion, idx) => {
  const accTitle = accordion.innerText;
  const accPanel = accordion.nextElementSibling;
  accPanel.id = `accPanel-${idx + 1}`
  // accPanel.setAttribute('data-height', `${accPanel.scrollHeight / 16 + 1}`);
  accordion.innerHTML = `<button class="accordion__btn" aria-controls="accPanel-${idx + 1}" aria-expanded="false">${accTitle}</button>`;
  let accBtn = accordion.firstElementChild;
  accordion.setAttribute('data-open', false);

  accBtn.addEventListener('click', () => {
    if (accBtn.ariaExpanded == 'false') {
      accBtn.ariaExpanded = 'true';
      accordion.setAttribute('data-open', "true");
      // const panelHeight = accPanel.getAttribute('data-height');
      // accPanel.setAttribute('style', `height: ${panelHeight}rem`);
    } else {
      accBtn.ariaExpanded = 'false';
      accordion.setAttribute('data-open', false);
      // accPanel.setAttribute('style', 'height: 0');
    }
  });
})

// TODO calculation to animate is a little off and doesn't work correctly when font-sizing is changed

// const resizeAccordions = () => {
//   document.querySelectorAll('.accordion__panel').forEach(panel => {
//     panel.setAttribute('data-height', `${panel.scrollHeight / 16 + 1}`);
//     if (panel.previousElementSibling.getAttribute('data-open') == 'true') {
//       panel.setAttribute('style', `height: ${panel.scrollHeight}rem`);
//     }
//   })
// }

// window.addEventListener('resize', resizeAccordions);
// window.onresize = resizeAccordions;