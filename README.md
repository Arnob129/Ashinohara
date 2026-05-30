# DevFolio — Portfolio + Auth System

A professional personal portfolio website with a fully working **Login & Registration system**, built with pure **HTML, CSS, and JavaScript**. No frameworks. No dependencies.

## 🌐 Live Demo

[View live →](https://alexrahman.github.io/devfolio)

## 📁 Project structure

```
devfolio/
├── index.html              # Portfolio landing page
├── css/
│   └── main.css            # Full design system (shared by all pages)
├── js/
│   ├── main.js             # Portfolio interactions
│   └── auth.js             # Login & register logic
└── pages/
    ├── login.html          # Sign in page
    └── register.html       # Create account page
```

## ✨ Features

### Portfolio
- Custom CSS cursor with follower ring
- Sticky navbar with scroll-triggered background
- Mobile hamburger menu
- Hero with staggered text reveal animations
- Auto-scrolling marquee ticker
- Animated count-up stat numbers
- Scroll reveal (IntersectionObserver API)
- Animated skill bars
- Contact form with full validation
- Responsive at all breakpoints

### Auth System
- **Login page** — email + password validation, demo credentials hint
- **Register page** — first/last name, email, password strength meter, confirm password, terms checkbox
- Password show/hide toggle on all password fields
- User data stored in `localStorage` (simulated database)
- Session stored in `localStorage` after login/register
- Auto-redirect to portfolio on success
- Demo account pre-seeded: `user@demo.com / demo1234`

## 🛠️ Technologies

| Technology | Usage |
|---|---|
| HTML5 | Semantic structure, forms, accessibility |
| CSS3 | Custom properties, Grid, Flexbox, animations, `@keyframes` |
| JavaScript ES6+ | IntersectionObserver, DOM events, localStorage, form validation |
| Google Fonts | Instrument Serif + Syne + JetBrains Mono |

## 🚀 Getting started

```bash
git clone https://github.com/alexrahman/devfolio.git
cd devfolio
# Open index.html in your browser or use VS Code Live Server
```

No build step required.

## 📐 JavaScript concepts used

| Concept | Where |
|---|---|
| `IntersectionObserver` | Scroll reveal, counter animation, skill bars |
| `localStorage` | User database, session management |
| `setInterval` | Count-up animation |
| DOM manipulation | Form errors, dynamic messages |
| Event delegation | Hamburger menu, form submit |
| Regex | Email validation |

## 🎨 Design system

CSS custom properties in `main.css`:

```css
:root {
  --bg: #0a0a0a;           /* Main background */
  --accent: #e8c547;       /* Gold accent — change to your color */
  --ff-display: 'Instrument Serif', serif;
  --ff-sans: 'Syne', system-ui;
}
```

## 👤 Customising

1. Replace `Alex Rahman` with your name across HTML files
2. Update email, GitHub, and LinkedIn links
3. Edit project descriptions in `index.html`
4. Change `--accent` color in `main.css`
5. Deploy to GitHub Pages

---

Built with pure HTML, CSS & JS by Alex Rahman
