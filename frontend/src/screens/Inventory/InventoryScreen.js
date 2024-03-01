import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../actions/categoryAction";
import { useNavigate } from "react-router-dom";
import "../Inventory/InventoryScreen.css";
import Header from "../../componenets/header.js/Header";

const InventoryScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;

  //when you logout thorw us back to login screen
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: successCreate } = categoryCreate;

  // const noteUpdate = useSelector((state) => state.noteUpdate);
  // const { success: successUpdate } = noteUpdate;

  // const noteDelete = useSelector((state) => state.noteDelete);
  // const { success: successDelete } = noteDelete;

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     dispatch(deleteNoteAction(id));
  //   }
  // };

  console.log(category);

  const handleClick = () => {
    navigate("/item");
  };

  useEffect(() => {
    dispatch(listCategory());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    // successUpdate,
    // successDelete,
  ]);

  return (
    <div style={{display: 'flex', flexDirection: "row"}}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {category?.map((category) => (
          <div onClick={handleClick} className="box" key={category._id}>
            <h1 className="text">{category.name}</h1>
            <h3>{category.updatedAt}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryScreen;
