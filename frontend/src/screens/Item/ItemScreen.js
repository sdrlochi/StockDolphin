import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import "../Item/OrdersScreen.css";
import { listOrder } from "../../actions/orderAction";

const ItemScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { order } = orderList;

  //when you logout thorw us back to login screen
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    dispatch(listOrder());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    // successCreate,
    navigate,
    userInfo,
    // successUpdate,
    // successDelete,
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {order?.map((order) => (
        <div className="box" key={order._id}>
          <h1 className="text">{order.name}</h1>
          <h3>{order.orderedAt}</h3>
        </div>
      ))}
    </div>
  );
};

export default ItemScreen;
