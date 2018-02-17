import { combineReducers } from "redux";

import nav from "./nav";

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
  auth: auth,
  nav: nav,
});
export default appReducer;
