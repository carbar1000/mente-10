import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Configurar cabeçalhos CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Responder a requisições OPTIONS (pré-voo CORS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Verificar se o método da requisição é POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido.' });
    }

    // Obter credenciais do Supabase do ambiente
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    // Verificar se as credenciais estão configuradas
    if (!supabaseUrl || !supabaseKey) {
        console.error('Configuração do Supabase ausente.');
        return res.status(500).json({ message: 'Configuração do Supabase ausente.' });
    }

    // Criar cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Extrair os dados do corpo da requisição
    const data = req.body;

    try {
        // Prepare data to match the table structure
        const formData = {
            nome: data.nome,
            email: data.email,
            A: data['cor-favorita'], // Mapping Cor Favorita to A
            B: data.animal, // Mapping Animal to B
            C: data.hobby, // Mapping Hobby to C
            processed: false, // Default value as per table definition
            user_id: null // Temporary null as per table definition
        };

        // Insert the prepared data into the "respostas" table
        const { error } = await supabase.from('respostas').insert(formData);

        // Verificar se houve erro durante a inserção
        if (error) {
            console.error('Erro ao inserir dados no Supabase:', error);
            return res.status(500).json({ message: 'Erro ao salvar os dados.', error: error.message });
        }

        // Responder com sucesso
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ message: 'Dados salvos com sucesso.' });
    } catch (err) {
        // Tratar erros gerais
        console.error('Erro geral:', err);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ message: 'Erro interno do servidor.', error: err.message });
    }
}