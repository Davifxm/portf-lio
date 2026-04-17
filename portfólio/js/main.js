/* ============================================
   DAVI FÉLIX — PORTFÓLIO
   main.js — v2
   ============================================ */

/* ============================================
   DADOS DOS CERTIFICADOS
   Nomes dos arquivos mapeados conforme pasta assets/
   ============================================ */
const certs = [
  {
    name:   'Cybersecurity Threat Management',
    issuer: 'Cisco · Senac-PE',
    badge:  'assets/badges/badge-cisco-threat.png.png',
    img:    'assets/img/cert-cisco-threat.jpg.png',
  },
  {
    name:   'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    badge:  'assets/badges/badge-cisco-intro.png.png',
    img:    'assets/img/intro.jpg.png',
  },
  {
    name:   'Computer Hardware Fundamentals',
    issuer: 'Senac-PE',
    badge:  'assets/badges/computer-hardware-basics.png',
    img:    'assets/img/cert-hardware.jpg.png',
  },
];

/* ============================================
   INTRO SCREEN
   Some após 2.7s automaticamente
   ============================================ */
window.addEventListener('load', () => {
  const intro = document.getElementById('intro-screen');
  setTimeout(() => intro.classList.add('hide'), 2700);
});

/* ============================================
   NAVBAR — scroll effect + link ativo
   ============================================ */
const navbar  = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
  updateStrip();
});

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
  document.querySelectorAll('.nav-mobile-menu a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

/* ============================================
   SECTIONS STRIP — item ativo
   ============================================ */
const stripItems = document.querySelectorAll('.strip-item');

function updateStrip() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  stripItems.forEach(item => {
    item.classList.toggle('active', item.dataset.target === current);
  });
}

stripItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = document.getElementById(item.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ============================================
   MENU HAMBÚRGUER (mobile)
   ============================================ */
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  menuBtn.classList.toggle('open', menuOpen);
  mobileMenu.style.display = menuOpen ? 'block' : 'none';
  // Pequeno delay para a transição funcionar
  requestAnimationFrame(() => {
    mobileMenu.classList.toggle('open', menuOpen);
  });
});

// Fecha o menu ao clicar em qualquer link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    menuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    setTimeout(() => { mobileMenu.style.display = 'none'; }, 260);
  });
});

// Fecha ao clicar fora do menu
document.addEventListener('click', (e) => {
  if (menuOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    menuOpen = false;
    menuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    setTimeout(() => { mobileMenu.style.display = 'none'; }, 260);
  }
});

/* ============================================
   SCROLL REVEAL
   Seções entram com fade ao aparecer na tela
   ============================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.section').forEach(sec => revealObserver.observe(sec));

/* ============================================
   MODAL — CERTIFICADOS
   Abre ao clicar em "Ver cert." em cada card
   ============================================ */
const modal         = document.getElementById('certModal');
const modalTitle    = document.getElementById('modalTitle');
const modalCertName   = document.getElementById('modalCertName');
const modalCertIssuer = document.getElementById('modalCertIssuer');
const modalBadge    = document.getElementById('modalBadge');
const modalCertImg  = document.getElementById('modalCertImg');
const modalClose    = document.getElementById('modalClose');

document.querySelectorAll('.cert-card').forEach(card => {
  card.querySelector('.cert-view-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const cert = certs[parseInt(card.dataset.cert)];

    modalTitle.textContent      = 'Certificado';
    modalCertName.textContent   = cert.name;
    modalCertIssuer.textContent = cert.issuer;
    modalBadge.src              = cert.badge;
    modalBadge.alt              = `Insígnia — ${cert.name}`;
    modalCertImg.src            = cert.img;
    modalCertImg.alt            = cert.name;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================
   SMOOTH SCROLL — links internos
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});