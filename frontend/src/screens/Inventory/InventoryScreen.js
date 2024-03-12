import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../actions/categoryAction";
import { Link, useNavigate } from "react-router-dom";
import "../Inventory/InventoryScreen.css";
import Header from "../../componenets/header/Header";
import ModalComponent from "../../componenets/modal/modalComponent";
import AddNew from "../../assets/AddNew.svg";
import { useParams } from "react-router-dom";

const InventoryScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  const [visibleItems, setVisibleItems] = useState(30); // Start with 10 items

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

  console.log(category);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      dispatch(listCategory(categoryId));
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    categoryId,
    // successUpdate,
    // successDelete,
  ]);

  // Handler to load more items
  const loadMoreItems = () => {
    setVisibleItems((prevItems) => prevItems + 4); // Load 10 more items each time
  };

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadMoreItems(); // Load more items when the user scrolls to the bottom
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            category.slice(0, visibleItems).map((category) => (
              <Link
                to={`/categories/${category._id}`}
                style={{ textDecoration: "none" }}
              >
                <li className="containerDiv" key={categoryId}>
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

export default InventoryScreen;
