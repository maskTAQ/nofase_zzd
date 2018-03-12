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
export default class ImgStore extends Component {
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
                title="店铺图库"
                source={require('./html/index.html')}
                ref={w => (this.webview = w)}
                onMessage={e => {
                    const data = JSON.parse(e.nativeEvent.data);
                    this.props.navigation.dispatch(
                        action.editStoreInfo({
                            ImgJson:data
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
