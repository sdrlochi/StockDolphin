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
} from "../constants/categoryConstants";

const initialState = {
  loading: false, // Indicates whether the category creation process is ongoing
  categoryInfo: null, // Holds the created category data on successful creation
  error: null, // Holds any error message in case of failure
};

//reducers: first you send request if it is true then it gives you CATEGORY if fails gives you error
export const categoryListReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//2.category create reducer (createcategory)
export const categoryCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { ...state, loading: true, error: null };
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, categoryInfo: action.payload, error: null };
    case CATEGORY_CREATE_FAIL:
      return { loading: false, categoryInfo: null, error: action.payload };
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
