import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../actions/categoryAction";
import { useNavigate } from "react-router-dom";
import "../Inventory/InventoryScreen.css";
import Header from "../../componenets/header/Header";
import ModalComponent from "../../componenets/modal/modalComponent";
import AddNew from "../../assets/AddNew.svg";

const InventoryScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [name, setName] = useState();
  // const [images, serImages] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;

  //when you logout thorw us back to login screen
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: successCreate } = categoryCreate;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    navigate("/item");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      dispatch(listCategory());
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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "blue",
      }}
    >
      <Header />
      <div className="secondContainerDiv">
        <p className="pageHeader">Inventory</p>
        <div className="line" />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: 80,
            marginTop: 10,
          }}
        >
          <button className="categoryButton" onClick={handleOpenModal}>
            <div className="rectangle">
              <img alt="icon" src={AddNew} />
            </div>

            <p className="buttonText">ADD CATEGORY</p>
          </button>
          <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
        <div className="mainCardDiv">
          {category?.map((category) => (
            <div
              className="containerDiv"
              key={category._id}
              onClick={() => handleClick(category._id)}
            >
              <img src={category.image} alt="img" />
              <p className="header">{category.name}</p>
              <p className="item">3 Items | € 338.00</p>
              <p className="updatedHeader">Updated At:</p>
              <p className="updatedAt">{category.updatedAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryScreen;
