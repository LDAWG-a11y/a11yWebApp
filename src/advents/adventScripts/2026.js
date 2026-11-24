const actionBtns = document.querySelectorAll('.advent__action-btn');
const doors = document.querySelectorAll('.advent__door');
const modal = document.querySelector('.advent__modal');
const modalCloseBtn = modal.querySelector('.advent__modal-close');
const accordion = document.querySelector('.accordion__btn');
const toggles = document.querySelectorAll('.toggle__switch');
const togglesWrapper = document.querySelector('.toggles__wrapper');
const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const adventReset = document.querySelector('#adventReset');
const prefsReset = document.querySelector('#prefsReset');
const gridItems = Array.from(document.querySelectorAll('.advent__grid-item'));
const originalButtons = gridItems.map((slot) => slot.querySelector('.advent__action-btn'));
const tableContainer = document.querySelector('.table__scroll-container');
const table = document.querySelector('.table');
const announcements = document.querySelector('#announcements');
const prefsAnnouncement = document.querySelector('.reset__status--prefs');
const adventAnnouncement = document.querySelector('.reset__status--advent');
const skipToDoor = document.querySelector('#skipToDoor');
const dayParam = parseInt(new URLSearchParams(location.search).get('day'), 10);
const DEV_DAY = (!Number.isNaN(dayParam) && dayParam >= 1 && dayParam <= 25) ? dayParam : null;
let now, currentDay, currentMonth, currentYear, currentDate, unlockedDays;

function getUnlockedDays() {
  if (DEV_DAY !== null) return DEV_DAY;
  const start = new Date(2026, 11, 1);
  if (currentDate < start) return 0;
  if (currentYear > 2026 || currentMonth !== 11) return 25;
  return currentDay;
}

function updateDate() {
  now = DEV_DAY !== null ? new Date(2026, 11, DEV_DAY) : new Date();
  currentDay = now.getDate();
  currentMonth = now.getMonth();
  currentYear = now.getFullYear();
  currentDate = new Date(currentYear, currentMonth, currentDay);
  unlockedDays = getUnlockedDays();
}

updateDate();
let openingDoor = false;
let modalDelay = 1500;
let modalIsOpen = false;
let lastOpenedBtn = null;
let pendingModalTimer = null;
let modalRevealCancelled = false;

const sortedButtons = [...originalButtons].sort((a, b) => {
  const dayA = Number(a.querySelector('.advent__day-label').textContent.trim());
  const dayB = Number(b.querySelector('.advent__day-label').textContent.trim());
  return dayA - dayB;
});


const addSkipURL = () => {
  const firstAvailable = sortedButtons.find(btn => {
    const day = Number(btn.id.split('-')[1]);
    return day <= unlockedDays && !btn.parentElement.classList.contains('opened');
  });
  if (firstAvailable) {
    skipToDoor.href = `#action-${Number(firstAvailable.id.split('-')[1])}`;
  } else {
    skipToDoor.style.display = 'none';
  }
}

const populateModal = (btn) => {
  const modalTitle = modal.querySelector('.advent__modal-title');
  const modalGift = modal.querySelector('.advent__modal-gift');
  const modalLink = modal.querySelector('.advent__modal-link');
  const modalCaption = modal.querySelector('figcaption');
  const sleepsLeft = document.querySelector('.advent__modal-sleeps');
  const day = btn.id.split('-')[1];
  const dateObj = new Date(2026, 11, day);

  modalTitle.textContent = dateObj.toLocaleDateString(navigator.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  modalGift.src = btn.querySelector('img').src;
  modalGift.alt = btn.querySelector('img').alt;
  modalCaption.textContent = btn.querySelector('img').dataset.shortName;
  modalLink.href = btn.dataset.a11yLink
  modalLink.textContent = btn.dataset.a11yLinkText;
  if (Number(day) && currentMonth === 11 && currentYear === 2026 && Number(day) !== 25) {
    sleepsLeft.textContent = `Only ${25 - Number(day)} sleep${25 - Number(day) === 1 ? '' : 's'} left until Christmas!`;
  } else if (Number(day) && currentMonth === 11 && currentYear === 2026 && Number(day) === 25) {
    sleepsLeft.textContent = `Merry Christmas!`;
  } else {
    sleepsLeft.textContent = '';
  }
  

  if (btn.parentElement.classList.contains('opened')) {
    modal.showModal();
    modalIsOpen = true;
  } else {
    pendingModalTimer = window.setTimeout(() => {
      modal.showModal();
      modalIsOpen = true;
      pendingModalTimer = null;
    }, modalDelay);
  }
}

const checkLocalStorage = () => {
  const openedDoors = (JSON.parse(localStorage.getItem('openedDoors')) || [])
    .map(Number)
    .sort((a, b) => a - b);

  openedDoors.forEach(day => {
    if (day > unlockedDays) return;
    const btn = document.querySelector(`#action-${day}`);
    if (btn) {
      unlockDoors(btn, true);
      populateTable(btn);
    }
  });
};

const checkPrefs = () => {
  let pref = JSON.parse(localStorage.getItem('pref')) || [];
  let keys = Array.isArray(pref) ? pref : Object.keys(pref).filter(k => pref[k]);

  keys.forEach(key => {
    const toggle = document.querySelector(`[data-pref="${key}"]`);
    if (toggle) {
      toggle.setAttribute('aria-pressed', 'true');
      document.documentElement.dataset[key] = 'true';
    }
  });

  if (keys.includes('numerical')) {
    reorderBtns(true);
  }

  if (keys.includes('disable')) {
    disableOpened();
  }

  const reduceMotion = keys.includes('motion') ? true
    : keys.includes('allow-motion') ? false
    : mqMotion.matches;
  applyMotionPref(reduceMotion);
  disableEnableResets();
}

const setLocalStorage = (day, pref) => {
  if (day) {
    const openedDoors = JSON.parse(localStorage.getItem('openedDoors')) || [];
    if (!openedDoors.includes(day)) {
      openedDoors.push(day);
      localStorage.setItem('openedDoors', JSON.stringify(openedDoors));
    }
  } else if (pref) {
    const existingPref = JSON.parse(localStorage.getItem('pref')) || [];
    if (!existingPref.includes(pref)) {
      existingPref.push(pref);
    }
    pref = existingPref;
    localStorage.setItem('pref', JSON.stringify(pref));
  }
}

const removePref = (key) => {
  const storedPrefs = (JSON.parse(localStorage.getItem('pref')) || []).filter(p => p !== key);
  storedPrefs.length ? localStorage.setItem('pref', JSON.stringify(storedPrefs)) : localStorage.removeItem('pref');
}

const unlockDoors = (btn, hasBeenOpened ) => {
  if (hasBeenOpened) {
    btn.parentElement.classList.add('opened');
    btn.querySelector('.advent__day-status').textContent = 'open';
  } else if (!btn.parentElement.classList.contains('opened')) {
    btn.querySelector('.advent__day-status').textContent = 'Unlocked';
  }
  btn.removeAttribute('aria-disabled');
  btn.setAttribute('aria-haspopup', 'dialog');
}

const populateTable = (btn) => {
  document.querySelector('.advent__gift-collection').removeAttribute('hidden');
  const tBody = document.querySelector('.table__body');
  const dayText = btn.querySelector('.advent__day-label').textContent.trim();
  const newDay = Number(dayText);

  const rowHTML = `
    <tr>
      <td class="table__cell">${dayText}</td>
      <td class="table__cell">
        <span class="table__img-container">
          <img class="table__img" src="${btn.querySelector('img').src}" alt="${btn.querySelector('img').alt}">
          <span>${btn.querySelector('img').dataset.shortName}</span>
        </span>
      </td>
      <td class="table__cell"><a href="${btn.dataset.a11yLink}" class="advent__modal-link">${btn.dataset.a11yLinkText}</a></td>
    </tr>
  `;

  const existingRows = Array.from(tBody.querySelectorAll('tr'));
  const nextRow = existingRows.find(row => {
    const rowDay = Number(row.querySelector('.table__cell').textContent.trim());
    return rowDay > newDay;
  });

  nextRow ? nextRow.insertAdjacentHTML('beforebegin', rowHTML) : tBody.insertAdjacentHTML('beforeend', rowHTML);
};

const detectWhenTableIsScrollable = () => {
  const tableContainer = document.querySelector('.table__scroll-container');
  const table = document.querySelector('.table');

  if (!tableContainer || !table) return;

  if (Math.ceil(table.scrollWidth) > Math.ceil(tableContainer.clientWidth)) {
    tableContainer.setAttribute('aria-labelledby', 'collectionTitle');
    tableContainer.setAttribute('tabindex', '0');
  } else {
    tableContainer.removeAttribute('aria-labelledby');
    tableContainer.removeAttribute('tabindex');
  }
};

const setBadge = () => {
  const pressedCount = Array.from(toggles).filter(btn => btn.getAttribute('aria-pressed') === 'true').length;
  if (pressedCount > 0) {
    accordion.querySelector('.accordion__badge').textContent = `${pressedCount}`;
    accordion.querySelector('.accordion__badge').insertAdjacentHTML('beforeend', ' <span class="visually-hidden">active</span>');
    accordion.querySelector('.accordion__badge').dataset.prefsSet = 'true';
  } else {
    accordion.querySelector('.accordion__badge').textContent = '';
    accordion.querySelector('.accordion__badge').dataset.prefsSet = 'false';
  }
};

const resetAdvent = () => {
  const tBody = document.querySelector('.table__body');
  gridItems.forEach(el => {
    if (el.classList.contains('opened')) {
      el.classList.remove('opened');
      el.removeAttribute('disabled');
      el.querySelector('.advent__day-status').textContent = 'Unlocked';
      el.setAttribute('aria-haspopup', 'dialog');
    }
  })
  document.querySelector('.advent__gift-collection').setAttribute('hidden', '');
  tBody.replaceChildren();
  addSkipURL();
  disableEnableResets();
}

const disableOpened = () => {
  actionBtns.forEach(btn => {
    if (btn.parentElement.classList.contains('opened')) {
      btn.setAttribute('disabled', '');
      btn.removeAttribute('aria-haspopup');
    }
  })
}

const enableOpened = () => {
  actionBtns.forEach(btn => {
    btn.removeAttribute('disabled');
    btn.setAttribute('aria-haspopup', 'dialog');
  })
}

const disableBehindUser = (btn) => {
  btn.addEventListener('focusout', (evt) => {
    if (modal.open || (evt.relatedTarget && modal.contains(evt.relatedTarget))) return;
    if (document.documentElement.dataset.disable !== 'true') return;
    if (!btn.parentElement.classList.contains('opened')) return;
    btn.setAttribute('disabled', '');
    btn.removeAttribute('aria-haspopup');
  }, { once: true }); 
}

const applyDisablePref = (btn) => {
  if (document.documentElement.dataset.disable !== 'true' || !btn) return;
  if (document.activeElement === btn) {
    disableBehindUser(btn);
  } else {
    btn.setAttribute('disabled', '');
    btn.removeAttribute('aria-haspopup');
  }
}

const reorderBtns = (useNumericalOrder) => {
  const targetButtons = useNumericalOrder ? sortedButtons : originalButtons;

  gridItems.forEach((slot, idx) => {
    const btn = targetButtons[idx];
    slot.appendChild(targetButtons[idx]);
    const status = btn.querySelector('.advent__day-status').textContent.trim().toLowerCase();
    slot.classList.toggle('opened', status === 'open');
  });
};


const applyMotionPref = (enabled) => {
  document.getElementById('animations').setAttribute('aria-pressed', String(enabled));
  if (enabled) {
    document.documentElement.dataset.motion = 'true';
  } else {
    delete document.documentElement.dataset.motion;
  }
  modalDelay = enabled ? 500 : 1500;
};

const getOrdinals = (n) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

// ---- Event listeners ----

const gridCols = Number(getComputedStyle(document.documentElement).getPropertyValue('--grid-cols')) || 5;

doors.forEach((door, idx) => {
  const row = Math.floor(idx / gridCols);
  const col = idx % gridCols;
  door.style.setProperty('--row', row);
  door.style.setProperty('--col', col);
})

actionBtns.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    if (btn === evt.currentTarget && !btn.hasAttribute('aria-disabled') && !openingDoor) {
      openingDoor = true;
      lastOpenedBtn = btn;
      btn.parentElement.classList.add('opening');
      populateModal(evt.currentTarget);
      setLocalStorage(btn.id.split('-')[1]);
      disableEnableResets();
      if (!btn.parentElement.classList.contains('opened')) {
        populateTable(btn);
      }
      window.setTimeout(() => {
        btn.parentElement.classList.remove('opening');
        openingDoor = false;
        btn.parentElement.classList.add('opened');
        btn.querySelector('.advent__day-status').textContent = 'open';
        addSkipURL();
        disableEnableResets();
        if (modalRevealCancelled) {
          modalRevealCancelled = false;
          applyDisablePref(btn);
        }
      }, modalDelay);
    } else if (openingDoor) {
      return;
    } else {
      if (!btn.parentElement.querySelector('.advent__door-lock-img')) {
        btn.parentElement.insertAdjacentHTML('beforeend', '<img src="/advents/xmas-icons/locked.png" alt="" class="advent__door-lock-img">');
        announcements.textContent = `This door is locked, come back on the ${getOrdinals(btn.id.split('-')[1])}.`;
        setTimeout(() => {
        document.querySelector('.advent__door-lock-img').remove();
      }, 5000);
      }
    }
  })
})

modalCloseBtn.addEventListener('click', () => {
  modal.close();
  modalIsOpen = false;
})

modal.addEventListener('close', () => {
  modalIsOpen = false; 
  applyDisablePref(lastOpenedBtn);
})

window.addEventListener('click', (evt) => {
  if (!modalIsOpen || evt.target !== modal) return;
  const rect = modal.getBoundingClientRect();
  const insideDialog =
    evt.clientX >= rect.left && evt.clientX <= rect.right &&
    evt.clientY >= rect.top && evt.clientY <= rect.bottom;
  if (!insideDialog) {
    modal.close();
    modalIsOpen = false;
  }
})

window.addEventListener('keydown', (evt) => {
  if (evt.key !== 'Escape') return;
  if (pendingModalTimer !== null) {
    clearTimeout(pendingModalTimer);
    pendingModalTimer = null;
    modalRevealCancelled = true;
    announcements.textContent = 'Gift details cancelled. Your gifts are available in the gifts table';
    return;
  }
  if (modalIsOpen) {
    modal.close();
    modalIsOpen = false;
  }
});

accordion.addEventListener('click', () => {
  accordion.getAttribute('aria-expanded') === 'false' ? accordion.setAttribute('aria-expanded', 'true') : accordion.setAttribute('aria-expanded', 'false');
})

toggles.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    if (btn.getAttribute('aria-pressed') === 'false') {
      btn.setAttribute('aria-pressed', 'true');
      document.documentElement.dataset[btn.dataset.pref] = 'true';
      if (evt.currentTarget.id === 'animations') {
        modalDelay = 500;
        removePref('allow-motion');
      }
      if (evt.currentTarget.id === 'disableOpen' ) disableOpened();
      if (evt.currentTarget.id === 'numericalOrder') reorderBtns(true);
      setLocalStorage(null, btn.dataset.pref);
    } else {
      btn.setAttribute('aria-pressed', 'false');
      delete document.documentElement.dataset[btn.dataset.pref];
      if (evt.currentTarget.id === 'animations') {
        modalDelay = 1500;
        if (mqMotion.matches) setLocalStorage(null, 'allow-motion');
      }
      if (evt.currentTarget.id === 'disableOpen' ) enableOpened();
      if (evt.currentTarget.id === 'numericalOrder') reorderBtns(false);
      removePref(btn.dataset.pref);
    }
    disableEnableResets();
    setBadge();
  })
})

adventReset.addEventListener('click', () => {
  if (adventReset.getAttribute('aria-disabled') === 'true') {
    adventAnnouncement.textContent = 'No doors are open';
  } else {
    if (window.confirm("Are you sure you want to reset the Advent Calendar")) {
      localStorage.removeItem("openedDoors");
      resetAdvent();
    }
  }
})

prefsReset.addEventListener('click', () => {
  if (prefsReset.getAttribute('aria-disabled') === 'true') {
    prefsAnnouncement.textContent = 'No preferences are set';
  } else {
    if (window.confirm("Are you sure you want to reset your accessibility preferences")) {
      localStorage.removeItem("pref");
      [...document.documentElement.attributes].forEach((attr) => {
        if (attr.name.startsWith('data-')) {
          document.documentElement.removeAttribute(attr.name);
        }
      });
      const toggles = document.querySelectorAll('[data-pref]');
      toggles.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
      reorderBtns(false);
      enableOpened();
      modalDelay = 1500;
      applyMotionPref(mqMotion.matches);
      disableEnableResets();
      setBadge();
    }
  }
});

document.addEventListener('focusin', (evt) => {
  if (!prefsReset.contains(evt.target) && prefsAnnouncement.textContent !== '') {
    prefsAnnouncement.textContent = '';
  }
});

document.addEventListener('focusin', (evt) => {
  if (!adventReset.contains(evt.target) && adventAnnouncement.textContent !== '') {
    adventAnnouncement.textContent = '';
  }
});

mqMotion.addEventListener('change', (evt) => {
  removePref('allow-motion');
  const storedPrefs = JSON.parse(localStorage.getItem('pref')) || [];
  applyMotionPref(evt.matches || storedPrefs.includes('motion'));
  disableEnableResets();
  setBadge();
})

const tableResizeObserver = new ResizeObserver(() => {
  detectWhenTableIsScrollable();
});

if (tableContainer && table) {
  tableResizeObserver.observe(tableContainer);
  tableResizeObserver.observe(table);
}

const disableEnableResets = () => {
  if (togglesWrapper.querySelectorAll('[aria-pressed="true"]').length > 0) {
    prefsReset.removeAttribute('aria-disabled');
  } else {
    prefsReset.setAttribute('aria-disabled', 'true');
  }

  if (document.querySelectorAll('.advent__grid-item.opened').length > 0) {
    adventReset.removeAttribute('aria-disabled');
  } else {
    adventReset.setAttribute('aria-disabled', 'true');
  }
}

// ---- Init ----

const initialise = () => {
  updateDate();
  checkLocalStorage();
  checkPrefs();

  actionBtns.forEach(btn => {
    const btnDay = parseInt(btn.id.split('-')[1]);
    if (btnDay <= unlockedDays) {
      unlockDoors(btn);
    } 
    
    if (btnDay === currentDay && btnDay <= unlockedDays && (DEV_DAY !== null || (currentYear === 2026 && currentMonth === 11))) {
      btn.setAttribute('aria-current', 'date');
    }
  })
  setBadge();
  disableEnableResets();
  addSkipURL();
}


detectWhenTableIsScrollable();
initialise();