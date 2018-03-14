import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import AppNavigator from "src/Navigation";
import AppReducer from 'src/reducers';
import { CreateReduxField } from "src/common";

const initialNav = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Login")
);

const initStore = {
  nav: initialNav,
  auth: {
    isLogin: false,
    AdminId: '',
    AdminLevel: ''
  },
  newStoreInfo: {
    base: {
      
    },
    bank: {},
    hour: {},
    deviceManage: {},
    timetable: [],
    StoreRemarks: ''
  },
  ...CreateReduxField().store()
};

const asyncDispetch = store => next => action => {
  const { type, api, promise } = action;
  if (promise) {
    next({ type, status: 'loading' });
    return api()
      .then(res => {
        store.dispatch({ type, status: 'success', payload: res });
        return Promise.resolve(res);
      })
      .catch(e => {
        store.dispatch({ type, status: 'error', errData: e });
        return Promise.resolve(e);
      })
  }
  return next(action);
}
export default createStore(AppReducer, initStore, applyMiddleware(
  thunk,
  asyncDispetch
));
