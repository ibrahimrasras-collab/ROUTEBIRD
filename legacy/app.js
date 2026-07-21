/* app.js — Routebird
   Theme toggle, mobile nav, scroll-aware header, waitlist validation, reveal-on-scroll.
*/

(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  (function initTheme() {
    const root = document.documentElement;
    const toggle = document.querySelector('[data-theme-toggle]');
    let mode = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.setAttribute('data-theme', mode);
    renderToggle();

    function renderToggle() {
      const label = 'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode';
      toggle &&
        (toggle.innerHTML =
          mode === 'dark'
            ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
            : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>');
      toggle && toggle.setAttribute('aria-label', label);
    }

    toggle &&
      toggle.addEventListener('click', function () {
        mode = mode === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', mode);
        renderToggle();
      });
  })();

  /* ---------- Mobile nav ---------- */
  (function initNav() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const menu = document.querySelector('[data-nav-menu]');
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', function () {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });
  })();

  /* ---------- Scroll-aware header ---------- */
  (function initScrollHeader() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const onScroll = function () {
      if (window.scrollY > 8) nav.classList.add('nav--scrolled');
      else nav.classList.remove('nav--scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ---------- Waitlist form validation ---------- */
  (function initWaitlist() {
    const forms = document.querySelectorAll('.waitlist');
    if (!forms.length) return;

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    // in-memory store (sandbox blocks localStorage)
    const store = { emails: [] };

    forms.forEach(function (form) {
      const field = form.querySelector('[data-field]');
      const input = form.querySelector('input[type="email"]');
      const msg = form.querySelector('[data-msg]');
      const submit = form.querySelector('.waitlist__submit');

      function setMessage(kind, text) {
        msg.textContent = text || '';
        msg.className = 'waitlist__msg' + (kind ? ' waitlist__msg--' + kind : '');
        field.classList.remove('waitlist__field--error', 'waitlist__field--success');
        if (kind === 'error') field.classList.add('waitlist__field--error');
        if (kind === 'success') field.classList.add('waitlist__field--success');
      }

      input.addEventListener('input', function () {
        if (msg.dataset.touched) {
          if (!input.value) setMessage('', '');
          else if (!EMAIL_RE.test(input.value.trim()))
            setMessage('error', 'Please enter a valid email address.');
          else setMessage('', '');
        }
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        msg.dataset.touched = '1';
        const value = input.value.trim();

        if (!value) {
          setMessage('error', 'Please enter your email to join the waitlist.');
          input.focus();
          return;
        }
        if (!EMAIL_RE.test(value)) {
          setMessage('error', 'Please enter a valid email address.');
          input.focus();
          return;
        }
        if (store.emails.indexOf(value.toLowerCase()) !== -1) {
          setMessage('success', "You're on the list — we'll be in touch at launch.");
          return;
        }

        submit.disabled = true;
        // simulate async submit
        setTimeout(function () {
          store.emails.push(value.toLowerCase());
          submit.disabled = false;
          input.value = '';
          setMessage('success', "You're on the waitlist — watch your inbox for launch invites.");
        }, 480);
      });
    });
  })();

  /* ---------- Reveal on scroll ---------- */
  (function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        el.classList.add('in');
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i * 40, 240) + 'ms';
      io.observe(el);
    });
  })();
})();
