import React, { Component } from "react";
import { View, Text, } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import PropTypes from "prop-types";

import { Page, Button, Icon, DataView } from "src/components";
import api from 'src/api';
import action from 'src/action';
import styles from "./style";

const icon = require("./img/logo.png");
export default class HistoryConsume extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    activeIndex: 0,
    isDateTimePickerVisible: false,
    startTime: "开始时间",
    startTimeDate: null,
    endTime: "结束时间",
    endTimeDate: null,

    Amont: '-',
    InPeople: '-',
    TimeLongs: '-',
    AveAmont: '-'
  };
  store = {
    currentSelectedTimeType: "",
    dates: [
      {
        SDate: `${moment(new Date("1997")).format("YYYY-MM-DD")}`,
        EDate: `${moment().format("YYYY-MM-DD")}`
      },
      {
        SDate: `${moment().format("YYYY-MM-DD")}`,
        EDate: `${moment().format("YYYY-MM-DD")}`
      },
      {
        SDate: `${moment()
          .subtract({ hours: 24 })
          .format("YYYY-MM-DD")}`,
        EDate: `${moment().format("YYYY-MM-DD")}`
      },
      {
        SDate: `${moment()
          .subtract({ hours: 24 * 3 })
          .format("YYYY-MM-DD")}`,
        EDate: `${moment().format("YYYY-MM-DD")}`
      },
      {
        SDate: `${moment()
          .subtract({ hours: 24 * 10 })
          .format("YYYY-MM-DD")}`,
        EDate: `${moment().format("YYYY-MM-DD")}`
      },
      {
        SDate: `${moment()
          .startOf("month")
          .format("YYYY-MM-DD")}`,
        EDate: `${moment().format("YYYY-MM-DD")}`
      }
    ]
  };
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const time = moment(date).format("YYYY-MM-DD");
    const { currentSelectedTimeType } = this.store;
    const { startTimeDate, endTimeDate } = this.state;
    if (currentSelectedTimeType === "start") {
      this.setState({
        startTime: time,
        startTimeDate: date
      });
      if (endTimeDate) {
        this.setState({ activeIndex: NaN }, () => {
          this.list.triggerRefresh()
        });

      }
    } else {
      this.setState({
        endTime: time,
        endTimeDate: date
      });
      if (startTimeDate) {
        this.setState({ activeIndex: NaN }, () => {
          this.list.triggerRefresh()
        });
      }
    }

    this._hideDateTimePicker();
  };
  selectTime(type) {
    this.store.currentSelectedTimeType = type;
    this.setState({ isDateTimePickerVisible: true });
  }
  getData = (PageIndex) => {
    const { activeIndex, startTime, endTime } = this.state;
    const { dates } = this.store;
    const { Address } = this.props.navigation.state.params;
    const date = isNaN(activeIndex) ? { SDate: startTime, EDate: endTime } : dates[activeIndex];
    api.getStoreBusInfoByDate({
      Address, ...date
    })
      .then(res => {
        this.setState({ ...res })
      })
      .catch(e => {
        console.log(e)
      })

    return api.getStoreUserListByDate({
      PageIndex, PageNum: 20, Address, ...date
    })
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(e => {
        console.log(e)
      })
  }
  selectDateType(i) {
    this.setState(
      { activeIndex: i, startTimeDate: null, endTimeDate: null },
      () => {
        this.list.triggerRefresh();
      }
    );
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
              onPress={() => this.selectDateType(i)}
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
    const { activeIndex, startTime, endTime, Amont, InPeople, TimeLongs, AveAmont } = this.state;
    const { dates } = this.store;
    const date = isNaN(activeIndex) ? { SDate: startTime, EDate: endTime } : dates[activeIndex];
    return (
      <View style={styles.detail}>
        <Text style={styles.detailTitle}>{date.SDate}至{date.EDate} </Text>
        <View style={styles.detailItemRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>营业额:</Text>
            <Text style={styles.detailItemValue}>{Amont}元</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>消费人次:</Text>
            <Text style={styles.detailItemValue}>{InPeople}人次</Text>
          </View>
        </View>
        <View style={styles.detailItemRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>在线时长:</Text>
            <Text style={styles.detailItemValue}>{TimeLongs}m</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>平均消费:</Text>
            <Text style={styles.detailItemValue}>{(+AveAmont).toFixed(2)}元/人</Text>
          </View>
        </View>
      </View>
    );
  }
  renderItemDetail(item) {
    const { Amont, TimeLong, AvgAmont, OrderCount } = item;
    return (
      <View style={styles.itemBottom}>
        <View style={styles.detailItemRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>营业额:</Text>
            <Text style={styles.detailItemValue}>{Amont}元</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>消费人次:</Text>
            <Text style={styles.detailItemValue}>{OrderCount}人次</Text>
          </View>
        </View>
        <View style={styles.detailItemRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>在线时长:</Text>
            <Text style={styles.detailItemValue}>{TimeLong}分钟</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>平均消费:</Text>
            <Text style={styles.detailItemValue}>{AvgAmont.toFixed(2)}元/人</Text>
          </View>
        </View>
      </View>
    );
  }

  renderItem(row) {
    const { StoreName, Address, StoreId, NowInPeople, StoreImg, PeopleNum = 0 } = row;
    return (
      <View style={styles.item}>
        <View style={styles.itemTop}>
          <Icon size={82} source={StoreImg ? { uri: StoreImg } : icon} />
          <View style={styles.itemDetail}>
            <View style={styles.itemDetaiTop}>
              <Text style={styles.itemName}>{StoreName}</Text>
              <View style={{ flexDirection: "row" }}>
                <Button>
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
              {Address}
            </Text>
          </View>
        </View>
        {this.renderItemDetail(row)}
        <View style={styles.tagWrapper}>
          <Text style={styles.tagText}>{PeopleNum - NowInPeople}人</Text>
        </View>
      </View>
    );
  }
  renderList() {
    return (
      <DataView
        ref={e => this.list = e}
        style={styles.list}
        getData={this.getData}
        isPulldownLoadMore={false}
        ListEmptyComponent={<Text>暂时没有数据哦</Text>}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={item => item.UserName + item.Address}
      />
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
