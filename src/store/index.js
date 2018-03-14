import AppNavigator from "src/Navigation";

import { CreateReduxField } from "src/common";

const initialNav = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Login")
);

export default {
  nav: initialNav,
  auth: {
    isLogin: false,
    AdminId: '',
    AdminLevel:''
  },
  newStoreInfo:{
    base:{},
    bank:{},
    hour:{},
    deviceAdmin:{},
    timetable:[],
    StoreRemarks:''
  },
  ...CreateReduxField().store()
};
