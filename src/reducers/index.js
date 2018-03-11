import { combineReducers } from "redux";

import actionMap from "src/action";
import nav from "./nav";
import { CreateReduxField } from "src/common";
function auth(state = {}, action) {
  const { type } = action;
  switch (type) {
    case "Login":
      return { ...state, isLogin: true };
    case "Logout":
      return { ...state, isLogin: false };
    default:
      return state;
  }
}
const appReducer = combineReducers({
  auth:(state={}, action) => {
    const { type, payload } = action;
    if (type === actionMap.LOGIN) {
      return { ...state, isLogin: true,...payload};
    }
    return state;
  },
  nav: nav,
  newStoreInfo: (state={}, action) => {
    const { type, payload } = action;
    if (type === actionMap.EDIT_STORE_INFO) {
      return { ...state, ...payload }
    }
    return state;
  },
  ...CreateReduxField().reducers()
});
export default appReducer;
