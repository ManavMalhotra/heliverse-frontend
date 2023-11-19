import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://heliverse-backend-yjd8.onrender.com/api" }), // Replace '/api' with your API base URL
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => `users?page=${parseInt(params.page)}`,
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    searchUsers: builder.query({
      query: (query) => `users/search?query=${query}`,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
