import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";

import store from "./store/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import styled from "styled-components";
import Header from "./components/Header";
import Inventory from "./pages/Inventory";
import Items from "./pages/Items";
import Suppliers from "./pages/Suppliers";
import Orders from "./pages/Orders/Orders";
// import Reports from './pages/Reports';

const MainContent = styled.div`
  background-color: #eaeaea;
  width: 100%;
  height: 100%;
  max-width: 1980px;
  max-height: 1080px;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
`;

const AppWrapper = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Router>
      {userInfo ? (
        <MainContent>
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/suppliers" element={<Suppliers />} />
            {/* <Route path="/reports" element={<Reports />} /> */}
            <Route path="/items/:categoryId" element={<Items />} />
            <Route path="/orders/:itemId" element={<Orders />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </MainContent>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

const App = () => (
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

export default App;
