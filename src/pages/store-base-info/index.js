import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import api from 'src/api';
import action from "src/action";
import { Page, Input, Button } from "src/components";
import styles from "./style";

@connect(state => {
    const { newStoreInfo,auth:{AdminId} } = state;
    return { newStoreInfo,AdminId };
})
export default class StoreBaseInfo extends Component {
    static defaultProps = {

    };
    static propTypes = {
        navigation: PropTypes.object,
        newStoreInfo: PropTypes.object,
        AdminId:PropTypes.number
    };
    state = {
        data: [
            { label: '店铺全称', key: 'StoreName', value: '12' },
            { label: '店铺号码', key: 'StoreTel', value: '12' },
            { label: '单位类型', key: 'StoreType', value: '13' },
            { type: 'line', key: '1' },
            { label: '法人姓名', key: 'LegalName', value: '123' },
            { label: '法人手机号', key: 'LegTel', value: '12qwqw3' },
            { label: '法人身份证', key: 'LegCode', value: '123' },
            { type: 'line', key: '2' },
            { label: '业务员', key: 'SalesmanName', value: '123' },
            { label: '合约编号', key: 'ContractCode', value: '13' },
        ]
    };
    changeValue = (i, v) => {
        const data = Object.assign([], this.state.data);
        data[i].value = v;
        this.setState({
            data
        });
    }
    getParams=()=>{
        const {data} = this.state;
        const {AdminId} = this.props;
        const result = {
            SalesmanId:AdminId
        };
        data.forEach(item=>{
            const {type,key,value} = item;
            if(type!=='line'){
                result[key] = value;
            }
            
        });
        return result;
    }
    add = () => {
        api.addStore(this.getParams())
        .then(res=>{
            this.props.navigation.dispatch(
                action.editStoreInfo({
                    base:{
                        StoreId:res.StoreId,
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
                                        <Input onChangeText={v => this.changeValue(i, v)} style={styles.input} value={value} />
                                    </View>
                                </View>
                            )
                        })
                    }
                    <Button onPress={this.add} style={styles.button}>创建店铺</Button>
                </View>
            </Page>
        )
    }
}
