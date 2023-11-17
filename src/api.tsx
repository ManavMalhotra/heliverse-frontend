import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }), // Replace '/api' with your API base URL
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => (`users?page=${parseInt(params.page)}`),
      providesTags: ["User"],
    }),
    // Define other endpoints for CRUD operations
  }),
});

export const { useGetUsersQuery } = userApi;
