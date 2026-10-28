// Navbar scroll state
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Accessible mobile navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// Smooth in-page navigation
// CSS also provides scroll-behavior: smooth as a progressive enhancement.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Active navigation item
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveLink() {
    let current = 'home';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 160) current = section.id;
    });
    navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('load', updateActiveLink);

// Scroll-reveal animations; reveal immediately when reduced motion is preferred.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.skill-group, .project-card, .stat-item, .arch-item, .contact-link, .about-text, .section-title');
if (reducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('visible'));
} else {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = Number(entry.target.dataset.delay || 0);
                window.setTimeout(() => entry.target.classList.add('visible'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach((el, index) => {
        el.classList.add('fade-up');
        el.dataset.delay = String((index % 4) * 70);
        observer.observe(el);
    });
}

// Decorative code-card reveal
function runTypingAnimation() {
    if (reducedMotion) return;
    const lines = document.querySelectorAll('.code-line');
    lines.forEach((line, index) => {
        const plain = line.textContent || '';
        line.style.opacity = '0';
        line.style.clipPath = 'inset(0 100% 0 0)';
        line.style.transition = `opacity 180ms ease, clip-path ${Math.max(350, plain.length * 28)}ms steps(${Math.max(1, plain.length)})`;
        window.setTimeout(() => {
            line.style.opacity = '1';
            requestAnimationFrame(() => { line.style.clipPath = 'inset(0 0 0 0)'; });
        }, 300 + index * 220);
    });
}
window.addEventListener('load', runTypingAnimation);

// Contact form: validates input and opens a prefilled email draft.
// This static portfolio has no backend endpoint, so do not claim email delivery.
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');
        const success = document.getElementById('formSuccess');
        const fields = ['name', 'email', 'message'];
        let valid = true;

        fields.forEach(field => {
            document.getElementById(`${field}Error`).textContent = '';
            document.getElementById(field).removeAttribute('aria-invalid');
            document.getElementById(field).style.borderColor = '';
        });
        success.hidden = true;

        if (!name.value.trim()) { showError('name', 'Please enter your name.'); valid = false; }
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRe.test(email.value.trim())) { showError('email', 'Please enter a valid email address.'); valid = false; }
        if (message.value.trim().length < 10) { showError('message', 'Please enter a message of at least 10 characters.'); valid = false; }
        if (!valid) return;

        const subject = encodeURIComponent(`Portfolio contact from ${name.value.trim()}`);
        const body = encodeURIComponent(`Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\nMessage:\n${message.value.trim()}`);
        const mailto = `mailto:mrcngicho@gmail.com?subject=${subject}&body=${body}`;
        success.hidden = false;
        window.location.href = mailto;
    });
}

function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    document.getElementById(`${fieldId}Error`).textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.style.borderColor = '#f87171';
    input.focus();
}

// Keep the footer year current.
const year = document.getElementById('currentYear');
if (year) year.textContent = String(new Date().getFullYear());
