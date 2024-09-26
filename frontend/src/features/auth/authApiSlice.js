import { apiSlice } from "../../app/apiSlice.js";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/user/auth',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/user',
                method: 'POST',
                body: { ...userData },
            }),
        }),
        getUserProfile: builder.query({
            query: () => '/user/profile',
            providesTags: ['User'],
        }),
        updateUserProfile: builder.mutation({
            query: (userData) => ({
                url: '/user/profile',
                method: 'PATCH',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
} = authApiSlice