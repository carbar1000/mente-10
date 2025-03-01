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
        // Inserir os dados na tabela "respostas"
        const { error } = await supabase.from('respostas').insert(data);

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