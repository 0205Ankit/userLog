import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<any, void>({
      query: () => "/get-users",
      providesTags: ["User"],
    }),

    getOneUser: builder.query({
      query: (body) => ({
        url: "/find-user",
        method: "POST",
        body,
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (body) => ({
        url: "/update-user",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    addUser: builder.mutation({
      query: (body) => ({
        url: "/add-user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (name) => ({
        url: `/delete-user/${name}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetOneUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
