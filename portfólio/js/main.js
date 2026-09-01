const certificates = [
  {
    title: 'Gerenciamento de Ameaças Cibernéticas',
    image: 'assets/img/cert-cisco-threat.jpg.png',
  },
  {
    title: 'Introdução à Cibersegurança',
    image: 'assets/img/intro.jpg.png',
  },
  {
    title: 'Fundamentos do Hardware do Computador',
    image: 'assets/img/cert-hardware.jpg.png',
  },
];

const menuButton = document.getElementById('menuButton');
const mobileNav = document.getElementById('mobileNav');

function closeMenu() {
  menuButton.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  mobileNav.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const willOpen = !mobileNav.classList.contains('open');
  menuButton.classList.toggle('open', willOpen);
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
  mobileNav.classList.toggle('open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const sections = [...document.querySelectorAll('main section[id]')];
const desktopLinks = [...document.querySelectorAll('.desktop-nav a')];

const navigationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    desktopLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach((section) => navigationObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const modal = document.getElementById('certModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalClose = modal.querySelector('.modal-close');
const modalBackdrop = modal.querySelector('.modal-backdrop');
let lastFocusedElement = null;

function openCertificate(index) {
  const certificate = certificates[index];
  if (!certificate) return;
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = certificate.title;
  modalImage.src = certificate.image;
  modalImage.alt = `Certificado: ${certificate.title}`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modalClose.focus();
}

function closeCertificate() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalImage.src = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('[data-cert]').forEach((button) => {
  button.addEventListener('click', () => openCertificate(Number(button.dataset.cert)));
});

modalClose.addEventListener('click', closeCertificate);
modalBackdrop.addEventListener('click', closeCertificate);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (modal.classList.contains('open')) closeCertificate();
    if (mobileNav.classList.contains('open')) closeMenu();
  }
});
