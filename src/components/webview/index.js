import React, { Component } from "react";
import { View, WebView } from "react-native";
import PropTypes from "prop-types";

import { Page } from "src/components";
//import styles from "./style";
export default class Wv extends Component {
  static defaultProps = {};
  static propTypes = {
    source: PropTypes.number,
    title: PropTypes.string
  };
  state = {};
  render() {
    const { source, title } = this.props;
    return (
      <Page title={title}>
        <View style={{ flex: 1 }}>
          <WebView source={source} />
        </View>
      </Page>
    );
  }
}
