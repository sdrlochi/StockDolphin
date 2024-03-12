import axios from "axios";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_DETAIL_FAIL,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
} from "../constants/categoryConstants";

export const listCategory = () => async (dispatch, getState) => {
  try {
    dispatch({
      //in dispatch we are disparching the action CATEGORY_LIST_REQUEST, its going to send loading to true
      type: CATEGORY_LIST_REQUEST,
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
      `http://localhost:5000/api/categories/`,
      config
    );
    localStorage.setItem("categoryList", JSON.stringify(data));
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: message,
    });
  }
};

export const getCategoryDetails =
  (categoryId) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_DETAIL_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/categories/${categoryId}`, config);
      dispatch({
        type: CATEGORY_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//4. action for creating note

export const createCategoryAction =
  (name, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CATEGORY_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          //for what type of contetn we are sending the data.. JSON file
          "Content-Type": "application/json",
          //authorization we make with bearer token
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      //we are making api call from /api/CATEGORY/create, we are sending title, conent, category that we recived from the user to the backend then we are passing config object wich created on line 60.
      const { data } = await axios.post(
        `http://localhost:5000/api/categories/`,
        { name, image },
        config
      );

      //in this area if const {data} is succes if it doesnt fail it going to fire of CATEGORY CREATE SUCCESS its going to pass data to payload
      dispatch({
        type: CATEGORY_CREATE_SUCCESS,
        payload: data,
      });

      //otherwise its goint to throw a error
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CATEGORY_CREATE_FAIL,
        payload: message,
      });
    }
  }; //then we are goingt to create route for createNote in App.js

export const updateCategoryAction =
  (id, name) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CATEGORY_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/categories/${id}`,
        { name },
        config
      );

      dispatch({
        type: CATEGORY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CATEGORY_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:5000/api/categories/${id}`,
      config
    );

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};
