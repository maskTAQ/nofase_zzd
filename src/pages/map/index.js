import React, { Component } from "react";
import { WebView,View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Page } from 'src/components';
import { baseURL } from 'src/config';

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
            url: `${baseURL}/Store/EditStore`
        };
        return (
            <Page title="选择位置">
                <View style={{ flex: 1 }}>
                    <WebView source={{ uri: `${baseURL}/webview/map.html?params=${JSON.stringify(params)}&timestamp=${Date.now}` }} />
                </View>
            </Page>
        )
    }
}
