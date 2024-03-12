import {
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL_FAIL,
} from "../constants/categoryConstants";

const initialState = {
  categoires: { orders: [] },
  loading: false,
  error: null,
};

export const categoryDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_DETAIL_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_DETAIL_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
