import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método não permitido' })
    }

    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Dados do formulário inválidos' });
        }
        
        console.log('Dados recebidos para inserção:', req.body);
        const { data, error } = await supabase
            .from('respostas')
            .insert([req.body]);
        console.log('Dados inseridos com sucesso:', data);

        if (error) {
            console.error('Erro ao inserir dados no Supabase:', error);
            throw error;
        }

        res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
}
