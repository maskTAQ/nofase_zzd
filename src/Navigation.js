import { StackNavigator } from "react-navigation";

import { 
  Home, Login, HistoryConsume, StoreAdd,SubAdmin ,
  BusinessHours,DeviceManage,Timetable,StoreAuth,
  Map,BindBank,Introduce,ImgStore,StoreBaseInfo,
  StoreImgInfo,P} from "src/pages";

export const RouteConfigs = {
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  },
  HistoryConsume: {
    screen: HistoryConsume
  },
  StoreAdd: {
    screen: StoreAdd
  },
  SubAdmin:{
    screen:SubAdmin
  },
  BusinessHours:{
    screen:BusinessHours
  },
  DeviceManage:{
    screen:DeviceManage
  },
  Timetable:{
    screen:Timetable
  },
  StoreAuth:{
    screen:StoreAuth
  },
  Map:{
    screen:Map
  },
  BindBank:{
    screen:BindBank
  },
  Introduce:{
    screen:Introduce
  },
  ImgStore:{
    screen:ImgStore
  },
  StoreBaseInfo:{
    screen:StoreBaseInfo
  },
  StoreImgInfo:{
    screen:StoreImgInfo
  },
  P:{
    screen:P
  }
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
