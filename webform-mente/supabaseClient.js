import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// Adicionando log para informar que a conexão foi estabelecida
console.log('Conectado ao Supabase com sucesso!');
