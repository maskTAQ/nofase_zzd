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
                source={require('./html/index.html')}
                ref={w => (this.webview = w)}
                onMessage={e => {
                    const data = JSON.parse(e.nativeEvent.data);
                    for (const item in data) {
                        if (!data[item])
                            return Alert.alert(
                                '提示',
                                '请完整填写信息',
                                [
                                    { text: '确定', onPress: () => console.log('OK Pressed!') },
                                ]
                            )
                    }
                    return api.addStore(data)
                        .then(res => {
                            console.log(data,res,999);
                            this.props.navigation.dispatch(
                                action.editStoreInfo({
                                    authentication: data
                                })
                            )
                            return this.props.navigation.dispatch(
                                action.navigate.back()
                            );
                        })

                }}
            />
        )
    }
}
