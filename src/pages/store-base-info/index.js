import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import api from 'src/api';
import action from "src/action";
import { Page, Input, Button } from "src/components";
import styles from "./style";

@connect(state => {
    const { newStoreInfo, auth: { AdminId } } = state;
    return { newStoreInfo, AdminId };
})
export default class StoreBaseInfo extends Component {
    static defaultProps = {

    };
    static propTypes = {
        navigation: PropTypes.object,
        newStoreInfo: PropTypes.object,
        AdminId: PropTypes.number
    };
    state = {
        data: [
            { label: '店铺全称', key: 'StoreName', value: '' },
            { label: '店铺号码', key: 'StoreTel', value: '' },
            { label: '单位类型', key: 'StoreType', value: '' },
            { type: 'line', key: '1' },
            { label: '法人姓名', key: 'LegalName', value: '' },
            { label: '法人手机号', key: 'LegTel', value: '' },
            { label: '法人身份证', key: 'LegCode', value: '' },
            { type: 'line', key: '2' },
            { label: '业务员', key: 'SalesmanName', value: '' },
            { label: '合约编号', key: 'ContractCode', value: '' },
        ]
    };
    componentWillMount() {
        this.loadInitValue();
    }
    changeValue = (i, v) => {
        const data = Object.assign([], this.state.data);
        data[i].value = v;
        this.setState({
            data
        });
    }
    loadInitValue() {
        const { base } = this.props.newStoreInfo;
        const nextData = Object.assign([], this.state.data);
        for (const item in base) {
            for (let i = 0; i < nextData.length; i++) {
                if (nextData[i].key === item) {
                    nextData[i].value = base[item];

                }
            }
        }
        this.setState({
            data: nextData
        });
    }
    getParams = () => {
        const { data } = this.state;
        const { AdminId, newStoreInfo } = this.props;
        const { StoreId } = newStoreInfo.base;

        const result = {
            SalesmanId: AdminId
        };
        if (StoreId) {
            result.StoreId = StoreId
        }
        data.forEach(item => {
            const { type, key, value } = item;
            if (type !== 'line') {
                result[key] = value;
            }

        });
        return result;
    }
    add = () => {
        api.updateStore(this.getParams())
            .then(res => {
                this.props.navigation.dispatch(
                    action.editStoreInfo({
                        base: {
                            StoreId: res.StoreId,
                            ...this.getParams()
                        }
                    })
                )
                return this.props.navigation.dispatch(
                    action.navigate.back()
                );
            })


    }
    render() {
        const { data } = this.state;
        const { StoreId } = this.props.newStoreInfo.base;
        
        const buttonLabel = StoreId ? '编辑店铺' : '创建店铺';
        return (
            <Page title="店铺基本信息">
                <View style={styles.container}>
                    {
                        data.map((item, i) => {
                            const { label, key, value, type } = item;
                            if (type === 'line') {
                                return (
                                    <View style={styles.itemLine} key={key}>

                                    </View>
                                )
                            }
                            return (
                                <View style={styles.item} key={key}>
                                    <View style={styles.itemLabel}>
                                        <Text style={styles.itemLabelText}>{label}:</Text>
                                    </View>
                                    <View style={styles.itemValue}>
                                        <Input onChangeText={v => this.changeValue(i, v)} style={styles.input} value={String(value)} />
                                    </View>
                                </View>
                            )
                        })
                    }
                    <Button onPress={this.add} style={styles.button}>{buttonLabel}</Button>
                </View>
            </Page>
        )
    }
}
