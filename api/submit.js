import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método não permitido' })
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )

    try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ error: 'Dados do formulário inválidos' });
            }
            const { data, error } = await supabase
                .from('respostas')
                .insert([req.body])


      if (error) throw error

      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
}
