document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    if (form) {
        // Remove event listeners existentes para evitar duplicação
        form.removeEventListener('submit', handleSubmit);
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const dados = getFormData();
            
            try {
                const { data, error } = await supabase
                    .from('respostas')
                    .insert([dados]);

                if (error) throw error;

                // Redirecionamento após sucesso
                window.location.href = '/obrigado.html';
                
            } catch (error) {
                console.error('Erro:', error);
                document.getElementById('flashMessage').textContent = 'Erro ao enviar formulário';
            }
        });
    }
});
function getFormData() {
    const formData = new FormData(document.getElementById('myForm'));
    const dados = {};
    formData.forEach((value, key) => {
        dados[key] = value;
    });
    console.log('Dados a serem enviados:', dados);
    return dados;
}
