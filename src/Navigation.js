import { StackNavigator } from "react-navigation";

import {
  Login,
  
} from "src/pages";

export const RouteConfigs = {
  Login: {
    screen: Login
  },
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
