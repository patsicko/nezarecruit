/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
import axios from 'axios';
import {
  getFontFamilies,
  getFontSizes,
  getOauth,
  getUserInfo,
} from '../../../../../../../helpers/resources/list-of-needed-resouces';
import { validateEmail } from '../../../../../../../helpers/functions/validations';
/** Date and times */
export const getCurrentYear = () => new Date().getFullYear();
export const getCurrentMonth = () => { };

export const getDateFromDateTime = (datetime) => datetime.split('T')[0];
export const getTimeFromDateTime = (datetime) => (datetime.split('T')[1]).split('.')[0];

/** handlers */
export const handleAsideNavItemClicked = (event, necessaryFields) => {
  const currClickedTabId = event.target.id;
  const currClickedDiv = document.getElementById(currClickedTabId);
  const {
    allResultDiv,
    unRepliedApplicationsDiv,
    repliedApplicationsDiv,
    allApplicationsTab,
    unRepliedApplicationsTab,
    repliedApplicationsTab,
  } = necessaryFields;

  if (currClickedTabId === 'allApplicationsTab') {
    /** SHOWING ACTIVE TAB AND DESIRED DIV */
    allResultDiv.classList.remove('hidden-div');
    currClickedDiv.classList.add('active-tab');
    currClickedDiv.classList.add('color-dark-purple');

    /** HIDDING UNDESIRED DIVS */
    unRepliedApplicationsDiv.classList.add('hidden-div');
    repliedApplicationsDiv.classList.add('hidden-div');

    /** DEACTIVATING UNACTIVE TABS */
    unRepliedApplicationsTab.classList.remove('active-tab');
    unRepliedApplicationsTab.classList.remove('color-dark-purple');
    repliedApplicationsTab.classList.remove('active-tab');
    repliedApplicationsTab.classList.remove('color-dark-purple');
  } else if (currClickedTabId === 'unRepliedApplicationsTab') {
    /** SHOWING ACTIVE TAB AND DESIRED DIV */
    unRepliedApplicationsDiv.classList.remove('hidden-div');
    currClickedDiv.classList.add('active-tab');
    currClickedDiv.classList.add('color-dark-purple');

    /** HIDDING UN DESIRED DIV */
    allResultDiv.classList.add('hidden-div');
    repliedApplicationsDiv.classList.add('hidden-div');

    /** DEACTIVATING UNACTIVE TABS */
    allApplicationsTab.classList.remove('active-tab');
    allApplicationsTab.classList.remove('color-dark-purple');
    repliedApplicationsTab.classList.remove('active-tab');
    repliedApplicationsTab.classList.remove('color-dark-purple');
  } else if (currClickedTabId === 'repliedApplicationsTab') {
    /** SHOWING ACTIVE TAB AND DESIRED DIV */
    repliedApplicationsDiv.classList.remove('hidden-div');
    currClickedDiv.classList.add('active-tab');
    currClickedDiv.classList.add('color-dark-purple');

    /** HIDDING UNDESIRED DIVS */
    allResultDiv.classList.add('hidden-div');
    unRepliedApplicationsDiv.classList.add('hidden-div');

    /** DEACTIVATING UNACTIVE TABS */
    allApplicationsTab.classList.remove('active-tab');
    unRepliedApplicationsTab.classList.remove('active-tab');
    allApplicationsTab.classList.remove('color-dark-purple');
    unRepliedApplicationsTab.classList.remove('color-dark-purple');
  }
};
export const handleSingleApplicantClicled = (event, application, necessaryFields) => {
  const {
    allResultDiv,
    unRepliedApplicationsDiv,
    repliedApplicationsDiv,
    applicantDetails,
    backToListBtn,
    emailingDiv,
    sendEmailResultDiv,
  } = necessaryFields;
  if (event.target.tagName !== 'BUTTON') {
    /**
     * ********PREPARING WORKING EVIRONMENT***********
     *
     *
     *
     *  1.hiding some divs
     *
     *
     * */
    allResultDiv.classList.add('hidden-div');
    unRepliedApplicationsDiv.classList.add('hidden-div');
    repliedApplicationsDiv.classList.add('hidden-div');
    applicantDetails.classList.remove('hidden-div');
    backToListBtn.classList.remove('hidden-div');
    emailingDiv.classList.add('hidden-div');
    sendEmailResultDiv.classList.add('hidden-div');


    axios.post('/applications/update-read-from-application-table',
      { application_id: application.application_id });
    applicantDetails.innerHTML = (`
  <div class="color-grey-transparent">
    <div>
      <h1 class="text-center">
        <span fname-span>${application.fname}</span>
        <span>${application.middle_name}</span>
        <span>${application.lname}</span>
        <span>${getCurrentYear() - application.year_of_birth} years old</span>
      </h1>
    </div>
    <div class="p-2 white-bordered-element-1">
      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>Gender : </span>
        <span class="float-right">${application.gender}</span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>Level of education : </span>
        <span class="float-right">${application.education_level}</span>
      </div>

      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>Option of study : </span>
        <span class="float-right">${application.option_of_study}</span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>Coding experience : </span>
        <span class="float-right">${application.coding_experience}</span>
      </div>
      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>Currently employed? : </span>
        <span class="float-right">${application.currently_employed}</span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>E-mail : </span>
        <span email-span class="float-right">${application.email}</span>
      </div>
      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>Employed before? : </span>
        <span class="float-right">${application.employed_before}</span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>What was your job position? : </span>
        <span class="float-right">${application.job_position
        ? application.job_position : 'Never had a job'}</span>
      </div>
      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>LinkedIn profile : </span>
        <span class="float-right">
        <a href=${application.linkedin_profile} target="_blank" rel="noreferrer noopener">
        ${application.fname} on LinkedIn</a></span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>Nationality : </span>
        <span class="float-right">${application.nationality}</span>
      </div>
      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>Applied on : </span>
        <span class="float-right">${getDateFromDateTime(application.applied_at)} 
        at ${getTimeFromDateTime(application.applied_at)}</span>
      </div>
    </div>
  </div>
  `);
  }
};

export const handleBackToListClicked = (necessaryFields) => {
  const {
    allResultDiv,
    applicantDetails,
    backToListBtn,
    emailingDiv,
    sendEmailResultDiv,
  } = necessaryFields;
  allResultDiv.classList.remove('hidden-div');
  applicantDetails.classList.add('hidden-div');
  backToListBtn.classList.add('hidden-div');
  emailingDiv.classList.add('hidden-div');
  sendEmailResultDiv.classList.add('hidden-div');
};

export const handleCloseSingleResultClicked = (event) => {
  const allDivs = document.querySelectorAll('div');
  const currentId = event.target.id;
  allDivs.forEach((currDiv) => {
    if (currDiv.id === currentId) {
      currDiv.classList.add('hidden-div');
    }
  });
};

export const handleEmailBtnClicked = (necessaryFields) => {
  const {
    emailingDiv,
    recipientEmail,
    emailSubject,
    emailMsgIframe,
    sendEmailResultDiv,
    sendMsgBtn,
    spanSpinnerGrow,
    spanSpinnerBorder,
    spanSendMsg,
    sendEmailErrorDiv,
  } = necessaryFields;
  /** UNHIDDING EMAILING DIV */
  emailingDiv.classList.remove('hidden-div');

  /** PREPARING WORKING ENVIRONMENT */
  const iframeContent = emailMsgIframe.contentDocument || emailMsgIframe.contentWindow.document;
  iframeContent.body.innerHTML = '';
  emailSubject.value = '';
  sendMsgBtn.classList.remove('btn-info');
  sendMsgBtn.classList.remove('rounded-corners');
  sendMsgBtn.classList.add('btn-success');
  spanSendMsg.innerHTML = 'Click here to Send Message';
  sendEmailResultDiv.classList.add('hidden-div');
  sendEmailErrorDiv.classList.add('hidden-div');

  spanSpinnerBorder.forEach((currSpan) => {
    currSpan.classList.remove('spinner-border');
    currSpan.classList.remove('spinner-border-sm');
    currSpan.classList.remove('text-warning');
    currSpan.classList.remove('mr-2');
  });

  spanSpinnerGrow.forEach((currSpan) => {
    currSpan.classList.remove('spinner-grow');
    currSpan.classList.remove('spinner-grow-sm');
    currSpan.classList.remove('text-warning');
    currSpan.classList.remove('mr-2');
  });

  window.scrollBy(0, 900);
  recipientEmail.value = document.querySelector('span[email-span]').innerText;
};

/** HANDLE EMAIL EDITING */
export const handleTypingEmailInIframe = () => {
  // eslint-disable-next-line no-undef
  const editor = emailMsgIframe.document;
  editor.designMode = 'on';

  /** bold */
  boldBtn.addEventListener('click', () => {
    editor.execCommand('bold', false, null);
  }, false);

  /** italic */
  italicBtn.addEventListener('click', () => {
    editor.execCommand('Italic', false, null);
  }, false);

  /** underline */
  underlineBtn.addEventListener('click', () => {
    editor.execCommand('Underline', false, null);
  }, false);

  /** left justify */
  justifyLeftBtn.addEventListener('click', () => {
    editor.execCommand('justifyLeft', false, null);
  }, false);

  /** Center justify */
  justifyCenterBtn.addEventListener('click', () => {
    editor.execCommand('justifyCenter', false, null);
  }, false);

  /** Right justify */
  justifyRightBtn.addEventListener('click', () => {
    editor.execCommand('justifyRight', false, null);
  }, false);

  /** Full justify */
  justifyFullBtn.addEventListener('click', () => {
    editor.execCommand('justifyFull', false, null);
  }, false);

  /** superscript */
  supBtn.addEventListener('click', () => {
    editor.execCommand('Superscript', false, null);
  }, false);

  /** subscript */
  subBtn.addEventListener('click', () => {
    editor.execCommand('Subscript', false, null);
  }, false);

  /** strikethrough */
  strikeBtn.addEventListener('click', () => {
    editor.execCommand('Strikethrough', false, null);
  }, false);

  /** orderedlist */
  orderedListBtn.addEventListener('click', () => {
    editor.execCommand('InsertOrderedList', false, `newOL${Math.round(Math.random() * 100)}`);
  }, false);

  /** unorderedlist */
  unorderedListBtn.addEventListener('click', () => {
    editor.execCommand('InsertUnOrderedList', false, `newOL${Math.round(Math.random() * 100)}`);
  }, false);

  /** fontcolor */
  fontcolorBtn.addEventListener('change', (event) => {
    editor.execCommand('ForeColor', false, event.target.value);
  }, false);

  /** backgroundcolor */
  highlightBtn.addEventListener('change', (event) => {
    editor.execCommand('BackColor', false, event.target.value);
  }, false);

  /** fontfamily */
  fontChanger.addEventListener('change', (event) => {
    editor.execCommand('fontName', false, event.target.value);
  }, false);

  /** fontSizes */
  fontSize.addEventListener('change', (event) => {
    editor.execCommand('fontSize', false, parseInt(event.target.value));
  }, false);

  /** link */
  linkBtn.addEventListener('click', () => {
    const url = prompt('Enter your url please : ', 'http://');
    editor.execCommand('CreateLink', false, url);
  }, false);

  /** unlink */
  unlinkBtn.addEventListener('click', () => {
    editor.execCommand('UnLink', false, null);
  }, false);

  /** undo */
  undoBtn.addEventListener('click', () => {
    editor.execCommand('undo', false, null);
  }, false);

  /** redo */
  redoBtn.addEventListener('click', () => {
    editor.execCommand('redo', false, null);
  }, false);
  /** backspace */
  backspaceBtn.addEventListener('click', () => {
    editor.execCommand('delete', false, null);
  }, false);

  /** copy */
  copyBtn.addEventListener('click', () => {
    editor.execCommand('copy', false, null);
  }, false);

  /** cut */
  cutBtn.addEventListener('click', () => {
    editor.execCommand('cut', false, null);
  }, false);

  /** selectAll */
  selectAllBtn.addEventListener('click', () => {
    editor.execCommand('selectAll', false, null);
  }, false);
};

export const displayFontFamilies = (fontChanger) => {
  const selectOption = fontChanger;
  getFontFamilies().forEach((currFont) => {
    selectOption.add(new Option(currFont, currFont));
  });
  /** styling them */
  const fonts = document.querySelectorAll('select#fontChanger > option');
  fonts.forEach((currOption) => {
    // eslint-disable-next-line no-param-reassign
    currOption.style.fontFamily = currOption.value;
  });
};

export const displayFontSizes = (fontSize) => {
  const fontSizeField = fontSize;
  getFontSizes().forEach((currFontSize) => {
    fontSizeField.add(new Option(currFontSize, currFontSize));
  });
};

export const handleSendEmailMsgBtnClicked = (necessaryFields) => {
  const {
    recipientEmail,
    emailSubject,
    emailMsgIframe,
    emailingDiv,
    sendEmailResultDiv,
    sendMsgBtn,
    spanSpinnerBorder,
    spanSpinnerGrow,
    spanSendMsg,
    sendEmailResultContainer,
    sendEmailErrorDiv,
  } = necessaryFields;


  const emailMsgHtml = emailMsgIframe.contentDocument || emailMsgIframe.contentWindow.document;
  const emailAddr = recipientEmail.value;
  const emailSubjec = emailSubject.value;
  const myEmailMsg = emailMsgHtml.body.innerHTML;
  const emailMsg = `<div>${myEmailMsg}</div>`;
  const senderEmailAddress = getUserInfo().email;

  if (!validateEmail(emailAddr)) {
    sendEmailErrorDiv.innerHTML = 'No email address found, please refresh the browser and try';
  } else if (emailSubjec.length === 0) {
    sendEmailErrorDiv.innerHTML = 'It is impossible to send an email with no subject!';
  } else if (myEmailMsg.length === 0) {
    sendEmailErrorDiv.innerHTML = 'Write something please, you cannot send an empty email message!';
  } else {
    /** ALL NEEDED VALIDATIONS ARE NOW DONE */

    const isSendConfirmed = confirm(`
    Are you sure, you want to send the email to ${emailAddr}? 
    Check carefully if you have typed whatever you wanted and click yes.`);
    if (isSendConfirmed) {
      /** transforming btn send when is clicked */
      sendMsgBtn.classList.remove('btn-success');
      sendMsgBtn.classList.add('btn-info');
      sendMsgBtn.classList.add('rounded-corners');
      sendMsgBtn.classList.add('text-17');

      spanSpinnerBorder.forEach((currSpan) => {
        currSpan.classList.add('spinner-border');
        currSpan.classList.add('spinner-border-sm');
        currSpan.classList.add('text-warning');
        currSpan.classList.add('mr-2');
      });

      spanSpinnerGrow.forEach((currSpan) => {
        currSpan.classList.add('spinner-grow');
        currSpan.classList.add('spinner-grow-sm');
        currSpan.classList.add('text-warning');
        currSpan.classList.add('mr-2');
      });

      spanSendMsg.innerHTML = 'Sending your email';


      const msgToSend = {
        emailAddr,
        emailSubject: emailSubjec,
        senderEmailAddress,
        emailMsg,
      };

      sendEmailErrorDiv.innerHTML = '';
      axios.post('/applications/send-e-mail', msgToSend,
        { headers: getOauth() }).then((res) => {
        emailingDiv.classList.add('hidden-div');
        sendEmailResultDiv.classList.remove('hidden-div');
        sendEmailResultContainer.innerHTML = res.data.message;
        axios.post('/applications/update-replied-from-application-table',
          { email: emailAddr, status: true });
      }).catch((err) => {
        emailingDiv.classList.add('hidden-div');
        sendEmailResultDiv.classList.remove('hidden-div');
        sendEmailResultContainer.innerHTML = err.response.data.message;
      });
    }
  }
};