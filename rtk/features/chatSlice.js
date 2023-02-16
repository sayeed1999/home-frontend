import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getJwtToken } from "../../utils/services/storage.service";

export const chatSlice = createApi({
  reducerPath: "chat",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:4000/chat",
    baseUrl: "http://localhost:4005",
    prepareHeaders: (headers, { getState }) => {
      const token = getJwtToken();
      if (token) headers.set("Authorization", `${token}`);
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getCurrentUser: builder.query({
      query: () => "/users/current-user",
    }),
    getMessagesWithUser: builder.query({
      query: (user_id) => ({
        url: `/conversations/dual/${user_id.toString()}`,
        method: "GET",
      }),
    }),
    sendMessageToUser: builder.mutation({
      query: ({ user_id, body }) => ({
        url: `/conversations/dual/${user_id.toString()}`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useGetMessagesWithUserQuery,
  useSendMessageToUserMutation,
} = chatSlice;

export default chatSlice;
