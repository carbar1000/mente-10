const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Importe o pacote cors
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Carregar variáveis de ambiente do .env
dotenv.config();

console.log('Caminho atual:', __dirname); // Log para verificar o caminho atual
console.log('Arquivos no diretório:', fs.readdirSync(__dirname)); // Log para verificar os arquivos no diretório

console.log('SUPABASE_URL:', process.env.SUPABASE_URL); // Log para depuração
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY); // Log para depuração

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.error('As variáveis SUPABASE_URL e SUPABASE_KEY são obrigatórias.');
    process.exit(1); // Sai do processo se as variáveis não estiverem definidas
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());
app.use(cors()); // Habilitar CORS

app.post('/insert', async (req, res) => {
    const { nome, email, cor, animal, hobby } = req.body;

    try {
        const { data, error } = await supabase
            .from('respostas')
            .insert([{ nome, email, cor, animal, hobby }]);

        if (error) {
            console.error('Erro ao inserir dados:', error);
            return res.status(500).json({ error: 'Erro ao inserir dados' });
        }

        console.log('Dados inseridos:', data);
        res.status(200).json({ message: 'Dados recebidos e inseridos com sucesso!' });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});