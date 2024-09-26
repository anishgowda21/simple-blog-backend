import { apiSlice } from "../../app/apiSlice.js";

export const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => '/blog',
            providesTags: ['Blog'],
        }),
        getDashboardBlogs: builder.query({
            query: () => '/blog/dashboard',
            providesTags: ['Blog'],
        }),
        getBlogById: builder.query({
            query: (id) => `/blog/${id}`,
            providesTags: ['Blog'],
        }),
        createBlog: builder.mutation({
            query: (blogData) => ({
                url: '/blog',
                method: 'POST',
                body: blogData,
            }),
            invalidatesTags: ['Blog'],
        }),
        updateBlog: builder.mutation({
            query: ({ id, ...blogData }) => ({
                url: `/blog/${id}`,
                method: 'PATCH',
                body: blogData,
            }),
            invalidatesTags: ['Blog'],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blog/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blog'],
        }),
    }),
})

export const {
    useGetBlogsQuery,
    useGetDashboardBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApiSlice