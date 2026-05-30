/* =============================
   DEVFOLIO — main.js
   Features:
   - Custom cursor tracking
   - Sticky nav on scroll
   - Mobile hamburger menu
   - Scroll reveal (IntersectionObserver)
   - Count-up animation
   - Skill bar animation
   - Project filter (on index page)
   - Contact form validation
   - Dynamic footer year
   ============================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Year ----- */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ----- Custom Cursor ----- */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (cursor && follower) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    });
  }

  /* ----- Sticky Nav ----- */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* ----- Mobile Menu ----- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ----- Scroll Reveal ----- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => revealObs.observe(el));
  }

  /* ----- Count-up Animation ----- */
  const counters = document.querySelectorAll('.count-up');
  if (counters.length) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          countUp(e.target);
          countObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObs.observe(el));
  }

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1600;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, stepTime);
  }

  /* ----- Skill Bars ----- */
  const bars = document.querySelectorAll('.sbar__fill');
  if (bars.length) {
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.getAttribute('data-w') + '%';
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => barObs.observe(b));
  }

  /* ----- Contact Form ----- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const msg = document.getElementById('msg');
      let ok = true;

      clearErr(name, 'nameErr');
      clearErr(email, 'emailErr');
      clearErr(msg, 'msgErr');

      if (!name.value.trim()) { showErr(name, 'nameErr', 'Name is required.'); ok = false; }
      if (!email.value.trim()) { showErr(email, 'emailErr', 'Email is required.'); ok = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showErr(email, 'emailErr', 'Enter a valid email.'); ok = false; }
      if (!msg.value.trim() || msg.value.trim().length < 10) { showErr(msg, 'msgErr', 'Message must be at least 10 characters.'); ok = false; }

      if (ok) {
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Sending…'; btn.disabled = true;
        setTimeout(() => {
          form.reset();
          document.getElementById('formOk').style.display = 'block';
          btn.textContent = 'Send message'; btn.disabled = false;
          setTimeout(() => document.getElementById('formOk').style.display = 'none', 5000);
        }, 1200);
      }
    });
  }

  function showErr(el, errId, msg) {
    el.classList.add('err');
    document.getElementById(errId).textContent = msg;
  }
  function clearErr(el, errId) {
    el.classList.remove('err');
    document.getElementById(errId).textContent = '';
  }

});
