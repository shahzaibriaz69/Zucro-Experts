/* ============================================
   ZUCRO EXPERTS — MAIN JAVASCRIPT
   main.js
============================================ */

/* ── 1. NAVBAR SCROLL EFFECT ──────────────── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.background = window.scrollY > 100
      ? 'rgba(11,27,43,0.98)'
      : 'rgba(11,27,43,0.9)';
  }
});

/* ── 2. HERO DASHBOARD LIVE COUNTERS ─────── */
function animateHero() {
  const roasEl  = document.getElementById('roas');
  const leadsEl = document.getElementById('leads');
  const convEl  = document.getElementById('conv');

  if (!roasEl || !leadsEl || !convEl) return;

  let r = 0, l = 0, c = 0;

  const roasTimer = setInterval(() => {
    r += 0.2;
    if (r >= 8.5) { r = 8.5; clearInterval(roasTimer); }
    roasEl.textContent = r.toFixed(1) + 'x';
  }, 30);

  const leadsTimer = setInterval(() => {
    l += 80;
    if (l >= 5200) { l = 5200; clearInterval(leadsTimer); }
    leadsEl.textContent = l.toLocaleString();
  }, 20);

  const convTimer = setInterval(() => {
    c += 0.3;
    if (c >= 24) { c = 24; clearInterval(convTimer); }
    convEl.textContent = c.toFixed(1) + '%';
  }, 30);
}

animateHero();

/* ── 3. STATS SECTION COUNTERS (on scroll) ── */
function animateCounter(el, target, type) {
  let current = 0;
  const step  = target / 80;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }

    if (type === 'x')       el.textContent = Math.floor(current) + 'x';
    else if (type === '%')  el.textContent = Math.floor(current) + '%';
    else if (target >= 1000) el.textContent = Math.floor(current).toLocaleString() + '+';
    else                    el.textContent = Math.floor(current) + '+';
  }, 20);
}

const statEls = document.querySelectorAll('[data-target]');

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      const type   = el.dataset.type || '';
      animateCounter(el, target, type);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.15 });   /* was 0.5 — too strict, counters never fired */

statEls.forEach(el => statObserver.observe(el));

/* ── 4. FADE-UP ON SCROLL ────────────────── */
const fadeSelectors = [
  '.service-card',
  '.why-card',
  '.problem-card',
  '.pricing-card',
  '.ai-card',
  '.industry-card',
  '.auto-item'
].join(',');

const fadeEls = document.querySelectorAll(fadeSelectors);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeObserver.observe(el);
});

/* ── 5. WHATSAPP FORM SEND ───────────────── */
function sendToWhatsApp() {
  const nameEl    = document.querySelector('input[name="name"]');
  const serviceEl = document.querySelector('select[name="service"]');
  const msgEl     = document.querySelector('textarea[name="message"]');

  const name    = nameEl    ? nameEl.value.trim()    : 'Interested Customer';
  const service = serviceEl ? serviceEl.value.trim() : 'Not specified';
  const msg     = msgEl     ? msgEl.value.trim()     : '';

  if (!name) { alert('Please enter your name.'); return; }

  const text = `Hi Zucro Experts! My name is ${name}. I am interested in: ${service}.${msg ? ' Message: ' + msg : ''}`;
  window.open('https://wa.me/996997477765?text=' + encodeURIComponent(text), '_blank');
}

/* ── 6. MOBILE MENU TOGGLE ───────────────── */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isOpen ? 'none' : 'flex';
  });
}

/* ── 7. SMOOTH CLOSE MOBILE MENU ON LINK CLICK ── */
const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.style.display = 'none';
  });
});