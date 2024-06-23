import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchItemsByCategory = createAsyncThunk(
  "items/fetchItemsByCategory",
  async (categoryId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.get(`/api/items/${categoryId}/items`, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemsByCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchItemsByCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default itemsSlice.reducer;
