import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import action from "src/action";
import styles from "./style";
import { Page, Input, Button, Picker } from "src/components";
//import { Tip } from "src/common";

@connect()
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
      { label: "交通银行", value: "交哦银行" },
      { label: "中国农业银行", value: "中国农业银行" },
      { label: "招商银行", value: "招商银行" }
    ],
    data: [
      { key: 'LegalName', label: '法人姓名', disabled: true, value: '', placeholder: '' },
      { key: 'LegCode', label: '法人身份证', disabled: true, value: '', placeholder: '' },
      { key: 'BankName', label: '所属行', value: '请选择银行', placeholder: '' },
      { key: 'CardNo', label: '法人身份证', value: '', placeholder: '请输入卡号' },
      { key: 'LegTel', label: '绑定法人\n手机号码', disabled: true, value: '', placeholder: '手机号码不可更改' }
    ],
    isPickerVisible: false
  };
  componentWillMount() {
    const { LegalName, LegCode, LegTel } = this.props.newStoreInfo.authentication;
    this.handleValueChange('LegalName', LegalName);
    this.handleValueChange('LegCode', LegCode);
    this.handleValueChange('LegTel', LegTel);
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
  getValueByKey(findKey) {
    const { data } = this.state;
    for (let i = 0; i < data.length; i++) {
      const { key, value } = data[i];
      if (key === findKey) {
        return value;
      }
    }
    return '';
  }
  save = () => {
    this.props.navigation.dispatch(
      action.editStoreInfo({
        bank: {
          BankName: this.getValueByKey('BankName'),
          CardNo: this.getValueByKey('CardNo'),
        }
      })
    )
    return this.props.navigation.dispatch(
      action.navigate.back()
    );
  }
  renderList() {
    const { data } = this.state;
    return (
      <View style={styles.list}>
        {
          data.map(item => {
            const { key, label, value, disabled, placeholder } = item;
            console.log(disabled)
            if (key === 'BankName') {
              return (
                <View style={styles.item} key={key}>
                  <View style={styles.itemLabel}>
                    <Text style={styles.itemLabelText}>
                      {label}
                    </Text>
                  </View>
                  <Button textStyle={styles.bankname} onPress={() => {
                    this.setState({
                      isPickerVisible: true
                    })
                  }}>{value}</Button>
                </View>
              )
            }
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
    return (
      <Page title="银行卡认证信息">
        <View style={styles.container}>
          {this.renderList()}
          <Button onPress={this.save} style={styles.save} textStyle={styles.saveText}>
            保存
          </Button>
        </View>

        <Picker
          data={weeks}
          visible={isPickerVisible}
          onValueSelect={(value) => {
            this.handleValueChange('BankName', value);

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
