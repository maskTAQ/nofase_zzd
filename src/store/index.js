import AppNavigator from "src/Navigation";

import { CreateReduxField } from "src/common";

const initialNav = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("StoreAdd")
);

export default {
  nav: initialNav,
  auth: {
    isLogin: false,
    AdminId: '',
    AdminLevel:''
  },
  newStoreInfo:{
    main:null,
    authentication:null,
    bank:null,
    map:null,
    hour:null,
    deviceAdmin:null,
    timetable:null
  },
  ...CreateReduxField().store()
};
