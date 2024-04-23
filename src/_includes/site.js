const settingsModal = document.querySelector('#settingsModal');
const modalCloseBtn = settingsModal.querySelector('#modalCloseBtn');
const prefsBtns = settingsModal.querySelectorAll('button[class^="settings__btn"]');
const prefsModalBtn = document.querySelector('#prefsBtn');
const accordions = document.querySelectorAll('.accordion');
const navBtn = document.querySelector('#navBtn');
const collabBtn = document.querySelector('#collabBtn');
const expandAll = document.querySelector('.accs__toggle--expand-all');
const collapseAll = document.querySelector('.accs__toggle--collapse-all');
const accsContainer = document.querySelector('.accs__container');

const toggleBool = (el, attr, state) => {
  if (!state) {
    el.getAttribute(attr) === 'false' ? state = 'true' : state = 'false';
  }
  el.getAttribute(attr) === 'false' ? el.setAttribute(attr, state) : el.setAttribute(attr, state);
}

accordions.forEach((accordion, idx) => {
  const accTitle = accordion.innerText;
  const accPanel = accordion.nextElementSibling;
  let initialState = 'false'
  if (accordion.closest('[data-pre-expanded]')) {
    initialState = 'true'
  }
  accordion.setAttribute('data-no-accent', '');
  accPanel.id = `accPanel-${idx + 1}`;
  accordion.innerHTML = `<button class="accordion__btn" id="acc-${idx + 1}"
  aria-controls="accPanel-${idx + 1}"
  aria-expanded="${initialState}">${accTitle}</button>`;

  if (accPanel.firstElementChild.tagName !== 'div' ) {
    const accPanelContents = accPanel.innerHTML;
    accPanel.innerHTML = '';
    accPanel.insertAdjacentHTML('afterbegin', `<div>${accPanelContents}</div>`)
  }

  let accBtn = accordion.firstElementChild;
  accordion.setAttribute('data-open', `${initialState}`);

  accBtn.addEventListener('click', () => {
    toggleBool(accBtn, 'aria-expanded');
    toggleBool(accBtn.parentElement, 'data-open');
  });

  if (accPanel.nextElementSibling === accordion || accPanel.hasAttribute('data-last')) {
    accordion.classList.add('accordion--multiple');
  }
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

if (accsContainer) {
  const multiAccordions = accsContainer.querySelectorAll('.accordion');
  collapseAll.setAttribute('aria-pressed', 'true');
  accsContainer.addEventListener('click', (evt) => {
    let newState;
    if (evt.target.hasAttribute('aria-pressed')) {
      if (evt.target === expandAll) {
        newState = 'true';
        expandAll.setAttribute('aria-pressed', 'true');
        collapseAll.setAttribute('aria-pressed', 'false');
      } else if (evt.target === collapseAll) {
        newState = 'false';
        collapseAll.setAttribute('aria-pressed', 'true');
        expandAll.setAttribute('aria-pressed', 'false');
      }
    
      multiAccordions.forEach(accordion => {
        toggleBool(accordion, 'data-open', newState);
        toggleBool(accordion.firstElementChild, 'aria-expanded', newState);
      })
    }

    if (evt.target.classList.contains('accordion__btn')) {
      let expandedAccs = accsContainer.querySelectorAll('.accordion__btn[aria-expanded="true"]');
      if (expandedAccs.length && expandedAccs.length < multiAccordions.length) {
        expandAll.setAttribute('aria-pressed', 'mixed');
        collapseAll.setAttribute('aria-pressed', 'mixed');
      } else if (!expandedAccs.length) {
        collapseAll.setAttribute('aria-pressed', 'true');
        expandAll.setAttribute('aria-pressed', 'false');
      } else if (expandedAccs.length && expandedAccs.length === multiAccordions.length) {
        expandAll.setAttribute('aria-pressed', 'true');
        collapseAll.setAttribute('aria-pressed', 'false');
      } else {
        expandAll.setAttribute('aria-pressed', 'false');
        collapseAll.setAttribute('aria-pressed', 'false');
      }
    }
  })
}

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
    if (pref[0] === 'theme') matchLogoToTheme(); 
  })
})

const togglePrefsBtns = (btn) => {
  btn.closest('.settings__btns-wrapper').querySelectorAll('button').forEach(prefBtn => {
    if (prefBtn !== btn) {
      prefBtn.setAttribute('aria-pressed', 'false');
    }
  })
}

const matchLogoToTheme = () => {
  let currTheme;
  if (document.documentElement.getAttribute('data-pref--theme')) {
    currTheme = document.documentElement.getAttribute('data-pref--theme')
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    currTheme = 'dark';
  } else {
    currTheme = 'light';
  }
  
  document.querySelectorAll('[data-main-logo]').forEach(imgSource => {
    if (imgSource.getAttribute('srcset').includes(currTheme)) {
      imgSource.setAttribute('media', 'all');
    } else {
      imgSource.setAttribute('media', 'none');
    }
  })
}

matchLogoToTheme()

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
  settingsModal.removeAttribute('hidden');
  settingsModal.showModal();
})

modalCloseBtn.addEventListener('click', () => {
  closeModal();
})

document.addEventListener('click', (evt) => {
  if (evt.target === settingsModal) closeModal();
})

const closeModal = () => {
  settingsModal.classList.add('closing');
  
  setTimeout(() => {
    settingsModal.classList.remove('closing');
    settingsModal.setAttribute('hidden', '');
    settingsModal.close();
  }, 800);
}