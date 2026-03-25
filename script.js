// ===== NAVBAR: scroll state =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 160) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ===== SCROLL-REVEAL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // stagger children slightly
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll(
        '.skill-group, .project-card, .stat-item, .arch-item, .contact-link, .about-text, .section-title'
    );
    targets.forEach((el, i) => {
        el.classList.add('fade-up');
        el.dataset.delay = (i % 4) * 80; // stagger in groups
        observer.observe(el);
    });
});

// ===== CODE CARD TYPING ANIMATION =====
function runTypingAnimation() {
    const lines = document.querySelectorAll('.code-line');
    lines.forEach(line => {
        const original = line.innerHTML;
        line.dataset.original = original;
        line.innerHTML = '';
        line.style.opacity = '0';
    });

    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            // Restore HTML (with syntax color spans) all at once
            // We type character by character on the text, then restore full HTML
            typeHTMLLine(line, line.dataset.original, 38);
        }, 800 + index * 350);
    });
}

function typeHTMLLine(el, html, speed) {
    // Strip tags to get plain text length for timing, then reveal full HTML at end
    const plain = html.replace(/<[^>]+>/g, '');
    let i = 0;
    el.innerHTML = '';

    // For lines with syntax spans, just fade them in word by word
    el.innerHTML = html;
    el.style.clipPath = 'inset(0 100% 0 0)';
    el.style.transition = `clip-path ${(plain.length * speed) / 1000}s steps(${plain.length})`;
    requestAnimationFrame(() => {
        el.style.clipPath = 'inset(0 0% 0 0)';
    });
}

window.addEventListener('load', runTypingAnimation);

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name    = document.getElementById('name');
        const email   = document.getElementById('email');
        const message = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');
        const success = document.getElementById('formSuccess');

        // Reset errors
        ['name', 'email', 'message'].forEach(f => {
            document.getElementById(f + 'Error').textContent = '';
            document.getElementById(f).style.borderColor = '';
        });

        let valid = true;

        if (!name.value.trim()) {
            showError('name', 'Please enter your name.');
            valid = false;
        }

        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRe.test(email.value)) {
            showError('email', 'Please enter a valid email address.');
            valid = false;
        }

        if (!message.value.trim() || message.value.trim().length < 10) {
            showError('message', 'Message must be at least 10 characters.');
            valid = false;
        }

        if (!valid) return;

        // Show loading state
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loading').style.display = 'inline-flex';
        submitBtn.disabled = true;

        // Since this is a static site, open mailto as fallback
        // (swap for a real API endpoint when backend is available)
        await new Promise(resolve => setTimeout(resolve, 800));

        const subject = encodeURIComponent(`Portfolio Contact from ${name.value}`);
        const body    = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\n\nMessage:\n${message.value}`);
        window.location.href = `mailto:mrcngicho@gmail.com?subject=${subject}&body=${body}`;

        submitBtn.querySelector('.btn-text').style.display = 'inline-flex';
        submitBtn.querySelector('.btn-loading').style.display = 'none';
        submitBtn.disabled = false;

        success.style.display = 'flex';
        form.reset();

        setTimeout(() => { success.style.display = 'none'; }, 6000);
    });
}

function showError(fieldId, msg) {
    document.getElementById(fieldId + 'Error').textContent = msg;
    document.getElementById(fieldId).style.borderColor = '#f87171';
}