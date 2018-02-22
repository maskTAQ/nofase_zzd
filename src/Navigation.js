import { StackNavigator } from "react-navigation";

import { Home, Login, HistoryConsume, StoreAdd } from "src/pages";

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
  }
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
