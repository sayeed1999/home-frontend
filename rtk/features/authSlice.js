import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getJwtToken } from "../../utils/services/storage.service";

export const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:4000/auth",
    baseUrl: "http://localhost:4001",
    prepareHeaders: (headers, { getState }) => {
      const token = getJwtToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => "/current-user",
    }),
    updateCurrentUser: builder.mutation({
      query: (data) => ({
        url: "/current-user",
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCurrentUser: builder.mutation({
      query: (data) => ({
        url: "/current-user",
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useDeleteCurrentUserMutation,
} = authSlice;

export default authSlice;
