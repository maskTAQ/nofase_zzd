import { StackNavigator } from "react-navigation";

import { Home, Login } from "src/pages";

export const RouteConfigs = {
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  }
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
