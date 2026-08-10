const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const form = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation?.addEventListener('click', event => {
  if (event.target.matches('a')) {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

form?.addEventListener('submit', event => {
  event.preventDefault();
  formNote.textContent = 'Terima kasih. Ini masih prototipe—hubungkan form ke inbox sebelum situs dipublikasikan.';
  formNote.classList.add('success');
});

document.querySelector('#year').textContent = new Date().getFullYear();
