import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../slices/userSlice";
import styled from "styled-components";

const Sidebar = styled.div`
  width: 350px;
  height: 100vh;
  background-color: #53a856;
  color: white;
  display: flex;
  text-align: center;

  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledNavLink = styled(NavLink)`
  width: 280px;
  height: 60px;
  background-color: #efefef;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;

  &.active {
    background-color: #555;
  }

  &:hover {
    background-color: #555;
  }
`;

const LogoutButton = styled.button`
  padding: 20px;
  color: white;
  background-color: #333;
  border: none;

  &:hover {
    background-color: #555;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Sidebar>
      <StyledNavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <p
          style={{
            color: "black",
            marginLeft: "20px",
            fontSize: "26px",
            fontWeight: 400,
          }}
        >
          Dashboard
        </p>
      </StyledNavLink>
      <StyledNavLink
        to="/inventory"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <p
          style={{
            color: "black",
            marginLeft: "20px",
            fontSize: "26px",
            fontWeight: 400,
          }}
        >
          Inventory
        </p>
      </StyledNavLink>
      <StyledNavLink
        to="/suppliers"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <p
          style={{
            color: "black",
            marginLeft: "20px",
            fontSize: "26px",
            fontWeight: 400,
          }}
        >
          Suppliers
        </p>
      </StyledNavLink>
      <StyledNavLink
        style={{
          color: "black",

          fontSize: "26px",
          fontWeight: 400,
        }}
        to="/reports"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Reports
      </StyledNavLink>
      <LogoutButton
        onClick={handleLogout}
        style={{
          width: "280px",
          height: "60px",
          backgroundColor: "#EFEFEF",
          borderRadius: "10px",
        }}
      >
        Logout
      </LogoutButton>
    </Sidebar>
  );
};

export default Header;
