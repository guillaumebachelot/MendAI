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
  // Directional stagger: left column slides from left, right from right
  document.querySelectorAll('.mission-left').forEach(el => el.classList.add('reveal-left'));
  document.querySelectorAll('.mission-right').forEach(el => el.classList.add('reveal-right'));

  // Scale-in for hero cards and module cards
  document.querySelectorAll('.hero-card').forEach((el, i) => {
    el.classList.add('reveal-scale');
    if (i > 0) el.classList.add(`reveal-delay-${Math.min(i * 2, 6)}`);
  });

  // Staggered slide-up for grids
  const staggerUp = ['.module-card', '.founder-card', '.partner-card',
                     '.backing-item', '.problem-item', '.timeline-node'];
  staggerUp.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      const d = Math.min(i + 1, 6);
      el.classList.add(`reveal-delay-${d}`);
    });
  });

  // Market stats slide up with heavy stagger
  document.querySelectorAll('.market-stat').forEach((el, i) => {
    el.classList.add('reveal-scale');
    el.classList.add(`reveal-delay-${Math.min(i * 2 + 1, 6)}`);
  });

  // Section headers
  document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal'));

  // Pilot banner
  document.querySelectorAll('.pilot-banner').forEach(el => el.classList.add('reveal-scale'));

  // Hero text
  document.querySelectorAll('.hero-text').forEach(el => el.classList.add('reveal-left'));
  document.querySelectorAll('.hero-visual').forEach(el => el.classList.add('reveal-right'));

  // Vision statement — simple fade-up as a whole
  const vision = document.querySelector('.vision-statement');
  if (vision) vision.classList.add('reveal');
}
addRevealClasses();

const allRevealClasses = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale'];
const revealSelector = allRevealClasses.map(c => '.' + c).join(',');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
);
document.querySelectorAll(revealSelector).forEach(el => observer.observe(el));


/* ── Cycle diagram SVG path draw ───────────────────── */
const cycleDiagram = document.querySelector('.cycle-diagram');
if (cycleDiagram) {
  // Measure each path/circle length and set stroke-dasharray
  cycleDiagram.querySelectorAll('path, circle').forEach(el => {
    const len = el.getTotalLength ? el.getTotalLength() : 1000;
    el.style.strokeDasharray = len;
    el.style.setProperty('--dash-len', len);
  });

  const cycleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // Stagger each path draw
          let i = 0;
          cycleDiagram.querySelectorAll('path, circle').forEach(el => {
            setTimeout(() => el.style.strokeDashoffset = '0', i * 120);
            i++;
          });
          // Animate nodes in
          cycleDiagram.querySelectorAll('.cycle-node').forEach((node, idx) => {
            setTimeout(() => {
              node.style.opacity = '1';
              node.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 400 + idx * 150);
          });
          cycleObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  cycleObserver.observe(cycleDiagram);

  // Pre-hide nodes for entrance
  cycleDiagram.querySelectorAll('.cycle-node').forEach(node => {
    node.style.opacity = '0';
    node.style.transform = 'translate(-50%, -50%) scale(0.7)';
    node.style.transition = 'opacity .4s cubic-bezier(.22,1,.36,1), transform .4s cubic-bezier(.22,1,.36,1)';
  });
}

/* ── Section line separator reveal ─────────────────── */
const lineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const line = e.target.querySelector('.section-line');
        if (line) setTimeout(() => line.classList.add('visible'), 300);
        lineObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.section-header').forEach(el => lineObserver.observe(el));

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

/* ── Parallax on sections ────────────────────────────── */
const parallaxSections = [
  { el: document.querySelector('.hero'),    speed: 0.25 },
  { el: document.querySelector('.vision'),  speed: 0.15 },
  { el: document.querySelector('.solution'),speed: 0.10 },
  { el: document.querySelector('.contact'), speed: 0.12 },
].filter(s => s.el);

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  parallaxSections.forEach(({ el, speed }) => {
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const offset = (scrollY - el.offsetTop) * speed;
    const bg = el.querySelector('.parallax-bg');
    if (bg) {
      bg.style.transform = `translateY(${offset}px)`;
    } else {
      el.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    }
  });
}, { passive: true });

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
