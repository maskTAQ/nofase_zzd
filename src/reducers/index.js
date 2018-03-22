import { combineReducers } from "redux";

import actionMap from "src/action";
import nav from "./nav";
import { CreateReduxField } from "src/common";

const appReducer = combineReducers({
  auth: (state = {}, action) => {
    const { type, payload } = action;
    if (type === actionMap.LOGIN) {
      return { ...state, isLogin: true, ...payload };
    }
    return state;
  },
  nav: nav,
  newStoreInfo: (state = {}, action) => {
    const { type, payload } = action;
    if (type === actionMap.EDIT_STORE_INFO) {
      return { ...state, ...payload }
    }
    if (type === actionMap.RESET_STORE_INFO) {

      return {
        base: {},
        bank: {},
        hour: {},
        deviceManage: {},
        timetable: [],
        StoreRemarks: ''
      }
    }
    return state;
  },
  ...CreateReduxField().reducers()
});
export default appReducer;
