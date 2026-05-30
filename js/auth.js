/* =============================
   DEVFOLIO — auth.js
   Features:
   - Login form validation + demo user check
   - Register form with full validation
   - Password strength meter
   - Password show/hide toggle
   - localStorage "user database"
   - Redirect after success
   ============================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     SHARED UTILITIES
     ========================================= */

  function $(id) { return document.getElementById(id); }

  function showErr(inputEl, errId, msg) {
    if (inputEl) inputEl.classList.add('err');
    const el = $(errId);
    if (el) el.textContent = msg;
  }

  function clearErr(inputEl, errId) {
    if (inputEl) inputEl.classList.remove('err');
    const el = $(errId);
    if (el) el.textContent = '';
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  /* Password toggle helper */
  function setupToggle(toggleId, inputId) {
    const btn = $(toggleId);
    const input = $(inputId);
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.textContent = isPassword ? '🙈' : '👁';
    });
  }

  /* localStorage user store */
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem('devfolio_users') || '[]');
    } catch { return []; }
  }

  function saveUsers(users) {
    localStorage.setItem('devfolio_users', JSON.stringify(users));
  }

  /* Seed a demo user if not present */
  const users = getUsers();
  if (!users.find(u => u.email === 'user@demo.com')) {
    users.push({ firstName: 'Demo', lastName: 'User', email: 'user@demo.com', password: 'demo1234' });
    saveUsers(users);
  }

  /* =========================================
     LOGIN PAGE
     ========================================= */
  const loginForm = $('loginForm');
  if (loginForm) {

    setupToggle('togglePwd', 'password');

    /* Click demo credentials to fill them in */
    const demoCode = document.querySelector('.demo-hint code');
    if (demoCode) {
      demoCode.addEventListener('click', () => {
        $('email').value = 'user@demo.com';
        $('password').value = 'demo1234';
      });
    }

    loginForm.addEventListener('submit', e => {
      e.preventDefault();

      const emailEl = $('email');
      const pwdEl = $('password');
      let valid = true;

      clearErr(emailEl, 'emailErr');
      clearErr(pwdEl, 'pwdErr');

      /* Remove any old status messages */
      removeStatusMsg();

      if (!emailEl.value.trim()) {
        showErr(emailEl, 'emailErr', 'Email is required.'); valid = false;
      } else if (!isValidEmail(emailEl.value)) {
        showErr(emailEl, 'emailErr', 'Enter a valid email address.'); valid = false;
      }

      if (!pwdEl.value) {
        showErr(pwdEl, 'pwdErr', 'Password is required.'); valid = false;
      }

      if (!valid) return;

      const btn = $('loginBtn');
      btn.textContent = 'Signing in…'; btn.disabled = true;

      setTimeout(() => {
        const allUsers = getUsers();
        const found = allUsers.find(
          u => u.email.toLowerCase() === emailEl.value.trim().toLowerCase()
             && u.password === pwdEl.value
        );

        btn.textContent = 'Sign in'; btn.disabled = false;

        if (found) {
          /* Save session */
          localStorage.setItem('devfolio_session', JSON.stringify({ name: found.firstName, email: found.email }));
          showStatusMsg('success', `✅ Welcome back, ${found.firstName}! Redirecting…`);
          setTimeout(() => { window.location.href = '../index.html'; }, 1500);
        } else {
          showStatusMsg('error', '❌ Incorrect email or password. Try the demo credentials below.');
        }
      }, 900);
    });
  }

  /* =========================================
     REGISTER PAGE
     ========================================= */
  const registerForm = $('registerForm');
  if (registerForm) {

    setupToggle('togglePwd', 'password');
    setupToggle('toggleConfirm', 'confirm');

    /* Password strength meter */
    const pwdInput = $('password');
    if (pwdInput) {
      pwdInput.addEventListener('input', () => {
        updateStrength(pwdInput.value);
      });
    }

    registerForm.addEventListener('submit', e => {
      e.preventDefault();

      const firstName = $('firstName');
      const lastName  = $('lastName');
      const email     = $('email');
      const pwd       = $('password');
      const confirm   = $('confirm');
      const terms     = $('terms');
      let valid = true;

      /* Clear all errors */
      [
        [firstName, 'firstNameErr'],
        [lastName,  'lastNameErr'],
        [email,     'emailErr'],
        [pwd,       'pwdErr'],
        [confirm,   'confirmErr'],
        [null,      'termsErr']
      ].forEach(([el, id]) => clearErr(el, id));

      removeStatusMsg();

      if (!firstName.value.trim()) { showErr(firstName, 'firstNameErr', 'First name is required.'); valid = false; }
      if (!lastName.value.trim())  { showErr(lastName,  'lastNameErr',  'Last name is required.'); valid = false; }

      if (!email.value.trim()) {
        showErr(email, 'emailErr', 'Email is required.'); valid = false;
      } else if (!isValidEmail(email.value)) {
        showErr(email, 'emailErr', 'Enter a valid email address.'); valid = false;
      }

      if (!pwd.value) {
        showErr(pwd, 'pwdErr', 'Password is required.'); valid = false;
      } else if (pwd.value.length < 8) {
        showErr(pwd, 'pwdErr', 'Password must be at least 8 characters.'); valid = false;
      }

      if (!confirm.value) {
        showErr(confirm, 'confirmErr', 'Please confirm your password.'); valid = false;
      } else if (pwd.value !== confirm.value) {
        showErr(confirm, 'confirmErr', 'Passwords do not match.'); valid = false;
      }

      if (!terms.checked) {
        const termsErr = $('termsErr');
        if (termsErr) termsErr.textContent = 'You must accept the terms to continue.';
        valid = false;
      }

      if (!valid) return;

      const btn = $('registerBtn');
      btn.textContent = 'Creating account…'; btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Create account'; btn.disabled = false;

        const allUsers = getUsers();
        const exists = allUsers.find(u => u.email.toLowerCase() === email.value.trim().toLowerCase());

        if (exists) {
          showErr(email, 'emailErr', 'An account with this email already exists.');
          return;
        }

        allUsers.push({
          firstName: firstName.value.trim(),
          lastName: lastName.value.trim(),
          email: email.value.trim().toLowerCase(),
          password: pwd.value,
          createdAt: new Date().toISOString()
        });
        saveUsers(allUsers);

        /* Set session */
        localStorage.setItem('devfolio_session', JSON.stringify({
          name: firstName.value.trim(),
          email: email.value.trim().toLowerCase()
        }));

        showStatusMsg('success', `🎉 Account created! Welcome, ${firstName.value.trim()}. Redirecting…`);
        setTimeout(() => { window.location.href = '../index.html'; }, 1800);
      }, 1000);
    });
  }

  /* =========================================
     PASSWORD STRENGTH METER
     ========================================= */
  function updateStrength(val) {
    const bars = ['sb1','sb2','sb3','sb4'].map(id => $(id));
    const label = $('strengthLabel');
    if (!bars[0] || !label) return;

    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const colors = ['', '#e55454', '#e5954a', '#e8c547', '#4caf50'];
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

    bars.forEach((bar, i) => {
      bar.style.background = i < score ? colors[score] : 'var(--bg3)';
    });
    label.textContent = val.length === 0 ? '' : labels[score];
    label.style.color = colors[score] || 'var(--fg3)';
  }

  /* =========================================
     STATUS MESSAGES (shared)
     ========================================= */
  function showStatusMsg(type, text) {
    removeStatusMsg();
    const el = document.createElement('div');
    el.id = 'statusMsg';
    el.style.cssText = `
      text-align:center; padding:0.7rem 1rem; border-radius:6px;
      font-size:0.85rem; margin-top:0.75rem;
      background:${type === 'success' ? 'rgba(76,175,80,0.1)' : 'rgba(230,85,85,0.1)'};
      border:1px solid ${type === 'success' ? 'rgba(76,175,80,0.3)' : 'rgba(230,85,85,0.3)'};
      color:${type === 'success' ? '#4caf50' : '#e55'};
    `;
    el.textContent = text;
    const form = document.querySelector('.auth-form');
    if (form) form.appendChild(el);
  }

  function removeStatusMsg() {
    const old = $('statusMsg');
    if (old) old.remove();
  }

});
