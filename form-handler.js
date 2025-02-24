document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    if (form) {
        // Remove event listeners existentes para evitar duplicação
        form.removeEventListener('submit', handleSubmit);
        form.addEventListener('submit', handleSubmit);
    }
});

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dados = {};
    formData.forEach((value, key) => {
        dados[key] = value;
    });
    console.log('Dados a serem enviados:', dados); // Adicionando log para verificar a estrutura dos dados
    enviarRespostas(dados);
}

async function enviarRespostas(dados) {
    try {
        // Enviar para Supabase
        const responseSupabase = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        const result = await responseSupabase.json();
        if (responseSupabase.ok && result.redirect) {
            window.location.href = result.redirect;
            return;
        } else if (!responseSupabase.ok) {
            console.error('Erro ao enviar as respostas para Supabase:', responseSupabase.statusText);
        }


        // Enviar para Google Sheets via webhook
        const responseSheets = await fetch(process.env.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        if (!responseSheets.ok) {
            console.error('Erro ao enviar as respostas para Google Sheets:', responseSheets.statusText);
        }

    } catch (error) {
        console.error('Erro ao enviar as respostas:', error);
    }
}
