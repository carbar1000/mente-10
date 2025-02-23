document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    if (form) {
<<<<<<< HEAD

    form.removeEventListener('submit', handleSubmit);
    form.addEventListener('submit', handleSubmit);

=======
        // Remove event listeners existentes para evitar duplicação
        form.removeEventListener('submit', handleSubmit);
>>>>>>> a11efc6aab33e9bdcb59cb32ce7dcf20ca199362
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
<<<<<<< HEAD
    console.log('Dados a serem enviados:', dados); // Adicionando log para verificar a estrutura dos dados
=======
    // Chama a função para enviar as respostas
>>>>>>> a11efc6aab33e9bdcb59cb32ce7dcf20ca199362
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

        if (!responseSupabase.ok) {
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

        if (responseSheets.ok) {
            window.location.href = 'obrigado.html';
        } else {
            console.error('Erro ao enviar as respostas para Google Sheets:', responseSheets.statusText);
        }
    } catch (error) {
        console.error('Erro ao enviar as respostas:', error);
    }
}
