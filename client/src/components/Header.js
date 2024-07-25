import "./Header.css";
import React from "react";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import Logo from "../assets/logo1.png";
import DashboardLayout from "../assets/DashboardLayout.png";
import ProductLayout from "../assets/ProductLayout.png";
import ComboChart from "../assets/ComboChart.png";
import Logout from "../assets/Shutdown.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div className="menu-panel">
        <Link to="/dashboard">
          <img className="logo" src={Logo} alt="logoItLabs" />
        </Link>
        <div className="sidebar-navigation">
          <NavLink className="dashboard-link" to="/dashboard">
            <img
              className="dashboard-img"
              src={DashboardLayout}
              alt="dashboard-layout"
            />
            <h1>Dashboard</h1>
          </NavLink>
          <NavLink className="items-nav-link" to="/inventory">
            <img className="product" src={ProductLayout} alt="product" />
            <h1>Inventory</h1>
          </NavLink>
          <NavLink className="reports-link" to="/reports">
            <img className="combo-chart" src={ComboChart} alt="combo-chart" />
            <h1>Reports</h1>
          </NavLink>
          <NavLink className="suppliers-link" to="/suppliers">
            <h1>Suppliers</h1>
          </NavLink>
          <NavLink className="signout" to="/" onClick={handleLogout}>
            <img className="shutdown" src={Logout} alt="shutdown" />
            <h1>Sign Out</h1>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Header;
