import React, { Component } from "react";
//import {  Alert } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { baseURL } from 'src/config';
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
        AdminId: PropTypes.number,
    };
    state = {

    };
    render() {
        const { AdminId, newStoreInfo } = this.props;
        const { StoreId } = newStoreInfo.base;
        const params = {
            AdminId,
            StoreId,
            url: `${baseURL}/Store/EditStore`
        };
        return (
            <WebView
                title="店铺图库"
                url={`${baseURL}/webview/img-store/index.html?params=${JSON.stringify(params)}&timestamp=${Date.now}`}
                ref={w => (this.webview = w)}

            />
        )
    }
}
