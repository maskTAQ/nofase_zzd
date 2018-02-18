import { StackNavigator } from "react-navigation";

import { Home, Login, HistoryConsume } from "src/pages";

export const RouteConfigs = {
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  },
  HistoryConsume: {
    screen: HistoryConsume
  }
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
