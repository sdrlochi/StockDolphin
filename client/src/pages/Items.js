import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchItemsByCategory } from "../slices/itemsSlice";
import styled from "styled-components";

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

const ItemsContainer = styled.div`
  background-color: grey;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ItemCard = styled.div`
  background-color: white;
  padding: 10px;
  width: 288px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;



const Items = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  console.log(categoryId);
  const { items, loading, error } = useSelector((state) => state.items);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchItemsByCategory(categoryId));
    }
  }, [dispatch, categoryId]);

  const handleCardClick = (itemId) => {
    navigate(`/orders/${itemId}`);
  };

  return (
    <Container>
      <Title>Items</Title>
      <Line />
      <ItemsContainer>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message || error}</p>}
        {!loading && !error && items.length === 0 && <p>No items found</p>}
        {items.map((item) => (
          <ItemCard key={item._id} onClick={() => handleCardClick(item._id)}>
            <ItemImage src={item.image} alt={item.name} />
            <ItemDetails>
              <h4>{item.name}</h4>
              <p>Orders: {item.orderCount || 0}</p>
              <p>Total Orders: {item.totalOrders || 0}</p>
              <p>Total Price: ${item.totalPrice || 0}</p>
            </ItemDetails>
            <Actions>
              <p>{new Date(item.createdAt).toLocaleDateString()}</p>
            </Actions>
          </ItemCard>
        ))}
      </ItemsContainer>
    </Container>
  );
};

export default Items;
