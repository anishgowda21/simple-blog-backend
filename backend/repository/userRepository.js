import { supabase } from "../config/db.js";
import { handleSupabaseError } from '../middlewares/errorMiddleware.js';

const getUserByEmail = async (email) => {
    const { data, error } = await supabase.from('user').select().eq('email', email);

    handleSupabaseError(error, "Failed to retrive user data");

    return data && data.length > 0 ? data[0] : null;

};

const getUserById = async (userId) => {
    const { data, error } = await supabase.from('user').select('id, name, email').eq('id', userId);

    handleSupabaseError(error, "Failed to retrive user data");

    return data && data.length > 0 ? data[0] : null;

};

const createUser = async (name, email, password) => {

    const { data, error } = await supabase.from('user').insert({ name, email, password }).select().single();

    handleSupabaseError(error, "Failed to create user");

    return data;
};

const updateUser = async ({ id, name, email }) => {
    const { data, error } = await supabase.from('user').update({ name, email }).eq('id', id).select().single();

    handleSupabaseError(error, "Failed to update user");

    return data;
}

const deleteUser = async (id) => {
    const { error } = await supabase.from('user').delete()
        .eq('id', id);
    handleSupabaseError(error, "Failed to delete user");
};

export {
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}