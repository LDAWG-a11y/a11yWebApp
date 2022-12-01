const accordions = document.querySelectorAll('.accordion');
// const rootFont = parseInt(window.getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('font-size'));

accordions.forEach( (accordion, idx) => {
  const accTitle = accordion.innerText;
  const accPanel = accordion.nextElementSibling;
  accPanel.id = `accPanel-${idx + 1}`
  // accPanel.setAttribute('data-height', `${accPanel.scrollHeight / rootFont}`);
  accordion.innerHTML = `<button class="accordion__btn" aria-controls="accPanel-${idx + 1}" aria-expanded="false">${accTitle}</button>`;
  let accBtn = accordion.firstElementChild;
  accordion.setAttribute('data-open', false);

  accBtn.addEventListener('click', () => {
    if (accBtn.getAttribute('aria-expanded') == 'false') {
      accBtn.setAttribute('aria-expanded', 'true');
      accordion.setAttribute('data-open', "true");
      // accPanel.setAttribute('style', `height: ${accPanel.getAttribute('data-height')}rem`);
    } else {
      accBtn.setAttribute('aria-expanded', 'false');
      accordion.setAttribute('data-open', false);
      // accPanel.setAttribute('style', 'height: 0');
    }
  });
})

accordions.forEach(accordion => {
  const accPanel = accordion.nextElementSibling;
  if (!accPanel.nextElementSibling || !accPanel.nextElementSibling.hasAttribute('data-open')) {
    accPanel.setAttribute('data-last', '');
  }
})

// TODO calculation to animate is a little off and doesn't work correctly when font-sizing is changed

// const resizeAccordions = () => {
//   document.querySelectorAll('.accordion__panel').forEach(panel => {
//     if (panel.previousElementSibling.getAttribute('data-open') == 'true') {
//       panel.setAttribute('style', `height: ${panel.scrollHeight / rootFont}rem`);
//     }
//   })
// }

// window.addEventListener('resize', resizeAccordions);
// window.onresize = resizeAccordions;

document.querySelector('#themeTrigger').addEventListener('click', () => {
  let btn = document.querySelector('#themeTrigger');
  btn.getAttribute('aria-expanded') == 'false' ? btn.setAttribute('aria-expanded', 'true') : btn.setAttribute('aria-expanded', 'false')
});

const themeBtnLight = document.querySelector('.header__themes-btn--light');
const themeBtnSystem = document.querySelector('.header__themes-btn--system');
const themeBtnDark = document.querySelector('.header__themes-btn--dark');

document.querySelector('.header').addEventListener('keyup', (e) => {
  if (e.key == "Escape" && document.querySelector('#themeTrigger').getAttribute('aria-expanded') == 'true' && !document.querySelector('.main-nav__list').contains(document.activeElement)) {
    if (document.querySelector('#themePanel').contains(document.activeElement)) {
      document.querySelector('#themeTrigger').focus();
    }
    document.querySelector('#themeTrigger').setAttribute('aria-expanded', 'false')
  }
});

themeBtnLight.addEventListener('click', (e) => {
  setTheme('light');
});

themeBtnSystem.addEventListener('click', (e) => {
  e.preventDefault();
  setTheme(false);
});

themeBtnDark.addEventListener('click', (e) => {
  setTheme('dark');
});

const setTheme = (theme) => {
  
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);

    if (theme == 'light') {
      themeBtnLight.setAttribute('aria-pressed', true);
      themeBtnDark.setAttribute('aria-pressed', false);
    } else if (theme == 'dark') {
      themeBtnLight.setAttribute('aria-pressed', false);
      themeBtnDark.setAttribute('aria-pressed', true);
    }
    themeBtnSystem.setAttribute('aria-pressed', false);
  }
  
  else {
    document.documentElement.removeAttribute('data-theme');
    window.localStorage.removeItem('theme');
    themeBtnLight.setAttribute('aria-pressed', false);
    themeBtnSystem.setAttribute('aria-pressed', true);
    themeBtnDark.setAttribute('aria-pressed', false);
  }
}

window.onload = () => {
  const themeAttr = document.documentElement.getAttribute('data-theme');
  if (themeAttr) {
    setTheme(themeAttr)
  } else {
    themeBtnSystem.setAttribute('aria-pressed', true);
  }
}