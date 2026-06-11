/* script.js · Sreevadhsun N Portfolio */

// ──────────────── THEME TOGGLE ────────────────
const html       = document.documentElement;
const themeBtn   = document.getElementById('themeToggle');
const themeIcon  = document.getElementById('themeIcon');

const ICONS = { dark: '☀', light: '🌙' };

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.textContent = ICONS[theme];
  localStorage.setItem('sv-theme', theme);
}

// Init from saved preference or OS preference
(function initTheme() {
  const saved = localStorage.getItem('sv-theme');
  if (saved) {
    setTheme(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ──────────────── MOBILE NAV ────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav on link click
navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ──────────────── SCROLLED NAV ────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ──────────────── ACTIVE NAV LINK ────────────────
const sections = document.querySelectorAll('section[id]');
const allLinks  = document.querySelectorAll('.nav__link');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  allLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// ──────────────── TYPING EFFECT ────────────────
const roles  = ['Senior Full Stack Developer', 'MEAN Stack Expert', 'Tech Lead', 'Enterprise App Architect'];
const target = document.getElementById('typedRole');
let  roleIdx  = 0;
let  charIdx  = 0;
let  deleting = false;
let  pausing  = false;

function type() {
  if (!target) return;

  const word = roles[roleIdx];

  if (!deleting) {
    charIdx++;
    target.textContent = word.slice(0, charIdx);
    if (charIdx === word.length) {
      pausing = true;
      setTimeout(() => { pausing = false; deleting = true; type(); }, 2000);
      return;
    }
  } else {
    charIdx--;
    target.textContent = word.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(type, 400);
      return;
    }
  }

  const speed = deleting ? 40 : 70;
  setTimeout(type, speed);
}
setTimeout(type, 800);

// ──────────────── SCROLL REVEAL ────────────────
function addRevealClasses() {
  const candidates = document.querySelectorAll(
    '.timeline__item, .project-card, .skill-tile, .domain-card, ' +
    '.skills__category, .about__info-item, .contact__item'
  );
  candidates.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });
}

function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

addRevealClasses();
window.addEventListener('scroll', revealOnScroll, { passive: true });
// Trigger once on load
window.addEventListener('load', revealOnScroll);
revealOnScroll();

// ──────────────── FORM SUBMIT FEEDBACK ────────────────
function handleFormSubmit(btn) {
  const originalText = btn.textContent;
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#22c55e';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
  }, 3500);
}
