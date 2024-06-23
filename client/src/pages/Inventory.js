import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, addCategory, deleteCategory } from '../slices/categoriesSlice';
import styled from 'styled-components';
import AddCategoryModal from '../components/AddCategoryModal';

const Container = styled.div`
  margin-left: 10px;
`;

const Title = styled.h3`
  margin-left: 10px;
`;

const Line = styled.div`
  margin: 5px 10px 0 10px;
  border-bottom: 1px solid black;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 0 10px;
`;

const SearchBar = styled.input`
  padding: 5px;
  width: 200px;
`;

const AddButton = styled.button`
  padding: 5px 10px;
`;

const CategoriesContainer = styled.div`
  background-color: grey;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CategoryCard = styled.div`
  background-color: white;
  padding: 10px;
  width: 288px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const CategoryDetails = styled.div`
  flex-grow: 1;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Inventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const [search, setSearch] = useState('');
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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Title>Categories</Title>
      <Line />
      <SearchBarContainer>
        <SearchBar
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddButton onClick={() => setAddModalOpen(true)}>Create Category</AddButton>
      </SearchBarContainer>
      <CategoriesContainer>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {filteredCategories.map((category) => (
          <CategoryCard key={category.name} onClick={() => handleCardClick(category._id)}>
            <CategoryImage src={category.image} alt={category.name} />
            <CategoryDetails>
              <h4>{category.name}</h4>
              <p>Items: {category.itemCount}</p>
              <p>Total Price: ${category.totalPrice}</p>
            </CategoryDetails>
            <Actions>
              <p>{new Date(category.createdAt).toLocaleDateString()}</p>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category.id); }}>Delete</button>
            </Actions>
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
