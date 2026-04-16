document.addEventListener('DOMContentLoaded', () => {
    // 1. Efeito de revelação (fade-in) nos elementos ao scrollar
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .founders__intro, .section-title, .qa-box__visual');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 2. Interatividade dos botões de Projeto (se existirem na página)
    const expandButtons = document.querySelectorAll('.js-expand-btn');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card--project');
            const hiddenContent = card.querySelector('.card__hidden-content');
            hiddenContent.classList.toggle('is-expanded');
            this.textContent = hiddenContent.classList.contains('is-expanded') ? 'Ver Menos -' : 'Ver Detalhes +';
        });
    });

    // 3. Lógica do FAQ (Acordeão)
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Fecha as outras respostas
            const currentContent = this.nextElementSibling;
            const currentIcon = this.querySelector('.faq-icon');

            document.querySelectorAll('.faq-content').forEach(content => {
                if(content !== currentContent) {
                    content.classList.remove('active');
                    content.previousElementSibling.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                }
            });

            // Abre/Fecha a clicada
            currentContent.classList.toggle('active');
            
            // Gira o ícone de +
            if(currentContent.classList.contains('active')) {
                currentIcon.style.transform = 'rotate(45deg)'; // Vira um "X"
            } else {
                currentIcon.style.transform = 'rotate(0deg)'; // Volta ao "+"
            }
        });
    });

    // 4. Validação simples do formulário de contato
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;

            if(!nome || !email || !mensagem) {
                e.preventDefault();
                alert("Por favor, preencha todos os campos obrigatórios antes de enviar.");
            }
            // Como é um mailto, o navegador abrirá o cliente de e-mail padrão se passar na validação.
        });
    }
});
