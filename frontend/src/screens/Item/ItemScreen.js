import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../Item/OrdersScreen.css";
import { listOrders } from "../../actions/orderAction";

const ItemScreen = ({ categoryId }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.listOrder);
  const { order } = orderList;

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

  console.log(order);

  // const handleClick = () => {
  //   navigate("/item");
  // };

  useEffect(() => {
    if (categoryId) {
      dispatch(listOrders(categoryId));
    }
  }, [dispatch, categoryId]);

  return (
    <div>
      {order && order.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {order.map((order) => (
            <div className="box" key={order._id}>
              <h1 className="text">{order.name}</h1>
              <h3>{order.orderedAt}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No product</p>
      )}
    </div>
  );
};

export default ItemScreen;
