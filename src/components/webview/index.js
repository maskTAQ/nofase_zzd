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
    const { source, title,...others } = this.props;
     /* eslint-disable */
     const patchPostMessageFunction = function() {
      var originalPostMessage = window.postMessage;

      var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
      };

      patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace(
          "hasOwnProperty",
          "postMessage"
        );
      };

      window.postMessage = patchedPostMessage;
    };

    const patchPostMessageJsCode =
      "(" + String(patchPostMessageFunction) + ")();";

    return (
      <Page title={title}>
        <View style={{ flex: 1 }}>
          <WebView source={source} injectedJavaScript={patchPostMessageJsCode} {...others}/>
        </View>
      </Page>
    );
  }
}
