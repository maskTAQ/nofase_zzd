import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import action from "src/action";
import { Page, Button } from "src/components";
import styles from "./style";

@connect(state => {
    const { newStoreInfo } = state;
    return { newStoreInfo };
  })
export default class Introduce extends Component {
    static defaultProps = {

    };
    static propTypes = {
        navigation: PropTypes.object,
        newStoreInfo: PropTypes.object,
    };
    state = {
        value: '',
    };
    componentWillMount() {
        this.setState({
            value:this.props.newStoreInfo.StoreRemarks
        });
    }
    onChangeText = (v) => {
        this.setState({
            value: v
        });
    }
    save = () => {
        this.props.navigation.dispatch(
            action.editStoreInfo({
                StoreRemarks: this.state.value
            })
        )
        return this.props.navigation.dispatch(
            action.navigate.back()
        );
    }
    render() {
        const { value } = this.state;
        return (
            <Page
                title="编辑介绍/留言"
                RightComponent={(<Button onPress={this.save} textStyle={styles.saveLabel}>保存</Button>)}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.area}
                        value={value}
                        onChangeText={this.onChangeText}
                        autoFocus={true}
                        maxLength={500}
                        multiline={true}
                        placeholder="请输入介绍/留言"
                    />
                    <View style={styles.length}>
                        <Text style={styles.lengthText}>{value.length}/500</Text>
                    </View>
                </View>

            </Page>
        )
    }
}
