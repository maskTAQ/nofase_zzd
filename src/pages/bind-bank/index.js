import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import action from "src/action";
import api from 'src/api';
import styles from "./style";
import { Page, Input, Button, Picker } from "src/components";
import { Tip } from "src/common";

@connect(({ newStoreInfo }) => {
  return { newStoreInfo }
})
export default class BindBank extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    newStoreInfo: PropTypes.object,
  };
  state = {
    weeks: [
      { label: "中国工商银行", value: "中国工商银行" },
      { label: "中国建设银行", value: "中国建设银行" },
      { label: "中国银行", value: "中国银行" },
      { label: "交通银行", value: "交通银行" },
      { label: "中国农业银行", value: "中国农业银行" },
      { label: "招商银行", value: "招商银行" }
    ],
    data: [
      { key: 'LegalName', label: '法人姓名', value: '', placeholder: '' },
      { key: 'LegCode', label: '法人身份证', value: '', placeholder: '' },
      { key: 'BankName', label: '所属行', value: '', placeholder: '请选择银行' },
      { key: 'CardNo', label: '卡号', value: '', placeholder: '请输入卡号' },
      { key: 'LegTel', label: '绑定法人\n手机号码', value: '', placeholder: '手机号码不可更改' }
    ],
    isPickerVisible: false
  };
  componentWillMount() {
    const { LegalName: defaultLegalName, LegCode: defaultLegCode, LegTel: defaultLegTel } = this.props.newStoreInfo.base;
    const { LegalName, LegCode, LegTel, BankName, CardNo } = this.props.newStoreInfo.bank;
    console.log(LegalName, defaultLegalName)
    this.handleValueChange('LegalName', LegalName || defaultLegalName);
    this.handleValueChange('LegCode', LegCode || defaultLegCode);
    this.handleValueChange('LegTel', LegTel || defaultLegTel);
    this.handleValueChange('BankName', BankName);
    this.handleValueChange('CardNo', CardNo);
  }

  handleValueChange = (currentKey, value) => {
    const data = Object.assign([], this.state.data);
    for (let i = 0; i < data.length; i++) {
      const { key } = data[i];

      if (key === currentKey) {
        data[i].value = value
        return this.setState({
          data
        })
      }
    }
    return null;
  }
  getValueByKey() {
    const { data } = this.state;
    const result = {};
    for (let i = 0; i < data.length; i++) {
      const { key, value } = data[i];
      result[key] = value;
    }
    return result;
  }
  save = () => {
    const { LegalName: defaultLegalName, LegCode: defaultLegCode, LegTel: defaultLegTel } = this.props.newStoreInfo.base;
    const { LegalName, LegCode, LegTel, BankName, CardNo } = this.getValueByKey();


    if (!BankName || !CardNo || !LegalName || !LegCode || !LegTel) {
      Tip.fail('请完整填写信息');
    } else {
      const { StoreId } = this.props.newStoreInfo.base;
      const params = {
        LegalName: LegalName || defaultLegalName,
        LegCode: LegCode || defaultLegCode,
        LegTel: LegTel || defaultLegTel,
        BankName, CardNo
      };
      console.log(params)
      api.bindBank({ StoreId, ...params })
        .then(res => {
          this.props.navigation.dispatch(
            action.editStoreInfo({
              bank: params
            })
          )
          return this.props.navigation.dispatch(
            action.navigate.back()
          );
        });
    }


  }
  renderList() {
    const { data } = this.state;
    return (
      <View style={styles.list}>
        {
          data.map(item => {
            const { key, label, value, disabled, placeholder } = item;
            // if (key === 'BankName') {
            //   return (
            //     <View style={styles.item} key={key}>
            //       <View style={styles.itemLabel}>
            //         <Text style={styles.itemLabelText}>
            //           {label}
            //         </Text>
            //       </View>
            //       <Button textStyle={styles.bankname} onPress={() => {
            //         this.setState({
            //           isPickerVisible: true
            //         })
            //       }}>{value || placeholder}</Button>
            //     </View>
            //   )
            // }
            return (
              <View style={styles.item} key={key}>
                <View style={styles.itemLabel}>
                  <Text style={styles.itemLabelText}>
                    {label}
                  </Text>
                </View>
                <Input editable={!disabled} onChangeText={(v) => this.handleValueChange(key, v)} style={styles.itemInput} value={value} placeholder={placeholder} />
              </View>
            )
          })
        }
      </View>
    )
  }
  render() {
    const { weeks, isPickerVisible } = this.state;
    const { StoreId } = this.props.newStoreInfo.base;
    const buttonLabel = StoreId ? '更新银行卡信息' : '提交银行卡信息';

    return (
      <Page title="银行卡认证信息">
        <View style={styles.container}>
          {this.renderList()}
          <Button onPress={this.save} style={styles.save} textStyle={styles.saveText}>
            {buttonLabel}
          </Button>
        </View>

        <Picker
          data={weeks}
          visible={isPickerVisible}
          onValueSelect={(value) => {
            this.handleValueChange('BankName', value);
            this.setState({
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

    );
  }
}
