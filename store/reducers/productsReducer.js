import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from "sweetalert";
import AppMsgs from "../../constants/AppMsgs";

const initialState = {
  products: [],
  product: null,
  status: "idle",
  error: null,
  searchText: "",
};

export const fetchProducts = createAsyncThunk("products/getAll", async () => {
  const response = await axios.get(
    `${process.env.NEXT_APP_API_URL}/cafe/products`
  );
  return response.data;
});

export const fetchProductById = createAsyncThunk(
  "products/getOne",
  async (id) => {
    const response = await axios.get(
      `${process.env.NEXT_APP_API_URL}/cafe/products/${id}`
    );
    return response.data;
  }
);

export const giveProductRating = createAsyncThunk(
  "products/rating/updateOne",
  async (payload, { getState }) => {
    let productId = payload.productId;
    let yourRating = +payload.yourRating;

    const response = await axios.post(
      `${process.env.NEXT_APP_API_URL}/cafe/products/${productId}/rating`,
      {
        star: yourRating,
      }
    );
    return response.data;
  }
);

const methods = [fetchProducts, fetchProductById, giveProductRating];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchTextChange(state, action) {
      state.searchText = action.payload;
    },
  },
  extraReducers(builder) {
    methods.forEach((m) => {
      builder
        .addCase(m.pending, (state, _action) => {
          state.status = "loading";
        })
        .addCase(m.fulfilled, (state, action) => {
          state.status = "succeeded";
          switch (m) {
            case fetchProducts:
              state.products = action.payload.data;
              break;
            case fetchProductById:
              state.product = action.payload.data;
              break;
            case giveProductRating:
              state.product = action.payload.data;
              swal({
                text: AppMsgs.ReviewPlaced,
                icon: "success",
              });
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

export const { searchTextChange } = productsSlice.actions;
export default productsSlice.reducer;
