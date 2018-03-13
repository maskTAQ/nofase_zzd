import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import api from 'src/api';
import action from "src/action";
import { WebView } from "src/components";

@connect(state => {
    const { newStoreInfo } = state;
    return { newStoreInfo };
})
export default class StoreAuth extends Component {
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
                title="店铺认证信息"
                url='http://192.168.0.102:5500/index.html'
                ref={w => (this.webview = w)}
               
            />
        )
    }
}
