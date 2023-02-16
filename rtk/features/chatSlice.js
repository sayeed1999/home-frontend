import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatSlice = createApi({
  reducerPath: "chat",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:4000/chat",
    baseUrl: "http://localhost:4005",
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getMessagesWithUser: builder.query({
      query: (user_id) => ({
        url: `/conversations/dual/${user_id.toString()}`,
        method: "GET",
      }),
    }),
    sendMessageToUser: builder.query({
      query: (user_id) => ({
        url: `/conversations/dual/${user_id.toString()}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetMessagesWithUserQuery,
  useSendMessageToUserQuery,
} = chatSlice;

export default chatSlice;
