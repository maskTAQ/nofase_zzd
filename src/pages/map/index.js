import React, { Component } from "react";
//import {  Alert } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {baseURL} from 'src/config';
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
            url:`${baseURL}/Store/EditStore`
        };
        return (
            <WebView
                title="选择位置"
                url={`http://101.200.196.202:8888/html/html/html/map.html?params=${JSON.stringify(params)}`}
                ref={w => (this.webview = w)}

            />
        )
    }
}
