import { supabase } from "../config/db.js";
import { handleSupabaseError } from "../middlewares/errorMiddleware.js";

const createBlog = async (title, content, userId) => {
    const { data, error } = await supabase.from('blog')
        .insert({ title, content, user_id: userId })
        .select().single();

    handleSupabaseError(error, 'Failed to create Blog');

    return data;
};

const getAllBlogs = async () => {
    const { data, error } = await supabase.from('blog')
        .select('id,title,content,created_at,updated_at,user:user_id(name)')
        .eq('published', false).order('updated_at', { ascending: false });

    handleSupabaseError(error, "Failed to fetch the blogs");

    return data;
}

const getDashboardBlogs = async (userId) => {
    const { data, error } = await supabase.from('blog')
        .select('id,title,content,created_at,updated_at,user_id,published')
        .eq('user_id', userId).order('updated_at', { ascending: false });

    handleSupabaseError(error, 'Error getting dashboard blogs');

    return data;

};


const getBlogById = async (blogId) => {
    const { data, error } = await supabase.from('blog')
        .select('id,title,content,created_at,updated_at,user:user_id(id,name),published')
        .eq('id', blogId);

    handleSupabaseError(error, 'Error getting blog');

    return data && data.length > 0 ? data[0] : null;
};

const updateBlogById = async ({ id, title, content, published }) => {
    const { data, error } = await supabase.from('blog')
        .update({ title, content, published }).eq('id', id).select().single();

    handleSupabaseError(error, 'Error getting blog');

    return data;
};

const deleteBlogById = async (blogId, userId) => {
    const { data, error } = await supabase.from('blog').delete()
        .eq('id', blogId).eq('user_id', userId).select('id,user_id');
    handleSupabaseError(error, "Failed to delete user");
    return data && data.length > 0 ? data[0] : null;
};

export { createBlog, getAllBlogs, getDashboardBlogs, getBlogById, updateBlogById, deleteBlogById }