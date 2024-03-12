import React from "react";
import "./header.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import inventory from "../../assets/inventory.svg";
import logo from "../../assets/logo1.svg";
import signout from "../../assets/signout.svg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const inventoryScreen = () => {
    navigate("/categories");
  };

  const dashboardScreen = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <img onClick={dashboardScreen} alt="logo" src={logo} />
      <div className="clickable" onClick={inventoryScreen}>
        <img style={{ marginLeft: "15px" }} alt="ico" src={inventory} />
        <h4
          style={{
            color: "black",
            marginLeft: "20px",
            fontSize: "26px",
            fontWeight: 400,
          }}
        >
          Inventory
        </h4>
      </div>
      <div className="clickable" onClick={logoutHandler}>
        <img
          style={{ marginLeft: "15px", width: 40, height: 40 }}
          alt="ico"
          src={signout}
        />
        <h4
          style={{
            color: "black",
            marginLeft: "20px",
            fontSize: "26px",
            fontWeight: 400,
          }}
        >
          Sign Out
        </h4>
      </div>
    </div>
  );
};

export default Header;
