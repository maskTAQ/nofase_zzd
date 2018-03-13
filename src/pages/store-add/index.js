import React, { Component } from "react";
import { View, FlatList, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Page, Button, Alert, Input } from "src/components";
import action from "src/action";
import { Tip } from 'src/common';
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
  constructor() {
    super()
    this.state = {
      activeLayerIndex: NaN,
      topListData: [
        {
          label: "店铺基本信息",
          value: "未填写",
          key: 'base',
          onPress: () => {
            this.props.navigation.dispatch(
              action.navigate.go({ routeName: "StoreBaseInfo" })
            );
          }
        },
        {
          label: "店铺图片数据上传",
          value: "去上传",
          key: 'img',
          onPress: this.proxyPress(() => {
            this.props.navigation.dispatch(
              action.navigate.go({ routeName: "StoreImgInfo" })
            );
          })
        },
        {
          label: "银行卡认证信息",
          value: "未认证",
          key: 'bank',
          onPress: this.proxyPress(() => {
            this.props.navigation.dispatch(
              action.navigate.go({ routeName: "BindBank" })
            );
          })
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
        {
          label: "店铺图库", value: "未设置", key: 'ImgJson', onPress: () => {
            this.props.navigation.dispatch(
              action.navigate.go({ routeName: "ImgStore" })
            );
          }
        },
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
        {
          label: "商家介绍/留言", key: 'StoreRemarks', value: "未设置", onPress: () => {
            this.props.navigation.dispatch(
              action.navigate.go({ routeName: "Introduce" })
            );
          }
        },
        {
          label: "客服电话",
          key: 'CsTel',
          value: "10477-5666666"
        }
      ]
    };
  }
  componentWillReceiveProps(nextProps) {
    const { hour, bank, deviceManage, timetable, StoreRemarks, base } = nextProps.newStoreInfo;

    this.setValueStatus('topListData', 'base', base);
    this.setValueStatus('topListData', 'bank', bank);


    this.setValueStatus('bottomListData', 'hour', hour);
    this.setValueStatus('bottomListData', 'deviceManage', deviceManage);
    this.setValueStatus('bottomListData', 'timetable', timetable);
    this.setValueStatus('bottomListData', 'StoreRemarks', StoreRemarks);

  }
  proxyPress = (press) => {
    return () => {
      const { StoreId } = this.props.newStoreInfo.base || {};
      if (StoreId) {
        press();
      } else {
        Tip.fail('请先录入店铺基本信息');
      }

    }
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
  //更新店铺信息
  editStore = () => {
    const { topListData, bottomListData } = this.state;
    const { base, hour, bank, deviceManage, timetable, StoreRemarks} = this.props.newStoreInfo;
    const data = [].concat(topListData, bottomListData);

    if (!base) {
      return Tip.fail('请先填写店铺基本信息');
    }
    if (!bank) {
      return Tip.fail('请先认证银行卡信息');
    }

    const result = {};
    data.forEach(item => {
      const { key, value, onPress } = item;
      if (key && !onPress) {
        result[key] = value;
      }
    });


    const params = {
      StoreId: base.StoreId,
      StoreRemarks,
      CurrJson:timetable,
      ...result,
      ...hour,
      ...deviceManage,
      
    }



    return api.editStore(params)
      .then(res => {
        Tip.success('店铺数据录入成功');
        setTimeout(() => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Home" })
          );
        }, 1500)
      })
      .catch(e => {
        console.log(e)
      })
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
              <Button onPress={this.editStore} style={styles.submit} textStyle={styles.submitText}>完善店铺信息</Button></View>
          </View>
        </ScrollView>

      </Page>
    );
  }
}
