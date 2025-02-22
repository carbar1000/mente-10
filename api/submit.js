import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL; // Variável de ambiente para a URL do Google Apps Script



if (!supabaseUrl || !supabaseKey || !googleScriptUrl) {
    throw new Error('Supabase URL, chave anônima e/ou URL do Google Script não configuradas');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false
    }
});

console.log('Supabase client configurado com URL:', supabaseUrl);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Validação básica dos dados
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ error: 'Dados do formulário inválidos' });
            }

            console.log('Dados recebidos:', req.body);
            
            const { data, error } = await supabase
                .from('respostas')
                .insert([req.body])
                .select();

            if (error) {
                console.error('Erro ao enviar dados:', {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code
                });
                return res.status(500).json({ 
                    error: 'Erro ao salvar dados',
                    details: error.message,
                    code: error.code
                });
            }

            console.log('Dados enviados com sucesso:', data);

            // Enviar dados para Google Sheets via Google Apps Script
            const responseSheets = await fetch(process.env.GOOGLE_SCRIPT_URL, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body), // Enviando os dados recebidos
            });

            if (!responseSheets.ok) {
                console.error('Erro ao enviar dados para Google Sheets:', responseSheets.statusText);
            }

            return res.status(200).json({
                success: true,
                data: data 
            });

        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            return res.status(500).json({ 
                error: 'Erro interno do servidor',
                details: error.message 
            });
        }
    } else {
        return res.status(405).json({ 
            error: 'Método não permitido',
            allowed: ['POST'] 
        });
    }
}
