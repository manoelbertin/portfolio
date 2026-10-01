// main.js
// === MENU MOBILE ===
const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('.nav__list');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// === SCROLL ATIVO NO MENU ===
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// === HEADER COM SOMBRA NO SCROLL ===
const header = document.getElementById('header');

function scrollHeader() {
    if (window.scrollY >= 50) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', scrollHeader);

// === FORMULÁRIO DE CONTATO ===
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Validação básica
    if (!data.name || !data.email || !data.message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    console.log('Dados do formulário:', data);
    alert('Mensagem enviada com sucesso!');
    contactForm.reset();
});

// === ANIMAÇÃO DE SCROLL (Intersection Observer) ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplica animação em cards e seções
document.querySelectorAll('.skill__card, .project__card, .about__box')
    .forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });