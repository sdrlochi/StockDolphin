import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCategories,
  addCategory,
  deleteCategory,
} from "../slices/categoriesSlice";
import styled from "styled-components";
import AddCategoryModal from "../components/AddCategoryModal";
import Search from "../assets/Search.png";
import { HeadTitle } from "../components/HeadTitle";
import { Add } from "../components/Add";
import { fetchDashboardData } from "../slices/dashboardSlice";
import ControlPanel from "../assets/ControlPanel.png";
import List from "../assets/List.png";

const Container = styled.div`
  margin-left: 330px;
`;

const SearchBarContainer = styled.div`
  width: 310px;
  height: 50px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  background: #d9d9d9;
  border-radius: 10px;
`;

const SearchBar = styled.input`
  width: 177px;
  height: 27px;
  border: none;
  outline: none;
  background: #d9d9d9;

  &::placeholder {
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0.03em;
    text-align: left;
    color: #000000;
  }

  @media only screen and (max-width: 768px) {
    &::placeholder {
      font-size: 10px;
    }
  }
`;

const SearchAddMain = styled.div`
  width: 100%;
  max-width: 1470px;
  height: 100px;
  margin-left: 75px;
  display: flex;
  justify-content: space-between;
`;

const SearchIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: 0 10px;
`;

const AddButton = styled.button`
  padding: 5px 10px;
  width: 230px;
  height: 60px;
  background-color: #53a856;
  border-radius: 10px;
  margin-top: 30px;
  border: none;
  margin-right: 80px;
`;

const CategoriesContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 140px;
`;

const CategoryCard = styled.div`
  background-color: white;
  width: 240px;
  height: 270px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const InventorySummaryContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 890px;
  max-height: 39px;
  margin-left: 140px;
  display: flex;
`;

const ItemShow = styled.div`
  width: 100%;
  height: 100%;
  max-width: 90px;
  max-height: 77px;
`;

const InventorySummaryMain = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1470px;
  max-height: 100px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CategoryDetails = styled.div``;

const Actions = styled.div``;

const Inventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCards, setShowCards] = useState(true);
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const { data: dashboardData } = useSelector((state) => state.dashboard);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = (category) => {
    dispatch(addCategory(category));
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  const handleCardClick = (categoryId) => {
    navigate(`/items/${categoryId}`);
  };

  const handleShowCards = () => {
    setShowCards(true);
  };

  const handleShowList = () => {
    setShowCards(false);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <HeadTitle headerTitle={"Inventory"} />
      <SearchAddMain>
        <SearchBarContainer>
          <SearchIcon src={Search} alt="search icon" />
          <SearchBar
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBarContainer>

        <button
          onClick={() => {
            setAddModalOpen(true);
          }}
        >
          <Add addText={"ADD CATEGORY"} />
        </button>
      </SearchAddMain>
      <InventorySummaryMain>
        <InventorySummaryContainer>
          <p>
            Categories: &nbsp;<strong>{dashboardData.categoriesCount}</strong>
          </p>
          <p>
            Items: &nbsp;<strong>{dashboardData.itemsCount}</strong>
          </p>
          <p>
            Total Orders: &nbsp;<strong>{dashboardData.ordersCount}</strong>
          </p>
          {/* <p>
          Total Cost: &nbsp;<strong>€{totalCost}</strong>
        </p> */}

          <ItemShow>
            <button onClick={handleShowCards}>
              <img src={ControlPanel} alt="Control Panel" />
            </button>
            <button onClick={handleShowList}>
              <img src={List} alt="list" />
            </button>
          </ItemShow>
        </InventorySummaryContainer>
      </InventorySummaryMain>

      <CategoriesContainer>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.name}
            onClick={() => handleCardClick(category._id)}
          >
            <CategoryImage src={category.image} alt={category.name} />
            <CategoryDetails>
              <h4
                style={{
                  color: "#3E4153",
                  fontSize: "20px",
                  marginTop: "10px",
                  marginLeft: "20px",
                  marginBottom: 0,
                }}
              >
                {category.name}
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  marginLeft: "20px",
                  marginBottom: 0,
                }}
              >
                Items: {category.itemCount}
              </p>
            </CategoryDetails>
            <Actions>
              <p style={{ marginLeft: "20px" }}>Updated at: </p>
              <p>{new Date(category.createdAt).toLocaleDateString()}</p>
            </Actions>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCategory(category.id);
              }}
            >
              Delete
            </button>
          </CategoryCard>
        ))}
      </CategoriesContainer>
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setAddModalOpen(false)}
        onAddCategory={handleAddCategory}
      />
    </Container>
  );
};

export default Inventory;
