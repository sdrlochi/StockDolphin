import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import "./registerScreen.css";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else dispatch(register(name, email, password));
  };

  return (
    <div className="loginContainer">
      {message && console.log({ message })}
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
        <input
          className="custom-input"
          type="name"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="custom-input"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="custom-input"
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="custom-input"
          type="password"
          value={confirmpassword}
          placeholder="Confirm Pass"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="custom-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterScreen;
