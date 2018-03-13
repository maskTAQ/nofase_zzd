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
    main:null,
    base:null,
    img:null,
    bank:null,
    map:null,
    hour:null,
    deviceAdmin:null,
    timetable:null,
    ImgJson:null,//商家图库
    StoreRemarks:''
  },
  ...CreateReduxField().store()
};
