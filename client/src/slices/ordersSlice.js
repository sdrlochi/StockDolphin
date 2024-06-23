import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

// Async thunk for fetching orders by item
export const fetchOrdersByItem = createAsyncThunk(
  "orders/fetchOrdersByItem",
  async (itemId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await axios.get(`/api/orders/items/${itemId}`, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axios.post("/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating an order
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, orderData }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axios.put(`/api/orders/${id}`, orderData, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting an order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      await axios.delete(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByItem.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
