/* =====================================================
   MendAI Labs — main.js
   ===================================================== */

/* ── Scroll-progress bar ──────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ── Nav shadow on scroll ─────────────────────────── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Scroll-reveal (Intersection Observer) ─────────── */
function addRevealClasses() {
  const targets = [
    { selector: '.hero-text',         delay: 0 },
    { selector: '.hero-visual',       delay: 0 },
    { selector: '.mission-left',      delay: 0 },
    { selector: '.mission-right',     delay: 1 },
    { selector: '.module-card',       delay: null }, // staggered per-card
    { selector: '.founder-card',      delay: null },
    { selector: '.partner-card',      delay: null },
    { selector: '.backing-item',      delay: null },
    { selector: '.milestone-item',    delay: null },
    { selector: '.market-stat',       delay: null },
    { selector: '.hero-card',         delay: null },
    { selector: '.problem-item',      delay: null },
    { selector: '.section-header',    delay: 0 },
    { selector: '.pilot-banner',      delay: 0 },
  ];

  targets.forEach(({ selector, delay }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      if (delay !== null) {
        el.classList.add(`reveal-delay-${delay}`);
      } else {
        // stagger siblings
        const d = Math.min(i, 4);
        if (d > 0) el.classList.add(`reveal-delay-${d}`);
      }
    });
  });
}
addRevealClasses();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Module card — mouse-tracking glow ─────────────── */
document.querySelectorAll('.module-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
    card.style.setProperty('--mx', x);
    card.style.setProperty('--my', y);
  });
});

/* ── Smooth active nav link on scroll ─────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => sectionObserver.observe(s));

/* ── Animated counter on stat-numbers ─────────────── */
function animateCounter(el) {
  const raw   = el.textContent.trim();
  // extract leading number (handles "$7B", ">100,000", "90%", etc.)
  const match = raw.match(/([\d,.]+)/);
  if (!match) return;

  const numStr  = match[1].replace(/,/g, '');
  const target  = parseFloat(numStr);
  if (isNaN(target) || target === 0) return;

  const prefix  = raw.slice(0, raw.indexOf(match[1]));
  const suffix  = raw.slice(raw.indexOf(match[1]) + match[1].length);
  const isFloat = numStr.includes('.');
  const duration = 1400;
  const start    = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const value    = target * ease;
    const display  = isFloat
      ? value.toFixed(1)
      : Math.round(value).toLocaleString();
    el.textContent = prefix + display + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statEls = document.querySelectorAll('.stat-number, .market-num, .hero-card-stat');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
statEls.forEach(el => counterObserver.observe(el));

/* ── Mobile nav toggle ──────────────────────────────── */
// Inject hamburger button for mobile
const navInner = document.querySelector('.nav-inner');
const burger   = document.createElement('button');
burger.className   = 'nav-burger';
burger.setAttribute('aria-label', 'Toggle menu');
burger.innerHTML   = '<span></span><span></span><span></span>';
navInner.appendChild(burger);

const navLinksList = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  const open = navLinksList.classList.toggle('nav-open');
  burger.classList.toggle('active', open);
});
// Close on link click
navLinksList.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinksList.classList.remove('nav-open');
    burger.classList.remove('active');
  })
);

/* ── Subtle parallax on hero background ─────────────── */
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.3;
    hero.style.backgroundPositionY = `-${y}px`;
  }, { passive: true });
}

/* ── Typed headline effect (hero eyebrow) ───────────── */
const eyebrow = document.querySelector('.hero-eyebrow');
if (eyebrow) {
  const original = eyebrow.textContent;
  eyebrow.textContent = '';
  let i = 0;
  setTimeout(() => {
    const interval = setInterval(() => {
      eyebrow.textContent = original.slice(0, ++i);
      if (i >= original.length) clearInterval(interval);
    }, 38);
  }, 300);
}
