import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import action from "src/action";
import { Page, Input, Button, Icon } from "src/components";
import { citys as citysConfig } from 'src/config';
import styles from "./style";
import { Tip } from "src/common";
import api from "src/api";

const CheckBox = ({ data, checked, onCheckedChange }) => {
    const selectedImg = require("./img/selected.png");
    const unSelectImg = require("./img/unSelect.png");
    const styles = {
        container: {
            marginTop: 10,
        },
        row: {
            marginBottom: 4,
            height: 36,
            flexDirection: 'row',
        },
        itemBox: {
            flex: 1,
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 6,
            paddingRight: 6,
            alignItems: 'center',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#1a9cf3',
        },
        label: {
            fontSize: 10,
            color: '#1a9cf3',
        }
    };
    const checkboxGroup = [];
    data.forEach((label, i) => {
        checkboxGroup[Math.floor(i / 3)] = checkboxGroup[Math.floor(i / 3)] || [];
        if (i % 3 !== 0) {
            checkboxGroup[Math.floor(i / 3)].push((<View style={{ marginRight: 6, }} key={i}></View>))
        }
        const isChecked = checked.includes(label);
        checkboxGroup[Math.floor(i / 3)].push((
            <Button onPress={() => {
                const nextChecked = Object.assign([], checked);

                if (isChecked) {
                    const i = nextChecked.indexOf(label);
                    nextChecked.splice(i, 1);
                } else {
                    nextChecked.push(label);
                }
                onCheckedChange(nextChecked);
            }} style={styles.itemBox} key={label}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.imgBox}>
                    <Icon
                        size={20}
                        source={isChecked ? selectedImg : unSelectImg}
                    //style={[styles.icon, iconStyle]}
                    />
                </View>
            </Button>
        ))
    });
    return (
        <View style={styles.container}>
            {checkboxGroup.map((checkboxGroup, i) => <View style={styles.row} key={i}>{checkboxGroup}</View>)}
        </View>
    )
}
CheckBox.propTypes={
    data:PropTypes.array,
    checked:PropTypes.array,
    onCheckedChange:PropTypes.func
};
@connect()
export default class AddAdmin extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };
    state = {
        Area: '',
        NickName: '',
        Tel: '',
        isPickerVisible: false,
        citys: []
    };
    componentWillMount() {
        const { AddressList, NickName, UserName: Tel } = this.props.navigation.state.params;

        if (AddressList) {
            this.setState({
                NickName, Tel,
                citys: AddressList.map(i => {
                    const addr = i.Address.split('-');
                    return addr[2];
                })
            })
        }
    }
    save = () => {
        const { NickName, Tel, citys } = this.state;
        if (!NickName) {
            return Tip.fail('请填写姓名');
        }
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(Tel)) {
            return Tip.fail('请填写正确的手机号');
        }

        const AddressJson = JSON.stringify(citys.map(i => ({ Address: i })));
        const { Id, NickName: preNickName } = this.props.navigation.state.params;
        if (preNickName) {
            return api.editAdmin({ NickName, Tel, AddressJson, theAdminId: Id })
                .then(res => {
                    Tip.success('编辑管理员成功');
                    setTimeout(() => {
                        this.props.navigation.dispatch(
                            action.navigate.back()
                        );
                    }, 1500);
                })
                .catch(e => {
                    Tip.fail('编辑管理员失败:' + e);
                })

        } else {
            return api.addAdmin({ NickName, Tel, AddressJson })
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



    }
    onValueChange(type, value) {
        this.setState({
            [type]: value
        });
    }
    render() {
        const { NickName, Tel, citys, } = this.state;
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
                            <View style={styles.content}>
                                <CheckBox data={citysConfig.map(v => v.label)} checked={citys} onCheckedChange={v => {
                                    console.log(v.length)
                                    this.setState({
                                        citys: v
                                    })
                                }} />
                            </View>
                        </View>
                    </View>
                    <Button onPress={this.save} style={styles.button} textStyle={styles.buttonText}>完成</Button>
                </View>

            </Page>
        )
    }
}
