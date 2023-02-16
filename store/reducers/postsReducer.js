import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from "sweetalert";

const initialState = {
  posts: [],
  size: 10,
  page: 1,
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/getAll",
  async (_payload, { getState }) => {
    const { size, page } = getState().posts;
    const response = await axios.get(
      `${process.env.NEXT_APP_API_URL}/newsfeed/posts?size=${size}&page=${page}`
    );
    return response.data;
  }
);

export const loadMore = createAsyncThunk(
  "posts/loadMore",
  async (_payload, { getState }) => {
    const { size, page } = getState().posts;
    const response = await axios.get(
      `${process.env.NEXT_APP_API_URL}/newsfeed/posts?size=${size}&page=${
        page + 1
      }`
    );
    return response.data;
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/getOne",
  async (postId) => {
    const response = await axios.get(
      `${process.env.NEXT_APP_API_URL}/newsfeed/posts/${postId}`
    );
    return response.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/createOne",
  async ({ postBody, category }, { getState }) => {
    const currentUser = getState().auth.currentUser;
    if (!currentUser) {
      return swal({
        text: "Please login first!",
        icon: "info",
      });
    }

    let newPost = {};
    newPost.body = postBody;
    newPost.category = category;
    newPost.likes = [];
    newPost.comments = [];
    newPost.userid = currentUser.userid;
    newPost.username = currentUser.username;
    newPost.createdAt = new Date();

    const response = await axios.post(
      `${process.env.NEXT_APP_API_URL}/newsfeed/posts`,
      newPost
    );
    return response.data;
  }
);

export const commentOnPost = createAsyncThunk(
  "comments/createOne",
  async (payload, { getState }) => {
    const currentUser = getState().auth.currentUser;
    if (!currentUser) {
      return swal({
        text: "Please login first!",
        icon: "info",
      });
    }
    const postId = payload.postId;

    let comment = {
      body: payload.commentBody,
      userid: currentUser.userid,
      username: currentUser.username,
      createdAt: new Date(),
    };

    const response = await axios.post(
      `${process.env.NEXT_APP_API_URL}/newsfeed/posts/${postId}/comments`,
      comment
    );
    return response.data;
  }
);

export const tapHeart = createAsyncThunk(
  "posts/updateOne",
  async (post, { getState }) => {
    const currentUser = getState().auth.currentUser;
    if (!currentUser) {
      return swal({
        text: "Please login first!",
        icon: "info",
      });
    }
    const userid = currentUser.userid;

    if (!post.likes) post.likes = [];

    if (post.likes.includes(userid)) {
      post = { ...post, likes: post.likes.filter((x) => x !== userid) };
    } else {
      post = { ...post, likes: [...post.likes, userid] };
    }

    const response = await axios.put(
      `${process.env.NEXT_APP_API_URL}/newsfeed/posts/${post._id}`,
      post
    );
    const payload = {
      data: post,
    };
    return payload;
  }
);

const methods = [
  fetchPosts,
  loadMore,
  fetchPostById,
  createPost,
  tapHeart,
  commentOnPost,
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    methods.forEach((m) => {
      builder
        .addCase(m.pending, (state, _action) => {
          state.status = "loading";
        })
        .addCase(m.fulfilled, (state, action) => {
          state.status = "succeeded";
          switch (m) {
            case fetchPosts:
              state.posts = action.payload.data;
              break;
            case loadMore:
              state.page += 1;
              state.posts = [...state.posts, ...action.payload.data];
              break;
            case createPost:
              if (!action.payload.data) break; // if post is undefined
              state.posts.unshift(action.payload.data);
              break;
            case tapHeart:
            case commentOnPost:
              if (!action.payload.data) break;
              const post = action.payload.data;
              const index = state.posts.findIndex((x) => x._id === post._id);
              state.posts[index] = post;
              break;
            default:
              break;
          }
        })
        .addCase(m.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    });
  },
});

export default postsSlice.reducer;
