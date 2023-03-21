const scRows = document.querySelectorAll('.sc-table__requirement');
const totalSCFails = document.querySelector('.sc-table__total')
const modalTrigger = document.querySelector('.control__btn--generate');
const dataModal = document.querySelector('.modal');
const counterBtn = document.querySelectorAll('.counter-table__btn');
const critTotal = document.querySelector('#critTotal');
const highTotal = document.querySelector('#highTotal');
const medTotal = document.querySelector('#medTotal');
const lowTotal = document.querySelector('#lowTotal');
const weakTotal = document.querySelector('#weakTotal');
const advTotal = document.querySelector('#advTotal');
const wcagTotal =  document.querySelector('#wcagTotal');

counterBtn.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    const closestOutput = btn.closest('.counter-table__group').querySelector('.counter-table__result');

    if (evt.currentTarget.classList.contains('counter-table__btn--add')) {  
      closestOutput.value++;
    } else if (evt.currentTarget.classList.contains('counter-table__btn--minus') && closestOutput.value > 0) {
      closestOutput.value--;
    }
    wcagTotal.innerText = parseInt(critTotal.value) + parseInt(highTotal.value) + parseInt(medTotal.value) + parseInt(lowTotal.value);
    closestOutput.value > 0 ? closestOutput.setAttribute('data-pass', false) : closestOutput.setAttribute('data-pass', true);
    wcagTotal.innerText != 0 ? wcagTotal.setAttribute('data-pass', false) : wcagTotal.setAttribute('data-pass', true);
  })
})

scRows.forEach(row => {
  row.querySelectorAll('.sc-table__radio').forEach(radio => {
    radio.addEventListener('change', (evt) => {
      radio.closest('.sc-table__group').setAttribute('aria-invalid', false);

      if (evt.target.value == 'partially-supports' || evt.target.value == 'does-not-support') {
        row.querySelector('.sc-table__result').setAttribute('data-pass', false);
        row.querySelector('.sc-table__comment').setAttribute('required', '');
        row.setAttribute('data-fail', '');
        row.querySelector('.sc-table__result').innerText = 'Fail';

        if (row.querySelector('.sc-table__comment').value < 1) {
          row.setAttribute('data-invalid', '');
          row.querySelector('.sc-table__comment').setAttribute('aria-invalid', true);
          showErrorMsgForComments(row);
        } else {
          rowIsValid(evt.target);  
        }
        evt.target.value == 'partially-supports' ? row.setAttribute('data-support', 'Partially Supports') : row.setAttribute('data-support', 'Does Not Support');
      } else {
        evt.target.value == 'supports' ? row.setAttribute('data-support', 'Supports') : row.setAttribute('data-support', 'Not Applicable');
        evt.target.value == 'supports' ? row.querySelector('.sc-table__result').innerText = 'Pass' : row.querySelector('.sc-table__result').innerText = 'N/A';
        evt.target.value == 'supports' ? row.querySelector('.sc-table__result').setAttribute('data-pass', 'true') : row.querySelector('.sc-table__result').setAttribute('data-pass', 'NA');
        evt.target.closest('td').querySelector('.sc-table__err-msg').setAttribute('aria-hidden', true);
        row.querySelector('.sc-table__comment').removeAttribute('required');
        row.removeAttribute('data-fail');
        hideErrorMsgForComments(row);
        rowIsValid(evt.target);        
      }
      getFailedSCTotal(document.querySelectorAll('.sc-table__result[data-pass=false').length);
      evt.target.closest('.sc-table__group').removeAttribute('aria-describedby');
    })
  })
})

document.querySelector('.sc-table').addEventListener('input', (evt) => {
  if (evt.target.classList.contains('sc-table__comment')) {
    if (evt.target.value.length > 0) {
      rowIsValid(evt.target);
      hideErrorMsgForComments(evt.target.closest('tr'))
    } else {
      evt.target.setAttribute('aria-invalid', true);
      showErrorMsgForComments( evt.target.closest('tr'));
      evt.target.closest('tr').setAttribute('data-invalid', '');
    }
  }
})

const rowIsValid = (targetEl) => {
  targetEl.closest('tr').removeAttribute('data-invalid');
  targetEl.closest('tr').querySelector('.sc-table__comment').setAttribute('aria-invalid', false);
}

const getFailedSCTotal = (totalSCsFailed) => {
  totalSCFails.innerText = totalSCsFailed;
  totalSCsFailed > 0 ? totalSCFails.setAttribute('data-pass', false) : totalSCFails.setAttribute('data-pass', true);
}

modalTrigger.addEventListener('click', () => {
  const errCount = document.querySelectorAll('tr[data-invalid]');
  errCount.forEach(row => {      
    if (row.querySelector('.sc-table__group').getAttribute('aria-invalid') == 'true') {
      showErrorMsgForRadios(row);
    }
  })

  if (!!errCount.length) {
    document.querySelector('.page__announcement').textContent = `${errCount.length} row${errCount.length > 1 ? 's have' : ' has'} not been completed`;
    document.querySelector('tr[data-invalid] .sc-table__link').focus();

    setTimeout(() => {
      document.querySelector('.page__announcement').textContent = ``;
    }, 7500);
  } else {
    openModal();
  }
})

const showErrorMsgForRadios = (row) => {
  const errMsg = row.querySelector('[data-radio-cell] .sc-table__err-msg');
  row.querySelector('.sc-table__err-msg').setAttribute('aria-hidden', false);
  row.querySelector('.sc-table__group').setAttribute('aria-describedby', errMsg.id)
}

const showErrorMsgForComments = (row) => {
  const errMsg = row.querySelector('.sc-table__comment-wrapper .sc-table__err-msg');
  row.querySelector('.sc-table__comment-wrapper').setAttribute('data-valid', 'false');
  row.querySelector('.sc-table__comment-wrapper .sc-table__err-msg').setAttribute('aria-hidden', false);
  row.querySelector('.sc-table__comment').setAttribute('aria-describedby', errMsg.id)
}

const hideErrorMsgForComments = (row) => {
  row.querySelector('.sc-table__comment-wrapper').setAttribute('data-valid', 'true');
  row.querySelector('.sc-table__comment-wrapper .sc-table__err-msg').setAttribute('aria-hidden', true);
  row.querySelector('.sc-table__group').removeAttribute('aria-describedby');
}

const openModal = () => {
  dataModal.setAttribute('data-displayed', true);
  generateSummaryParagraph();
  generateStatementAndVPAT();

  setTimeout(() => {
    document.body.setAttribute('modal-open', '');
  }, 50);

  setTimeout(() => {
    dataModal.focus();
  }, 250);
}

const generateSummaryParagraph = () => {
  let totalSCsFailed = document.querySelectorAll('[data-fail]').length;
  let totalWCAGIssues = parseInt(document.querySelector('#wcagTotal').innerText);

  if (totalWCAGIssues > 0 ) {
    var issueListItems = `<ul>`
    document.querySelectorAll('[data-wcag').forEach(priorityCount => {
      if (priorityCount.value > 0) {
        issueListItems += `<li style="font: 12pt Arial, sans-serif;">${parseInt(priorityCount.value)} ${priorityCount.getAttribute('data-wcag')} priority issue${parseInt(priorityCount.value) > 1 ? 's' : ''}</li>`
      }
    })
    issueListItems += `</ul>`
  }

  const totalIssuesText = `<p style="font: 12pt Arial, sans-serif;">
  The ${totalWCAGIssues} identified issue${totalWCAGIssues != 1 ? 's' : ''}, ${parseInt(weakTotal.value)} weakness${parseInt(weakTotal.value) != 1 ? 'es' : ''} and ${parseInt(advTotal.value)} advisor${parseInt(advTotal.value) != 1 ? 'ies' : 'y'} ${totalWCAGIssues > 0 ? `reflects a failure against ${totalSCsFailed} WCAG 2.1 AA success criteria as detailed above. The issue priority breakdown is, as follows:` : ''}</p>`
  document.querySelector('#sectionTotals').insertAdjacentHTML('afterbegin', totalIssuesText);
  totalWCAGIssues > 0 ? document.querySelector('#sectionTotals').insertAdjacentHTML('beforeend', issueListItems) : ''; 
}

const generateStatementAndVPAT = () => {
  let statementList = `<ul>`;
  let vpatTableA = `<table role="presentation">`
  let vpatTableAA = `<table role="presentation">`

  scRows.forEach((row, idx, array) => {
    let issueText = row.querySelector('.sc-table__comment').value;
    const vpatSupport = row.getAttribute('data-support');
    if (row.hasAttribute('data-fail')) {
      statementList += '<li style="font: 12pt Arial, sans-serif;">' + issueText.trimEnd() + ' This fails WCAG ' + row.querySelector('.sc-table__link').textContent.trimEnd() + '.</li>';
      console.log(statementList);
    }

    if (row.querySelector('.sc-table__radio[value="supports"').checked == true && row.querySelector('.sc-table__comment').value == '') {
      issueText = 'No issues detected';
    }

    if (row.querySelector('.sc-table__radio[value="not-applicable"').checked == true && row.querySelector('.sc-table__comment').value == '') {
      issueText = 'No content in scope applicable';
    }

    if (row.getAttribute('data-level') == 'a') {
      vpatTableA += `<tr style="font: 12pt Arial, sans-serif;"><td>${vpatSupport}</td><td>${issueText}</td></tr>${idx == array.length - 1 ? '</table>' : ''}`;
    } else {
      vpatTableAA += `<tr style="font: 12pt Arial, sans-serif;"><td>${vpatSupport}</td><td>${issueText}</td></tr>${idx == array.length - 1 ? '</table>' : ''}`;
    }
  })

  statementList += `</ul>`;
  dataModal.querySelector('#sectionStatement').insertAdjacentHTML('afterbegin', statementList);
  dataModal.querySelector('#sectionVPATLevelA').insertAdjacentHTML('beforeEnd', vpatTableA);
  dataModal.querySelector('#sectionVPATLevelAA').insertAdjacentHTML('afterbegin', vpatTableAA);

  dataModal.querySelectorAll('[class^="modal__section-wrapper"]').forEach(sectionWrapper => {
    const copyBtn = `<div><button class="modal__copy-btn">Copy ${sectionWrapper.previousElementSibling.textContent}</button></div>`;
    sectionWrapper.insertAdjacentHTML('afterbegin', copyBtn);
    
    document.body.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('modal__copy-btn'))
      handleCopyEvent(evt)
    })
  })
}

// Firefox not working
async function handleCopyEvent(evt) {
  document.querySelector('.modal__announcement').textContent = '';
  const btn = evt.srcElement;
  const section = btn.closest('[class^="modal__section-wrapper"]').querySelector('.modal__text-section').innerHTML;
  const blobInput = new Blob([section], {type: 'text/html'});
  const clipboardItemInput = new ClipboardItem({'text/html' : blobInput});
  navigator.clipboard.write([clipboardItemInput]);

  document.querySelector('.modal__announcement').textContent = 'Copied to clipboard';
  setTimeout(() => {
    document.querySelector('.modal__announcement').textContent = '';
  }, 1000)
}

document.querySelectorAll('.modal__close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal();
  })

  btn.addEventListener('keydown', (evt) => {
    if (evt.target.classList.contains('modal__close-btn--top')) {
      if (evt.shiftKey) {      
        if (evt.key == 9 || evt.which == 9) {
          evt.preventDefault();
          document.querySelector('.modal__close-btn--bottom').focus();
        }
      }
    } else {
      if (evt.key == 9 || evt.which == 9 && !evt.shiftKey) {
        evt.preventDefault();
        document.querySelector('.modal__close-btn--top').focus();
      }
    }
  })
})

document.addEventListener('click', (evt) => {
  if (document.body.hasAttribute('modal-open') && !evt.target.closest('.modal'))  {
    closeModal();
  }
})

document.addEventListener('keydown', (evt) => {
  if (document.body.hasAttribute('modal-open') && evt.key == 'Escape') {
    closeModal();
  }
})

const closeModal = () => {
  dataModal.setAttribute('data-displayed', 'false');
  document.body.removeAttribute('modal-open');
  setTimeout(() => {
    modalTrigger.focus();

    dataModal.querySelectorAll('.modal__text-section').forEach(el => {
      el.innerHTML = '';
    })
    document.querySelectorAll('[class^="modal__section-wrapper"] > div').forEach(btnContainer => {btnContainer.innerHTML = ''});
  }, 275);
}