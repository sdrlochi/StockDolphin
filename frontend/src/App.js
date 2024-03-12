// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Dashboard from "./screens/Dashboard/Dashboard";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import InventoryScreen from "./screens/Inventory/InventoryScreen";
import ItemScreen from "./screens/Item/ItemScreen";

function App() {
  // const [search, setSearch] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginScreen} exact />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/register" Component={RegisterScreen} />
        <Route path="/categories" Component={InventoryScreen} />
        <Route path="/categories/:id" Component={ItemScreen} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
