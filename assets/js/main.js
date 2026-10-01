// Efeito suave no scroll do menu
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const alvo = document.querySelector(this.getAttribute('href'));
        if (alvo) {
            alvo.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mudar cor do header ao scrollar
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Formulário de contato (simulação)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! 🎉');
    e.target.reset();
});

console.log('🚀 Portfólio carregado!');