import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

// Fetch suppliers
export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const { data } = await axios.get("/api/suppliers", {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      console.log("Fetched suppliers:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add supplier
export const addSupplier = createAsyncThunk(
  "suppliers/addSupplier",
  async (supplier, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const { data } = await axios.post("/api/suppliers", supplier, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      console.log("Added supplier:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete supplier
export const deleteSupplier = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (supplierId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      await axios.delete(`/api/suppliers/${supplierId}`, {
        headers: { Authorization: `Bearer ${user.userInfo.token}` },
      });
      console.log("Deleted supplier with id:", supplierId);
      return supplierId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update supplier
export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async (supplier, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const { data } = await axios.put(
        `/api/suppliers/${supplier.id}`,
        supplier,
        {
          headers: { Authorization: `Bearer ${user.userInfo.token}` },
        }
      );
      console.log("Updated supplier:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: {
    suppliers: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.suppliers = payload;
      })
      .addCase(fetchSuppliers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addSupplier.fulfilled, (state, { payload }) => {
        state.suppliers.push(payload);
      })
      .addCase(deleteSupplier.fulfilled, (state, { payload }) => {
        state.suppliers = state.suppliers.filter(
          (supplier) => supplier.id !== payload
        );
      })
      .addCase(updateSupplier.fulfilled, (state, { payload }) => {
        const index = state.suppliers.findIndex(
          (supplier) => supplier.id === payload.id
        );
        if (index !== -1) {
          state.suppliers[index] = payload;
        }
      });
  },
});

export default suppliersSlice.reducer;
