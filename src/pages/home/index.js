import React, { Component } from "react";
import { View, Text, FlatList, Linking } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Tip } from 'src/common';
import api from 'src/api';
import action from "src/action";
import { EventHub } from "src/common";
import { Header, Button, Icon, Input, Picker } from "src/components";
import styles from "./style";


@connect(state => {
  const { adminAddressList, adminAddressInfo, storeBusInfoByDate } = state;
  return { adminAddressList, adminAddressInfo, storeBusInfoByDate };
})
export default class Home extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    activeAddrIndex: 0,
    isPickerVisible: false,
    data: [],
    searchValue:'',
    refreshing:false
  };

  componentWillMount() {

    // EventHub.emit("dispatch", "getAdminAddressList", "adminAddressList");
    // EventHub.emit("dispatch", "getAdminAddressInfo", "adminAddressInfo");
    //this.getStoreBusInfoByDate();
    this.getData(true);
  }
  getData(isLoading) {
    // console.log(isLoading)
    // if(isLoading){
    //   Tip.loading('加载店铺中...');
    // }
    return this.props.dispatch(
      {
        type: 'STORELIST',
        api: () => {
          return api.getStoreList(isLoading)
        },
        promise: true
      }
    )
      .then(data => {
        this.setState({
          data
        })
      })
      .catch(e => {
        Tip.loading('加载店铺失败');
        console.log('e:reject', e);
      })
  }
  storeAddrList = [
    { label: '广东省-深圳市-南山区', value: '0' },
    { label: '广东省-深圳市-罗湖区', value: '1' },
    { label: '广东省-深圳市-大鹏新区', value: '2' }
  ];
  getStoreBusInfoByDate() {
    const { activeAddrIndex } = this.state;
    EventHub.emit("dispatch", "getStoreBusInfoByDate", "storeBusInfoByDate", {
      Address: this.storeAddrList[activeAddrIndex].label.replace(/-/g, ''),
      SDate: moment().format("YYYY-MM-DD 00:00"),
      EDates: moment().format("YYYY-MM-DD 23:59"),
    });
  }
  onAddrChange = (value) => {
    this.setState({
      activeAddrIndex: value,
      isPickerVisible: false
    })
  }
  onRefresh=()=>{
    this.setState({refreshing:true});
    this.getData(false)
    .then(res=>{
      this.setState({refreshing:false});
    })
  }
  renderHeader() {
    const { activeAddrIndex } = this.state;
    return (
      <View style={styles.header}>
        <Header
          style={{ backgroundColor: styles.header.backgroundColor }}
          LeftComponent={
            <Button onPress={() => {
              this.props.navigation.dispatch(
                action.navigate.go({ routeName: "SubAdmin" })
              );
            }} textStyle={{ fontWeight: "bold" }}>分站端</Button>
          }
          RightComponent={
            <Button onPress={() => {
              this.props.navigation.dispatch(
                action.navigate.go({ routeName: "StoreAdd" })
              );
            }}>
              <Icon size={30} source={require("./img/u21.png")} />
            </Button>
          }
          titleComponent={
            <Button onPress={() => {
              this.setState({
                isPickerVisible: true
              })
            }} style={styles.titleBox}>
              <Text style={styles.titleText}>{this.storeAddrList[activeAddrIndex].label}</Text>
              <Icon style={styles.titleIcon} size={20} source={require('./img/u305.png')} />
            </Button>
          }
        />
        <Text style={styles.consume}>今日营业额 15256.51 元，消费用户</Text>
        <Text style={styles.subTitle}>152 人/次</Text>
        <View style={styles.calendarWrapper}>
          <Button onPress={this.showPicker}>
            <Icon size={30} source={require("./img/u85.png")} />
          </Button>
        </View>
      </View>
    );
  }
  renderSearch() {
    const {searchValue} = this.state;
    return (
      <View style={styles.search}>
        <View style={styles.searchBox}>
          <Input
            value={searchValue}
            onChangeText={v=>this.setState({searchValue:v})}
            placeholder="店铺名称/手机号码搜索"
            style={styles.searchInput}
          />
          <View style={styles.searchBorder} />
          <Button style={styles.searchButton}>
            <Icon size={30} source={require("./img/u15.png")} />
          </Button>
        </View>
      </View>
    );
  }
  renderItem(row) {
    const { canPeople, StoreName, Location, StoreTel, StoreId } = row;
    const icon = require("./img/u42.png");
    return (
      <View style={styles.item}>
        <View style={styles.itemBox}>
          <Icon size={82} source={icon} />
          <View style={styles.itemDetail}>
            <View style={styles.itemDetaiTop}>
              <Text style={styles.itemName} numberOfLines={2}>{StoreName}</Text>
              <View style={styles.itemButtonGroup}>
                <Button onPress={() => {
                  Linking.openURL(`tel:${StoreTel}`)
                    .then(supported => {
                      console.log(supported);
                    })
                }}>
                  <Icon size={26} source={require("./img/u204.png")} />
                </Button>
                <Button
                  onPress={() => {
                    this.props.navigation.dispatch(
                      action.navigate.go({ routeName: "StoreAdd",params:{StoreId} })
                    );
                  }}
                  style={styles.editButton}
                  textStyle={styles.editButtonText}
                >
                  编辑
                </Button>
              </View>
            </View>
            <Text style={styles.itemAddr} numberOfLines={2}>
              {Location}
            </Text>
          </View>
        </View>
        <View style={styles.tagWrapper}>
          <Text style={styles.tagText}>{canPeople}人</Text>
        </View>
      </View>
    );
  }
  renderList() {
    const { data,refreshing } = this.state;
    const {searchValue} = this.state;
    return (
      <View style={styles.list}>
        <FlatList
          data={data.filter(item=>{
            if(!searchValue){
              return true
            }
            const {StoreName,StoreTel} = item;
            return StoreName.includes(item) || StoreTel.includes(item);
          })}
          onRefresh={this.onRefresh}
          refreshing={refreshing}
          ListEmptyComponent={<Text style={styles.noData}>暂时没有数据哦!</Text>}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.StoreId + item.StoreName}
        />
      </View>
    );
  }
  render() {
    const { isPickerVisible } = this.state;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderSearch()}
        {this.renderList()}
        <Picker
          visible={isPickerVisible}
          onValueSelect={this.onAddrChange}
          data={this.storeAddrList}
          onRequestClose={() => {
            this.setState({
              isPickerVisible: false
            })
          }}
        />
      </View>
    );
  }
}
