import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
//import PropTypes from "prop-types";

import { Page, Button, Icon } from "src/components";
import styles from "./style";
export default class HistoryConsume extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {
    activeIndex: 0,
    isDateTimePickerVisible: false,
    startTime: "请选择开始时间",
    startTimeData: null,
    endTime: "请选择结束时间",
    endTimeData: null
  };
  store = {
    currentSelectedTimtType: ""
  };
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const time = moment(date).format("YYYY-MM-DD");
    const { currentSelectedTimtType } = this.store;
    if (currentSelectedTimtType === "start") {
      this.setState({
        startTime: time,
        startTimeData: date
      });
    } else {
      this.setState({
        endTime: time,
        endTimeData: date
      });
    }
    this._hideDateTimePicker();
  };
  selectTime(type) {
    this.store.currentSelectedTimtType = type;
    this.setState({ isDateTimePickerVisible: true });
  }
  renderChooseDay() {
    const { activeIndex } = this.state;
    const days = ["所有", "当日", "上一日", "三日", "十日", "本月"];
    return (
      <View style={styles.chooseDay}>
        {days.map((day, i) => {
          const isActive = activeIndex === i;
          return (
            <Button
              style={[styles.dayItem, isActive ? styles.dayActiveItem : null]}
              textStyle={[
                styles.dayItemText,
                isActive ? styles.dayActiveItemText : null
              ]}
              key={day}
            >
              {day}
            </Button>
          );
        })}
      </View>
    );
  }
  renderChooseTime() {
    const { startTime, endTime } = this.state;
    return (
      <View style={styles.chooseTime}>
        <Text style={styles.chooseTimeLabel}>自定义时间区:</Text>
        <View style={styles.inputWrapper}>
          <Button
            onPress={() => this.selectTime("start")}
            style={styles.inputButton}
            textStyle={styles.inputText}
          >
            {startTime}
          </Button>
          <Text style={styles.zhi}>至</Text>
          <Button
            onPress={() => this.selectTime("end")}
            style={styles.inputButton}
            textStyle={styles.inputText}
          >
            {endTime}
          </Button>
        </View>
        <View style={styles.chooseTimeButton}>
          <Icon size={24} source={require("./img/u33.png")} />
        </View>
      </View>
    );
  }
  renderHeader() {
    return (
      <View style={styles.header}>
        {this.renderChooseDay()}
        {this.renderChooseTime()}
      </View>
    );
  }
  renderDetail() {
    return (
      <View style={styles.detail}>
        <Text style={styles.detailTitle}>2017-12-21至2017-12-20 </Text>
        <View style={styles.detailItemRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>营业额:</Text>
            <Text style={styles.detailItemValue}>313元</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>消费人次:</Text>
            <Text style={styles.detailItemValue}>215人次</Text>
          </View>
        </View>
        <View style={styles.detailItemRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>在线时长:</Text>
            <Text style={styles.detailItemValue}>313。3</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>平均消费:</Text>
            <Text style={styles.detailItemValue}>32.4元/人</Text>
          </View>
        </View>
      </View>
    );
  }
  renderItemDetail() {
    return (
      <View style={styles.itemBottom}>
        <View style={styles.detailItemRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>营业额:</Text>
            <Text style={styles.detailItemValue}>313元</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>消费人次:</Text>
            <Text style={styles.detailItemValue}>215人次</Text>
          </View>
        </View>
        <View style={styles.detailItemRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>在线时长:</Text>
            <Text style={styles.detailItemValue}>313。3</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>平均消费:</Text>
            <Text style={styles.detailItemValue}>32.4元/人</Text>
          </View>
        </View>
      </View>
    );
  }

  renderItem(row) {
    const { icon, name, addr } = row;
    return (
      <View style={styles.item}>
        <View style={styles.itemTop}>
          <Icon size={82} source={icon} />
          <View style={styles.itemDetail}>
            <View style={styles.itemDetaiTop}>
              <Text style={styles.itemName}>{name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Button>
                  <Icon size={26} source={require("./img/u204.png")} />
                </Button>
                <Button
                  style={styles.editButton}
                  textStyle={styles.editButtonText}
                >
                  编辑
                </Button>
              </View>
            </View>
            <Text style={styles.itemAddr} numberOfLines={2}>
              {addr}
            </Text>
          </View>
        </View>
        {this.renderItemDetail()}
        <View style={styles.tagWrapper}>
          <Text style={styles.tagText}>20人</Text>
        </View>
      </View>
    );
  }
  renderList() {
    const data = [
      {
        icon: require("./img/u45.png"),
        name: "优思健身工作室(前海店)",
        distance: "234m",
        lession: "瑜伽健身",
        addr: "深南大道与前海教会处振业星海商业广场3101A",
        evaluate: 4.3,
        price: 15
      },
      {
        icon: require("./img/u45.png"),
        name: "优思健身工作室(前海店1)",
        distance: "234m",
        lession: "瑜伽健身",
        addr: "深南大道与前海教会处振业星海商业广场3101A",
        evaluate: 4.3,
        price: 15
      },
      {
        icon: require("./img/u45.png"),
        name: "优思健身工作室(前海店2)",
        distance: "234m",
        lession: "瑜伽健身",
        addr: "深南大道与前海教会处振业星海商业广场3101A",
        evaluate: 4.3,
        price: 15
      },
      {
        icon: require("./img/u45.png"),
        name: "优思健身工作室(前海店3)",
        distance: "234m",
        lession: "瑜伽健身",
        addr: "深南大道与前海教会处振业星海商业广场3101A",
        evaluate: 4.3,
        price: 15
      },
      {
        icon: require("./img/u45.png"),
        name: "优思健身工作室(前海店4)",
        distance: "234m",
        lession: "瑜伽健身",
        addr: "深南大道与前海教会处振业星海商业广场3101A",
        evaluate: 4.3,
        price: 15
      }
    ];
    return (
      <View style={styles.list}>
        <FlatList
          data={data}
          ListEmptyComponent={<Text>暂时没有数据哦</Text>}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
  render() {
    return (
      <Page title="营业统计">
        <View style={styles.container}>
          {this.renderHeader()}
          {this.renderDetail()}
          {this.renderList()}
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>
      </Page>
    );
  }
}
