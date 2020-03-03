var feedbackBtn = document.querySelector('.feedback-button');

var overlay = document.querySelector('.modal-overlay');
var modalFeedback = document.querySelector('.modal-feedback');
var closeFeedback = modalFeedback.querySelector('.modal-close');

var formFeedback = modalFeedback.querySelector('form');
var nameFeedback = modalFeedback.querySelector('[name="name"]');
var emailFeedback = modalFeedback.querySelector('[name="email"]');
var descriptionFeedback = modalFeedback.querySelector('[name="description"]');

var isStorageSupport = true;
var nameStorage = '';
var emailStorage = '';

try {
  nameStorage = localStorage.getItem('name');
  emailStorage = localStorage.getItem('email');
} catch(err) {
  isStorageSupport = false;
}

feedbackBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalFeedback.classList.remove('modal-out');
  overlay.style.display = 'block';
  modalFeedback.classList.add('modal-show');

  nameFeedback.focus();

  if (nameStorage) {
    nameFeedback.value = nameStorage;
    emailFeedback.focus();
  }

  if (emailStorage) {
    emailFeedback.value = emailStorage;
    descriptionFeedback.focus();
  }
});

closeFeedback.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalFeedback.classList.add('modal-out');
  setTimeout(function() {
    modalFeedback.classList.remove('modal-show');
    modalFeedback.classList.remove("modal-error");
    overlay.style.display = '';
  }, 600);
});

formFeedback.addEventListener('submit', function(evt) {
  if (!nameFeedback.value || !emailFeedback.value || !descriptionFeedback.value) {
    evt.preventDefault();
    modalFeedback.classList.remove("modal-error");
    modalFeedback.offsetWidth = modalFeedback.offsetWidth;
    modalFeedback.classList.add('modal-error');
    console.error("Нужно ввести имя, email и описание!");
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', nameFeedback.value);
      localStorage.setItem('email', emailFeedback.value);
    }
  }
});

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    if (modalFeedback.classList.contains('modal-show')) {
      evt.preventDefault();
      modalFeedback.classList.add('modal-out');
      setTimeout(function() {
        modalFeedback.classList.remove('modal-show');
        modalFeedback.classList.remove("modal-error");
        overlay.style.display = '';
      }, 600);
    }
  }
});
