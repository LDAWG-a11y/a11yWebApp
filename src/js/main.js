const settingsModal = document.querySelector('#settingsModal');
const modalCloseBtn = settingsModal.querySelector('#modalCloseBtn');
const prefsBtns = settingsModal.querySelectorAll('button[class^="settings__btn"]');
const prefsModalBtn = document.querySelector('#prefsBtn');
const accordions = document.querySelectorAll('.accordion');
const navBtn = document.querySelector('#navBtn');
const collabBtn = document.querySelector('#collabBtn');

const toggleBool = (el, attr) => {
  el.getAttribute(attr) === 'false' ? el.setAttribute(attr, 'true') : el.setAttribute(attr, 'false');
}

accordions.forEach((accordion, idx) => {
  const accTitle = accordion.innerText;
  const accPanel = accordion.nextElementSibling;
  accordion.setAttribute('data-no-accent', '');
  accPanel.id = `accPanel-${idx + 1}`;
  accordion.innerHTML = `<button class="accordion__btn" id="acc-${idx + 1}"
  aria-controls="accPanel-${idx + 1}"
  aria-expanded="false">${accTitle}</button>`;

  let accBtn = accordion.firstElementChild;
  accordion.setAttribute('data-open', false);

  accBtn.addEventListener('click', () => {
    toggleBool(accBtn, 'aria-expanded');
    toggleBool(accBtn.parentElement, 'data-open');
  });
});

accordions.forEach(accordion => {
  const accPanel = accordion.nextElementSibling;
  if (!accPanel.nextElementSibling || !accPanel.nextElementSibling.hasAttribute('data-open')) {
    accPanel.setAttribute('data-last', '');
  }

  if (!accordion.previousElementSibling || !accordion.previousElementSibling.classList.contains('accordion__panel')) {
    accordion.nextElementSibling.setAttribute('data-first', '');
  }

  if (accPanel.hasAttribute('data-first') && accPanel.hasAttribute('data-last')) {
    accPanel.removeAttribute('data-last');
    accPanel.removeAttribute('data-first');
    accPanel.previousElementSibling.classList.add('accordion--single');
  } else {
    accPanel.previousElementSibling.classList.add('accordion--multiple');
  }
});

prefsBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.setAttribute('aria-pressed', 'true');
    const pref = btn.getAttribute('data-pref').split(' ');
    if (pref[1] !== 'unset') {
      document.documentElement.setAttribute(`data-pref--${pref[0]}`, pref[1]);
      window.localStorage.setItem(`data-pref--${pref[0]}`, pref[1]);
    } else {
      document.documentElement.removeAttribute(`data-pref--${pref[0]}`);
      window.localStorage.removeItem(`data-pref--${pref[0]}`);
    }
    togglePrefsBtns(btn);
    if (pref[0] === 'theme') toggleLightDarkLogo(); 
  })
})

const togglePrefsBtns = (btn) => {
  btn.closest('.settings__btns-wrapper').querySelectorAll('button').forEach(prefBtn => {
    if (prefBtn !== btn) {
      prefBtn.setAttribute('aria-pressed', 'false');
    }
  })
}

const toggleLightDarkLogo = () => {
  const themeAttr = document.documentElement.getAttribute('data-pref--theme');
  let currTheme = themeAttr === 'light' ? 'light' : 'dark';
  
  document.querySelectorAll('[data-main-logo]').forEach(imgSource => {
    if (themeAttr) {
      if (imgSource.getAttribute('srcset').includes(currTheme)) {
        imgSource.setAttribute('media', 'all');
      } else {
        imgSource.setAttribute('media', 'none');
      }
    } else {
      let theme = imgSource.getAttribute('srcset').includes('light') ? 'light' : 'dark';
      imgSource.setAttribute('media', `(prefers-color-scheme: ${theme})`);
    }
  })
}
toggleLightDarkLogo()

window.onload = () => {
  const userStoredPrefs = {...localStorage};
  for (const prop in userStoredPrefs) {
    if (prop.startsWith('data-pref-') && prop !== 'data-pref--theme') {
      document.documentElement.setAttribute(`${prop}`, userStoredPrefs[prop]);
    }
  }

  for (const userPref of document.documentElement.attributes) {
    if (userPref.name.includes('data-pref--')) {
      let prefType = userPref.name.split('--');
      settingsModal.querySelector(`.settings__btn--${prefType[1]}-${userPref.value}`).setAttribute('aria-pressed', 'true');
    }
  }

  settingsModal.querySelectorAll('.settings__btns-wrapper').forEach(group => {
    if (!group.querySelector('button[aria-pressed="true"]')) {
      group.querySelector('[data-pref~="unset"').setAttribute('aria-pressed', 'true');
    }
  })
}

collabBtn.addEventListener('click', () => {
  toggleBool(collabBtn, 'aria-expanded')
})

navBtn.addEventListener('click', () => {
  toggleBool(navBtn, 'aria-expanded');
  navBtn.removeAttribute('data-untouched');
})

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    if (collabBtn.getAttribute('aria-expanded') === 'true' && !settingsModal.hasAttribute('open')) {
      toggleBool(collabBtn, 'aria-expanded');
    }
  }
})

prefsModalBtn.addEventListener('click', () => {
  settingsModal.showModal();
})

modalCloseBtn.addEventListener('click', () => {
  closeModal();
})

document.addEventListener('click', (evt) => {
  if (evt.target === settingsModal) closeModal();
})

const closeModal = () => {
  settingsModal.classList.add('animating');

  setTimeout(() => {
    settingsModal.classList.remove('animating');
    settingsModal.close();
  }, 750);
}