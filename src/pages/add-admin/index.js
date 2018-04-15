import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import action from "src/action";
import { Page, Input, Button, Picker } from "src/components";
import { citys } from 'src/config';
import styles from "./style";
import { Tip } from "src/common";
import api from "src/api";


@connect()
export default class AddAdmin extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };
    state = {
        Area: '福田',
        NickName: '12',
        Tel: '13696526122',
        isPickerVisible: false
    };
    save = () => {
        const { NickName, Tel, Area } = this.state;
        if (!NickName) {
            return Tip.fail('请填写姓名');
        }
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(Tel)) {
            return Tip.fail('请填写正确的手机号');
        }

        return api.addAdmin({ NickName, Tel, Area, Province: '广东省', City: '深圳市', Level: 2 })
            .then(res => {
                Tip.success('添加管理员成功');
                setTimeout(() => {
                    this.props.navigation.dispatch(
                        action.navigate.back()
                    );
                }, 1500);
            })
            .catch(e => {
                Tip.fail('添加管理员失败:' + e);
            })
    }
    onValueChange(type, value) {
        this.setState({
            [type]: value
        });
    }
    render() {
        const { NickName, Tel, Area, isPickerVisible } = this.state;
        return (
            <Page title="添加分站长">
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.item}>
                            <View style={styles.itemTitle}>
                                <Text style={styles.itemTitleText}>姓名：</Text>
                            </View>
                            <View style={styles.itemContent}>
                                <Input value={NickName} onChangeText={v => this.onValueChange('NickName', v)} style={styles.itemInput} />
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View style={styles.itemTitle}>
                                <Text style={styles.itemTitleText}>手机(将用于登录验证码)：</Text>
                            </View>
                            <View style={styles.itemContent}>
                                <Input value={Tel} onChangeText={v => this.onValueChange('Tel', v)} style={styles.itemInput} />
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View style={styles.itemTitle}>
                                <Text style={styles.itemTitleText}>管理区域：</Text>
                            </View>
                            <View style={styles.pickerContent}>
                                <Button style={styles.itemButton} textStyle={styles.itemText}>广东省</Button>
                                <View style={styles.itemMargin}></View>
                                <Button style={styles.itemButton} textStyle={styles.itemText}>深圳市</Button>
                                <View style={styles.itemMargin}></View>
                                <Button onPress={() => {
                                    this.setState({
                                        isPickerVisible: true
                                    })
                                }} style={styles.itemButton} textStyle={styles.itemText}>{Area}</Button>
                            </View>
                        </View>
                    </View>
                    <Button onPress={this.save} style={styles.button} textStyle={styles.buttonText}>完成</Button>
                </View>
                <Picker
                    data={citys}
                    visible={isPickerVisible}
                    onValueSelect={(v, item) => {
                        this.setState({
                            Area: item.label,
                            isPickerVisible: false
                        });
                    }}
                    onRequestClose={() => {
                        this.setState({
                            isPickerVisible: false
                        });
                    }}
                />
            </Page>
        )
    }
}
