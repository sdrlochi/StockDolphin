import React, { useEffect, useState } from "react";
import "./LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

import { useNavigate } from "react-router-dom";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div className="loginContainer">
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#9cdb9e",
          padding: "50px",
          borderRadius: "10px",
        }}
      >
        <h2>Login</h2>
        <div className="input-container">
          <input
            className="custom-input"
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            className="custom-input"
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="custom-button" type="submit">
          Login
        </button>
        <button className="custom-button" onClick={handleClick}>
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
