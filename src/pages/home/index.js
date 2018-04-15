import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { citys } from 'src/config';
import api from 'src/api';
import action from "src/action";

import { Header, Button, Icon, Input, Picker, DataView } from "src/components";
import styles from "./style";


@connect(state => {
  const { adminAddressList, adminAddressInfo, storeBusInfoByDate, auth } = state;
  return { adminAddressList, adminAddressInfo, storeBusInfoByDate, auth };
})
export default class Home extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    auth: PropTypes.object,
  };
  state = {
    activeAddrIndex: 0,
    isPickerVisible: false,
    searchValue: '',
    Amont: '-',
    InPeople: '-',
  };
  componentWillMount() {

    this.getStoreBusInfoByDate()
  }
  dateParams = {
    SDate: moment().format("YYYY/MM/DD"),
    EDate: moment().format("YYYY/MM/DD")
  };
  storeAddrList = citys;
  getStoreList = (PageIndex) => {
    const { activeAddrIndex, searchValue } = this.state;
    return api.getStoreList({
      UserArea: this.storeAddrList[activeAddrIndex].label.replace(/-/g, ''),
      PageIndex,
      PageNum: 20,
      SeachValue: searchValue
    })
      .then(res => {
        console.log(res);
        return res;
      })
  }
  getStoreBusInfoByDate() {
    const { activeAddrIndex } = this.state;
    api.getStoreBusInfoByDate({
      Address: this.storeAddrList[activeAddrIndex].label.replace(/-/g, ''),
      ...this.dateParams
    })
      .then(res => {
        this.setState({ ...res });
      })
  }
  onAddrChange = (value) => {
    this.setState({
      activeAddrIndex: value,
      isPickerVisible: false
    }, () => {
      console.log(this.list)
      this.list.triggerRefresh()
    })
  }

  search = () => {
    this.list.triggerRefresh();

  }
  renderHeader() {
    const { activeAddrIndex, Amont, InPeople } = this.state;
    const { AdminLevel } = this.props.auth;

    let headerProps = {};
    if (AdminLevel === 1) {
      headerProps = {
        LeftComponent: (<Button onPress={() => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "SubAdmin" })
          );
        }} textStyle={{ fontWeight: "bold" }}>分站端</Button>),
        RightComponent: (
          <Button onPress={() => {
            this.props.navigation.dispatch(
              action.navigate.go({ routeName: "StoreAdd" })
            );
          }}>
            <Icon size={30} source={require("./img/u21.png")} />
          </Button>
        ),
        titleComponent: (
          <Button onPress={() => {
            this.setState({
              isPickerVisible: true
            })
          }} style={styles.titleBox}>
            <Text style={styles.titleText}>{this.storeAddrList[activeAddrIndex].label}</Text>
            <Icon style={styles.titleIcon} size={20} source={require('./img/u305.png')} />
          </Button>
        )
      };
    }
    return (
      <View style={styles.header}>
        <Header
          style={{ backgroundColor: styles.header.backgroundColor }}
          {...headerProps}
        />
        <Text style={styles.consume}>今日营业额 {Amont} 元，消费用户</Text>
        <Text style={styles.subTitle}>{InPeople} 人/次</Text>
        <View style={styles.calendarWrapper}>
          <Button onPress={() => {
            //
            this.props.navigation.dispatch(
              action.navigate.go({ routeName: "HistoryConsume" })
            );
          }}>
            <Icon size={30} source={require("./img/u85.png")} />
          </Button>
        </View>
      </View>
    );
  }
  renderSearch() {
    const { searchValue } = this.state;
    return (
      <View style={styles.search}>
        <View style={styles.searchBox}>
          <Input
            value={searchValue}
            onChangeText={v => this.setState({ searchValue: v })}
            placeholder="店铺名称/手机号码搜索"
            style={styles.searchInput}
          />
          <View style={styles.searchBorder} />
          <Button onPress={this.search} style={styles.searchButton}>
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
                      action.navigate.go({ routeName: "StoreAdd", params: { StoreId } })
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
    return (
      <DataView
        style={styles.list}
        getData={this.getStoreList}
        ListEmptyComponent={<Text>暂时没有数据哦</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={item => item.StoreId + item.StoreName}
        ref={e => this.list = e}
      />


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
