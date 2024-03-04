import React, { useState } from "react";
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../componenets/header.js/Header";
import { createCategoryAction } from "../../actions/categoryAction";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { error } = categoryCreate;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const inventoryScreen = () => {
    navigate("/inventory");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createCategoryAction(name, imageBase64));
  };

  return (
    <div style={{ display: "flex", margin: 0 }}>
      <Header />

      <div>
        <h1>Welocme</h1>
        <button onClick={logoutHandler}>Logout</button>
        <button onClick={inventoryScreen}>Inventory</button>
         <div>
      <h2>Create Category</h2>

      {error && <p>Error: {error}</p>}
     
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setImageBase64(reader.result);
              };
              if (file) {
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
      </div>
    </div>
  );
};

export default Dashboard;
