import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

// Fetch categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const { data } = await axios.get("/api/categories", {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      console.log("Fetched suppliers:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const { data } = await axios.post("/api/categories", category, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      await axios.delete(`/api/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      return categoryId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload;
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.categories.push(payload);
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.categories = state.categories.filter(
          (category) => category.id !== payload
        );
      });
  },
});

export default categoriesSlice.reducer;
