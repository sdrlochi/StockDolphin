import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import dashboardReducer from "../slices/dashboardSlice";
import suppliersReducer from "../slices/suppliersSlice";
import categoriesReducer from "../slices/categoriesSlice";
import itemsReducer from "../slices/itemsSlice";
import orderReducer from "../slices/ordersSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    suppliers: suppliersReducer,
    categories: categoriesReducer,
    items: itemsReducer,
    orders: orderReducer,
  },
});

export default store;
