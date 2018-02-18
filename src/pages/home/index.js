import React, { Component } from "react";
import { View, Text } from "react-native";
//import PropTypes from "prop-types";

import { Header, Button, Icon } from "src/components";
import styles from "./style";
export default class Home extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {};
  renderHeader() {
    return (
      <View style={styles.header}>
        <Header
          LeftComponent={<Button>分站端</Button>}
          RightComponent={
            <Button>
              <Icon size={20} source={require("./")} />
            </Button>
          }
          title="广东省-深圳市-南山区"
        />
        <Text />
      </View>
    );
  }
  render() {
    return <View style={styles.container}>{this.renderHeader()}</View>;
  }
}
