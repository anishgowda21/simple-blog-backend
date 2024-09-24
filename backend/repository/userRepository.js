import { supabase } from "../config/db.js";
import { handleSupabaseError } from '../middlewares/errorMiddleware.js';

const getUserByEmail = async (email) => {
    const { data, error } = await supabase.from('user').select().eq('email', email);

    handleSupabaseError(error, "Failed to retrive user data");

    return data && data.length > 0 ? data[0] : null;

};

const createUser = async (name, email, password) => {

    const { data, error } = await supabase.from('user').insert({ name, email, password }).select().single();

    handleSupabaseError(error, "Failed to create user");

    return data;
};

export {
    getUserByEmail,
    createUser
}