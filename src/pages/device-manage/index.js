import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { Page, Button, Input, Icon } from "src/components";
import action from "src/action";
import styles from "./style";
import { connect } from "react-redux";

const CheckBox = ({ checked, onChangeChecked }) => (
  <TouchableOpacity
    onPress={() => {
      onChangeChecked(!checked);
    }}
    style={styles.checkbox}
  >
    <Icon
      size={20}
      source={
        checked ? require("./img/dl_xz.png") : require("./img/dl_wxz.png")
      }
    />
  </TouchableOpacity>
);
CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChangeChecked: PropTypes.func
};

@connect(state => {
  const { newStoreInfo } = state;
  return { newStoreInfo };
})
export default class DeviceManage extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    newStoreInfo: PropTypes.object,
  };

  state = {
    data: [
      { label: "淋浴", value: "", key: "Bach", checked: true,editable:false, },
      { label: "储物", value: "", key: "Storage", checked: true ,editable:false,},
      {
        label: "有氧器材",
        value: "0",
        editable:true,
        key: "IsAerobic",
        valueKey: "Aerobic",
        checked: true
      },
      {
        label: "力量器材",
        value: "0",
        editable:true,
        key: "IsPower",
        valueKey: "Power",
        checked: true
      },
      {
        label: "康体设备",
        value: "0",
        editable:true,
        key: "IsHealthCare",
        valueKey: "HealthCare",
        checked: true
      }
    ]
  };
  componentWillMount() {
    this.loadInitValue();
  }
  loadInitValue() {
    const { deviceManage } = this.props.newStoreInfo;
    const nextData = Object.assign([], this.state.data);
    for (const item in deviceManage) {
      for (let i = 0; i < nextData.length; i++) {
        if (nextData[i].key === item) {
          nextData[i].checked = Boolean(deviceManage[item]);
        }
        if(nextData[i].valueKey === item){
          nextData[i].value = deviceManage[item];
        }
      }
    }
    this.setState({
      data: nextData
    });
  }
  handleValueChange(v, i, key) {
    const nextData = Object.assign([], this.state.data);
    nextData[i][key] = v;
    this.setState({
      data: nextData
    });
  }
  save = () => {
    const { data } = this.state;
    const result = {};
    data.forEach(item => {
      const { key, checked, value, valueKey } = item;
      result[key] = Number(checked);
      if (valueKey) {
        result[valueKey] = value;
      }
    });
    this.props.navigation.dispatch(
      action.editStoreInfo({
        deviceManage: result
      })
    )
    return this.props.navigation.dispatch(
      action.navigate.back()
    );
  };

  renderItem = (item, i) => {
    const { label, value, checked ,editable} = item;
    return (
      <View style={styles.item} key={label}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemLabel}>{label}</Text>
        </View>
        <View style={styles.itemRight}>
          <Input
            editable={editable}
            value={value}
            onChangeText={v => this.handleValueChange(v, i, "value")}
            style={styles.itemValue}
            clearButtonMode="never"
          />
          <CheckBox
            checked={checked}
            onChangeChecked={v => this.handleValueChange(v, i, "checked")}
          />
        </View>
      </View>
    );
  };
  render() {
    const { data } = this.state;
    return (
      <Page title="设备管理">
        <View style={styles.container}>
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          />
          <Button
            onPress={this.save}
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
          >
            保存
          </Button>
        </View>
      </Page>
    );
  }
}
