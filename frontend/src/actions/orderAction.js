import axios from "axios";
import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from "../constants/orderConstants";

export const listOrders = (categoryId) => async (dispatch, getState) => {
  try {
    dispatch({
      //in dispatch we are disparching the action CATEGORY_LIST_REQUEST, its going to send loading to true
      type: ORDER_LIST_REQUEST,
    });

    //fetching user info from the state with getState actions
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/categories/${categoryId}/orders`,
      config
    );

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};
