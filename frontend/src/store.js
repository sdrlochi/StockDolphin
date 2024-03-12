import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import { thunk } from "redux-thunk";

import { composeWithDevTools } from "@redux-devtools/extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from "./reducers/categoryReducer";

import {
  orderListReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderUpdateReducer,
} from "./reducers/orderReducer";

import { viewModeReducer } from "./reducers/viewReducer";
import { categoryDetailsReducer } from "./reducers/categoryDetailReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryList: categoryListReducer,
  categoryDetail: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  orderCreate: orderCreateReducer,
  listOrder: orderListReducer,
  orderUpdate: orderUpdateReducer,
  orderDelete: orderDeleteReducer,
  viewMode: viewModeReducer,
});

const userInfoFromStrage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo", "viewMode", "categoryList"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStrage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
