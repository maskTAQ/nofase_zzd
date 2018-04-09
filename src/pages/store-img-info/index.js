import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { baseURL } from 'src/config';
import { WebView } from "src/components";

@connect(state => {
    const { newStoreInfo, auth: { AdminId } } = state;
    return { newStoreInfo, AdminId };
})
export default class StoreImgInfo extends Component {
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
                title="店铺认证信息"
                url={`${baseURL}/webview/store-img/index.html?params=${JSON.stringify(params)}&timestamp=${Date.now}`}
                ref={w => (this.webview = w)}

            />
        )
    }
}
