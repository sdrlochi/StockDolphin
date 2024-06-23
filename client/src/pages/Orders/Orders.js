import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrdersByItem } from "../../slices/ordersSlice";
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

const Orders = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchOrdersByItem(itemId));
    }
  }, [dispatch, itemId]);

  

  return (
    <Container>
      <Title>Items</Title>
      <Line />
      <ItemsContainer>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message || error}</p>}
        {!loading && !error && orders.length === 0 && <p>No Orders found</p>}
        {orders.map((order) => (
          <ItemCard key={order._id}>
          
            <ItemDetails>
              <h4>{order.name}</h4>
              <p>supplier: {order.suppliers}</p>
              <p>Total Orders: {order.quantity || 0}</p>
              <p>Total Price: ${order.totalPrice || 0}</p>
            </ItemDetails>
            <Actions>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            </Actions>
          </ItemCard>
        ))}
      </ItemsContainer>
    </Container>
  );
};

export default Orders;
