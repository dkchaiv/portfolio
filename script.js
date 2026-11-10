// ===== TYPEWRITER EFFECT =====
const typewriterEl = document.getElementById('typewriter');
const terminalOutput = document.getElementById('terminalOutput');

const commands = [
    { cmd: 'whoami', delay: 80 },
];

const outputLines = [
    '<span class="output-label">Name:</span>  Deepak Kumar Chauhan',
    '<span class="output-label">Role:</span>  Cybersecurity Researcher',
    '<span class="output-label">Focus:</span> VAPT | Exploit Dev | IoT Security',
    '<span class="output-label">CVEs:</span>  CVE-2025-10035 (CVSS 10.0)',
    '<span class="output-label">Repos:</span> WEB-VAPT, python-keylogger-edu, +4 more',
    '<span class="output-label">Status:</span> <span style="color:var(--accent)">● Available for work</span>',
];

function typeCommand(text, el, speed) {
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            el.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

async function runTerminal() {
    await new Promise(r => setTimeout(r, 600));
    for (const { cmd, delay } of commands) {
        await typeCommand(cmd, typewriterEl, delay);
        await new Promise(r => setTimeout(r, 400));
    }

    // Show output lines one by one
    for (let i = 0; i < outputLines.length; i++) {
        const p = document.createElement('p');
        p.innerHTML = outputLines[i];
        terminalOutput.appendChild(p);
        await new Promise(r => setTimeout(r, 150));
        p.classList.add('visible');
    }
}

runTerminal();

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close nav when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

function highlightNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);
highlightNav();

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
    '.section-title, .about-text, .about-card, .skill-category, .project-card, .cert-card, .contact-info, .contact-form'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation based on element index within its parent
            const parent = entry.target.parentElement;
            const siblings = parent ? Array.from(parent.children) : [];
            const siblingIndex = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, siblingIndex * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            let current = 0;
            const step = Math.max(1, Math.floor(target / 30));
            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                el.textContent = current + '+';
            }, 40);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = 'var(--accent-dim)';
    setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        contactForm.reset();
    }, 2500);
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.85)';
    }
    lastScroll = currentScroll;
});

