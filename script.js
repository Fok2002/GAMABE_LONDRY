const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('mobile-open', !isOpen);
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('mobile-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = event.currentTarget.querySelector('.form-message');
  message.textContent = 'Thanks! We will call you shortly.';
  event.currentTarget.reset();
});