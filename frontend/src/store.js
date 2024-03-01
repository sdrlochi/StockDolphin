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

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryList: categoryListReducer,
  categoryUpdate: categoryUpdateReducer,
  orderCreate: orderCreateReducer,
  orderList: orderListReducer,
  orderUpdate: orderUpdateReducer,
  orderDelete: orderDeleteReducer,
});

const userInfoFromStrage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
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
