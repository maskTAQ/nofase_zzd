import React, { Component } from "react";
import { View, FlatList, Text, ScrollView, Linking } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Page, Button, Alert, Input } from "src/components";
import action from "src/action";
import api from 'src/api';
import styles from "./style";


const Layer = ({ isVisible, data, close }) => {
  const { title, children, onOK, onCancel } = data || {};
  return (
    <Alert
      style={styles.modalContainer}
      location="bottom"
      isVisible={isVisible}
      close={close}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title}</Text>
        </View>
        {children}
        <View style={styles.modalButtonBox}>
          <View style={styles.modalButtonWrapper}>
            <Button
              onPress={onCancel}
              style={styles.modalCancel}
              textStyle={styles.modalCancelText}
            >
              取消
            </Button>
            <Button
              onPress={onOK}
              style={styles.modalOk}
              textStyle={styles.modalOkText}
            >
              完成
            </Button>
          </View>
        </View>
      </View>
    </Alert>
  );
};
Layer.propTypes = {
  isVisible: PropTypes.bool,
  data: PropTypes.object,
  close: PropTypes.func
};
@connect(({ newStoreInfo, auth }) => {
  return { newStoreInfo, auth }
})
export default class StoreAdd extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    newStoreInfo: PropTypes.object,
  };
  state = {
    activeLayerIndex: NaN,
    topListData: [
      {
        label: "店铺认证信息",
        value: "未认证",
        key: 'authentication',
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "StoreAuth" })
          );
        }
      },
      {
        label: "银行卡认证信息", value: "未认证",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "BindBank" })
          );
        }
      },
      {
        label: "位置", key: 'map', value: "未选择", onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Map" })
          );
        }
      },
      { label: "容纳人数", value: "45", key: 'PeopleNum', unit: '人' },
      { label: "收费标准", value: "15", key: 'Charge', unit: '/小时' }
    ],
    bottomListData: [
      { label: "店铺图库", value: "在商家端编辑", onPress: () => { } },
      {
        label: "营业时间",
        value: "未设置",
        key: 'hour',
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "BusinessHours" })
          );
        }
      },
      {
        label: "设备管理",
        value: "未设置",
        key: 'deviceManage',
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "DeviceManage" })
          );
        }
      },
      {
        label: "课程表",
        key: 'timetable',
        value: "未设置",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Timetable" })
          );
        }
      },
      { label: "商家介绍/留言", key: 'StoreRemarks', value: "" },
      {
        label: "客服电话",
        key: 'CsTel',
        value: "10477-5666666"
      }
    ]
  };
  componentWillReceiveProps(nextProps) {
    const { hour, bank, deviceManage, authentication, map, timetable } = nextProps.newStoreInfo;

    this.setValueStatus('topListData', 'map', map);
    this.setValueStatus('topListData', 'authentication', authentication);
    this.setValueStatus('topListData', 'bank', bank);

    this.setValueStatus('bottomListData', 'hour', hour);
    this.setValueStatus('bottomListData', 'deviceManage', deviceManage);
    this.setValueStatus('bottomListData', 'timetable', timetable);
  }
  setValueStatus(dataName, key, value) {
    const data = Object.assign([], this.state[dataName]);

    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        data[i].value = value ? '已填写' : '未填写'
      }
    }

    this.setState({
      [dataName]: data
    })
  }
  closeLayer = () => {
    this.setState({
      activeLayerIndex: NaN
    });
  };
  onValueChange = (type, item, i, v) => {
    const nextData = Object.assign([], this.state[type]);
    nextData[i].value = v;
    this.setState({
      [type]: nextData
    });
  }
  addStore = () => {
    const { topListData, bottomListData } = this.state;
    const data = [].concat(topListData, bottomListData);

    const result = {};
    console.log(data)
    data.forEach(item => {
      const { key, value, onPress } = item;
      if (key && !onPress) {
        result[key] = value;
      }

    })
    console.log(result, this.props.auth)
    // api.addStore({
    //   LegTel: '1212'
    // })
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(e => {
    //     console.log(e)
    //   })
  }
  renderItem(type, item, i) {
    const { label, value, onPress, unit } = item;
    return (
      <Button disabled={!onPress} onPress={onPress} disabledStyle={{ backgroundColor: '#fff', }} style={styles.item}>
        <View style={styles.itemLabel}>
          <Text style={styles.itemLabelText}>{label}</Text>
        </View>
        <Input onChangeText={(v) => this.onValueChange(type, item, i, v)} editable={!onPress} style={styles.itemInput} value={value} />
        <Text style={styles.itemUnit}>{unit}</Text>
      </Button>
    );
  }
  renderTop() {
    const { topListData } = this.state;
    return (
      <View style={styles.list}>
        <FlatList
          data={topListData}
          keyExtractor={item => item.label}
          ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
          renderItem={({ item, index }) => this.renderItem('topListData', item, index)}
        />
      </View>
    );
  }
  renderBottom() {
    const { bottomListData } = this.state;
    return (
      <View style={[styles.list, { marginTop: 10 }]}>
        <FlatList
          data={bottomListData}
          keyExtractor={item => item.label}
          ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
          renderItem={({ item, index }) => this.renderItem('bottomListData', item, index)}
        />
      </View>
    );
  }
  render() {

    return (
      <Page title="店铺添加">
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.content}>
              {this.renderTop()}
              {this.renderBottom()}
            </View>
            <View style={styles.buttonBox} >
              <Button onPress={this.addStore} style={styles.submit} textStyle={styles.submitText}>添加店铺</Button></View>
          </View>
        </ScrollView>

      </Page>
    );
  }
}
