import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../Item/OrdersScreen.css";
import { getCategoryDetails } from "../../actions/categoryAction";
import Header from "../../componenets/header/Header";
import ModalComponent from "../../componenets/modal/modalComponent";
import AddNew from "../../assets/AddNew.svg";

const ItemScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id: categoryId } = useParams();
  const dispatch = useDispatch();

  const categoryDetailList = useSelector((state) => state.categoryDetail);

  const { category } = categoryDetailList;

  // const categoryCreate = useSelector((state) => state.categoryCreate);
  // const { success: successCreate } = categoryCreate;

  // const noteUpdate = useSelector((state) => state.noteUpdate);
  // const { success: successUpdate } = noteUpdate;

  // const noteDelete = useSelector((state) => state.noteDelete);
  // const { success: successDelete } = noteDelete;

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     dispatch(deleteNoteAction(id));
  //   }
  // };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  console.log(category);

  // const handleClick = () => {
  //   navigate("/item");
  // };

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryDetails(categoryId));
    }
  }, [dispatch, categoryId]);

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
        <div className="orders-container">
          {category &&
            category.orders?.map((category) => (
              <Link
                to={`/categories/${category._id}`}
                style={{ textDecoration: "none" }}
              >
                <li className="containerDiv" key={category._id}>
                  <img src={category.image} alt="img" />
                  <p className="header">{category.name}</p>
                  <p className="item">3 Items | € 338.00</p>
                  <p className="updatedHeader">Updated At:</p>
                  <p className="updatedAt">{category.updatedAt}</p>
                </li>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ItemScreen;
