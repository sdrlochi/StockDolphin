import React from "react";
import { logout } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../componenets/header.js/Header";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const inventoryScreen = () => {
    navigate("/inventory");
  };

  return (
    <div style={{ display: "flex", margin: 0 }}>
      <Header />

      <div>
        <h1>Welocme</h1>
        <button onClick={logoutHandler}>Logout</button>
        <button onClick={inventoryScreen}>Inventory</button>
      </div>
    </div>
  );
};

export default Dashboard;
