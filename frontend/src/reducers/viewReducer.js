import { SET_VIEW_MODE } from "../constants/viewConstant";

const initialState = {
  viewMode: "grid", // default view mode
};

export const viewModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload,
      };
    default:
      return state;
  }
};
