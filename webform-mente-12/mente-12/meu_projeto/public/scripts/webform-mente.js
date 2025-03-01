// Manter controle da seção atual ccc
let currentSection = 1;
const totalSections = document.querySelectorAll('.form-container').length;
const sections = [
    'cor-favorita',
    'animal-favorito',
    'hobby-favorito',
    'dados-pessoais',
    'dados-contato'
];

// Função para iniciar o formulário
function startSurvey() {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('myForm').classList.remove('hidden');
    navigate(0); // Começar na primeira seção
}

// Função para navegar entre seções
function navigate(direction) {
    // Ocultar seção atual
    document.getElementById(sections[currentSection-1]).classList.remove('active');
    
    // Calcular próxima seção
    currentSection += direction;
    
    // Validar limites
    if (currentSection < 1) currentSection = 1;
    if (currentSection > totalSections) currentSection = totalSections;
    
    // Mostrar nova seção
    document.getElementById(sections[currentSection-1]).classList.add('active');
    
    // Atualizar estado dos botões
    updateButtons();
}

// Função para atualizar estado dos botões
function updateButtons() {
    const prevButtons = document.querySelectorAll('button[onclick="navigate(-1)"]');
    prevButtons.forEach(button => {
        button.disabled = (currentSection === 1);
    });
}

// Avançar automaticamente após selecionar opção (para radio buttons)
function autoNext() {
    setTimeout(() => navigate(1), 500);
}

// Validar formulário
function validateForm() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    let isValid = true;

    if (nome === '') {
        isValid = false;
        showFlashMessage('O nome é obrigatório.', 'error');
        document.getElementById('nome').focus();
    }

    if (!validateEmail(email)) {
        isValid = false;
        showFlashMessage('O e-mail é inválido.', 'error');
    }

    return isValid;
}

// Validar formato de e-mail
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Exibir mensagem flash
function showFlashMessage(message, type) {
    const flashMessage = document.getElementById('flashMessage');
    flashMessage.textContent = message;
    flashMessage.className = `flash-message ${type}`;
    flashMessage.style.display = 'block';

    setTimeout(() => {
        flashMessage.style.display = 'none';
    }, 3000);
}

// Configurar o envio do formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch('/api/submitForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Erro ao enviar o formulário');
            }
            
            // Redirecionar para página de agradecimento
            window.location.href = '/obrigado.html';
        } catch (error) {
            showFlashMessage(error.message, 'error');
        }
    });
});