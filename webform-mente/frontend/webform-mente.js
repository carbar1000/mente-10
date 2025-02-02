document.getElementById('myForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const cor = document.querySelector('input[name="cor"]:checked')?.value;
  const animal = document.querySelector('input[name="animal"]:checked')?.value;
  const hobby = document.querySelector('input[name="hobby"]:checked')?.value;

  if (!cor || !animal || !hobby) {
      alert('Por favor, selecione todas as opções obrigatórias.');
      return;
  }

  try {
      const response = await fetch('http://localhost:3000/insert', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome, email, cor, animal, hobby }),
      });

      const result = await response.json();
      if (response.ok) {
          console.log('Dados enviados com sucesso:', result);
          alert('Dados enviados com sucesso!');
          window.location.href = 'obrigado.html'; // Redirecionar para a página de agradecimento
      } else {
          console.error('Erro ao enviar dados:', result);
          alert('Erro ao enviar dados.');
      }
  } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar dados.');
  }
});
