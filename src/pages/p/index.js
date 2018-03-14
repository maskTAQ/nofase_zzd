import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import api from 'src/api';
import { Page, Button } from "src/components";
//import styles from "./style";

@connect(state => state)
export default class P extends Component {
    static defaultProps = {

    };
    static propTypes = {
        dispatch: PropTypes.func,
        auth: PropTypes.object
    };
    state = {

    };
    send = () => {
        //发送一个异步dispatch
        this.props.dispatch(
            {
                type: 'LOGIN',
                api: () => {
                    return api.login({ Tel: '136965s26122', ExCode: '213' })
                },
                promise: true
            }
        )
            .then(res => {
                console.log('res:resolve', res);
            })
            .catch(e => {
                console.log('e:reject', e);
            })

    }
    render() {
        console.log(this.props.auth, 'render');
        return (
            <Page title="demo">
                <View>
                    <Button onPress={this.send}>send</Button>
                </View>
            </Page>
        )
    }
}
