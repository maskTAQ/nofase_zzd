import React, { Component } from "react";
//import {  Alert } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import action from "src/action";
import { WebView } from "src/components";

@connect(state => {
    const { newStoreInfo } = state;
    return { newStoreInfo };
  })
export default class Map extends Component {
    static defaultProps = {

    };
    static propTypes = {
        navigation: PropTypes.object,
        newStoreInfo: PropTypes.object,
    };
    state = {

    };
    render() {
        return (
            <WebView
                title="选择位置"
                source={require('./html/index.html')}
                ref={w => (this.webview = w)}
                onMessage={e => {
                    const data = JSON.parse(e.nativeEvent.data);
                    this.props.navigation.dispatch(
                        action.editStoreInfo({
                            map:data
                        })
                      )
                      return this.props.navigation.dispatch(
                        action.navigate.back()
                      );
                }}
            />
        )
    }
}
