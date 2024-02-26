import React from "react";
import { logout } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Welocme</h1>
      <button onClick={logoutHandler}>Logout</button>
      <button onClick={inventoryScreen}>Inventory</button>
    </div>
  );
};

export default Dashboard;
