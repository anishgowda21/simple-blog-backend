import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or key');
    process.exit(1);
}


const supabase = createClient(supabaseUrl, supabaseKey);

const connectSupabase = async () => {
    try {
        const { data, error } = await supabase.from('user').select('id').limit(1);
        if (error) throw error;
        console.log('Supabase connection successful');
        return supabase;
    } catch (error) {
        console.error('Error connecting to Supabase:', error.message);
        process.exit(1);
    }

};

export { supabase, connectSupabase };