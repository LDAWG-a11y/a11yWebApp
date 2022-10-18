const expandAll = document.querySelector('.faqs__toggle--expand-all');
const collapseAll = document.querySelector('.faqs__toggle--collapse-all');
const accordionEls = document.querySelectorAll('.accordion');

expandAll.addEventListener('click', () => {
  if (expandAll.getAttribute('aria-pressed') == 'false') {
    expandAll.setAttribute('aria-pressed', 'true');
    collapseAll.setAttribute('aria-pressed', 'false')
  }

  accordionEls.forEach(el => {
    el.setAttribute('data-open', 'true');
    el.firstElementChild.setAttribute('aria-expanded', 'true');
  })
})

collapseAll.addEventListener('click', () => {
  if (collapseAll.getAttribute('aria-pressed') == 'false') {
    collapseAll.setAttribute('aria-pressed', 'true');
    expandAll.setAttribute('aria-pressed', 'false');
  }

  accordionEls.forEach(el => {
    el.setAttribute('data-open', 'false');
    el.firstElementChild.setAttribute('aria-expanded', 'false');
  })
})

accordionEls.forEach(el => {
  el.firstElementChild.addEventListener('click', () => {
    if (expandAll.getAttribute('aria-pressed') == 'true' || collapseAll.getAttribute('aria-pressed') == 'true') {
      expandAll.setAttribute('aria-pressed', 'false');
      collapseAll.setAttribute('aria-pressed', 'false');
    }
  })
})

