import { SET_VIEW_MODE } from "../constants/viewConstant";

// This function toggles the view mode and saves the preference
export const toggleViewMode = () => (dispatch, getState) => {
  // Get the current view mode from the Redux state
  const currentMode = getState().viewMode;
  const newMode = currentMode === "grid" ? "list" : "grid";

  // Update localStorage with the new mode
  localStorage.setItem("viewMode", newMode);

  // Dispatch the action to update the Redux state
  dispatch({
    type: SET_VIEW_MODE,
    payload: newMode,
  });
};
