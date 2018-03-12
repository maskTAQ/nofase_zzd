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
                url='http://101.200.196.202:8888/html/store/html/index.html'
                ref={w => (this.webview = w)}
               
            />
        )
    }
}
