import React, { Component } from "react";
import { View, FlatList, Text, ScrollView, Linking } from "react-native";
import PropTypes from "prop-types";

import { Page, Button } from "src/components";
import action from "src/action";
import styles from "./style";
export default class StoreAdd extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object
  };
  store = {
    topListData: [
      { label: "店铺认证信息", value: "" },
      { label: "银行卡认证信息", value: "" },
      { label: "店名(简称)", value: "优势健身工作室" },
      { label: "位置", value: "深圳市龙岗区南湾街道龙岗大厦255" },
      { label: "容纳人数", value: "45人" },
      { label: "收费标准", value: "15/小时" }
    ],
    editableData: [
      { label: "店铺图库", value: "", onPress: () => {} },
      {
        label: "营业时间",
        value: "周一至周日 09:00022:30",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "BusinessHours" })
          );
        }
      },
      {
        label: "设备管理",
        value: "",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "DeviceManage" })
          );
        }
      },
      {
        label: "课程表",
        value: "",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Timetable" })
          );
        }
      },
      { label: "商家介绍/留言", value: "", onPress: () => {} },
      {
        label: "客服电话",
        value: "10477-5666666",
        onPress: () => {
          return Linking.openURL("tel:104775666666")
            .then(supported => {
              console.log(supported);
            })
            .catch(err => {
              console.error("An error occurred", err);
            });
        }
      }
    ]
  };
  renderItem(item) {
    const { label, value, onPress } = item;
    return (
      <Button onPress={onPress} style={styles.item}>
        <View style={styles.itemLabel}>
          <Text style={styles.itemLabelText}>{label}</Text>
        </View>
        <Text style={styles.itemValue}>{value}</Text>
      </Button>
    );
  }
  renderTop() {
    const { topListData } = this.store;
    return (
      <View style={styles.list}>
        <FlatList
          data={topListData}
          keyExtractor={item => item.label}
          ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  }
  renderBottom() {
    const { editableData } = this.store;
    return (
      <View style={[styles.list, { marginTop: 10 }]}>
        <FlatList
          data={editableData}
          keyExtractor={item => item.label}
          ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  }
  render() {
    return (
      <Page title="店铺添加" LeftComponent={<View />}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.content}>
              {this.renderTop()}
              {this.renderBottom()}
            </View>
            <View style={styles.nav}>
              <Button textStyle={styles.navItemText}>某某健身</Button>
              <View style={styles.navBorder} />
              <Button textStyle={styles.navItemText}>常见问题</Button>
            </View>
          </View>
        </ScrollView>
      </Page>
    );
  }
}
