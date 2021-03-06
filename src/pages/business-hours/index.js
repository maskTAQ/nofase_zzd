import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

import action from "src/action";
import { Tip } from "src/common";
import { Page, Button, Picker } from "src/components";
import styles from "./style";

const Switch = ({ value, onValueChange = () => { } }) => {
  const label = value ? "off" : "on";
  let children;
  if (value) {
    children = [
      <View style={styles.switchPoint} key="0" />,
      <Text style={styles.switchLabel} key="1">
        {label}
      </Text>
    ];
  } else {
    children = [
      <Text style={styles.switchLabel} key="1">
        {label}
      </Text>,
      <View style={styles.switchPoint} key="0" />
    ];
  }
  return (
    <Button
      onPress={() => {
        onValueChange(!value);
      }}
      style={styles.switchWrapper}
    >
      {children}
    </Button>
  );
};
Switch.propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func
};

@connect(state => {
  const { newStoreInfo } = state;
  return { newStoreInfo };
})
export default class BusinessHours extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    newStoreInfo: PropTypes.object,
  };
  state = {
    isPickerVisible: false,
    startWeek: "周一",
    startWeekValue: "1",
    endWeek: "周日",
    endWeekValue: "0",
    isDateTimePickerVisible: false,
    startTime: "请选择开始时间",
    startTimeData: null,
    endTime: "请选择结束时间",
    endTimeData: null,
    Flag: 1 //1营业 2未营业
  };
  componentWillMount() {
    const { Flag, BusinessTimes, BusinessWeeks = "1,0" } = this.props.newStoreInfo.hour;
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const time = BusinessTimes
      ? BusinessTimes.split("-")
      : ["请选择开始时间", "请选择结束时间"];
    this.setState({
      Flag,
      startTime: time[0],
      endTime: time[1],
      startWeekValue: BusinessWeeks[0],
      startWeek: weeks[BusinessWeeks[0]],
      endWeekValue: BusinessWeeks[BusinessWeeks.length - 1],
      endWeek: weeks[BusinessWeeks[BusinessWeeks.length - 1]]
    });

    //console.log(BusinessWeeks)
  }
  componentWillReceiveProps(nextProps) {
    const { hour } = nextProps.newStoreInfo;
    this.setState({ ...hour })
  }
  store = {
    weeks: [
      { label: "周一", value: "1" },
      { label: "周二", value: "2" },
      { label: "周三", value: "3" },
      { label: "周四", value: "4" },
      { label: "周五", value: "5" },
      { label: "周六", value: "6" },
      { label: "周日", value: "0" }
    ],
    selectedWeekType: "",
    currentSelectedTimtType: ""
  };

  showWeekPickerModal = type => {
    this.store.selectedWeekType = type;
    this.setState({
      isPickerVisible: true
    });
  };
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const time = moment(date).format("HH:mm");
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
  isCloseChange = v => {
    this.setState({
      Flag: v ? 1 : 2
    });
  };
  computWeekRangeStr() {
    //let { startWeekValue } = this.state;
    const { startWeekValue, endWeekValue } = this.state;
    return `${startWeekValue},${endWeekValue}`;
    // const l = endWeekValue - startWeekValue + 1;
    // const a = new Array(l);

    // a.fill(0);
    // const BusinessWeeks = a
    //   .map(item => {
    //     return startWeekValue++;
    //   })
    //   .join(",");
    // return BusinessWeeks;
  }
  save = () => {
    const { Flag, startTime, endTime } = this.state;
    const isHasInitTime = startTime.includes(":") && endTime.includes(":");


    if (!isHasInitTime) {
      Tip.fail("请选择时间");
    } else {
      this.props.navigation.dispatch(
        action.editStoreInfo({
          hour: {
            BusinessWeeks: this.computWeekRangeStr(),
            BusinessTimes: startTime + "-" + endTime,
            Flag
          }
        })
      )
      this.props.navigation.dispatch(
        action.navigate.back()
      );
    }

  };
  renderHeader() {
    const { Flag } = this.state;
    return (
      <View style={styles.header}>
        <Text style={styles.headerLabel}>店铺营业状态</Text>
        <Switch value={Flag === 1} onValueChange={this.isCloseChange} />
      </View>
    );
  }
  renderPicker() {
    const { startWeek, endWeek } = this.state;
    return (
      <View style={styles.chooseDayWrapper}>
        <Button
          onPress={() => this.showWeekPickerModal("startWeek")}
          style={styles.chooseDayButton}
          textStyle={styles.chooseDayButtonText}
        >
          {startWeek}
        </Button>
        <Text style={styles.zhi}>至</Text>
        <Button
          onPress={() => this.showWeekPickerModal("endWeek")}
          style={styles.chooseDayButton}
          textStyle={styles.chooseDayButtonText}
        >
          {endWeek}
        </Button>
      </View>
    );
  }
  renderCenter() {
    const { startTime, endTime } = this.state;
    return (
      <View style={styles.center}>
        <Text style={styles.centerTitle}>营业时间</Text>
        {this.renderPicker()}
        <Button
          onPress={() => this.selectTime("start")}
          style={styles.chooseTimeButton}
          textStyle={styles.chooseTimeButtonText}
        >
          {startTime}
        </Button>
        <Text style={styles.timeZhi}>至</Text>
        <Button
          onPress={() => this.selectTime("end")}
          style={styles.chooseTimeButton}
          textStyle={styles.chooseTimeButtonText}
        >
          {endTime}
        </Button>
      </View>
    );
  }
  renderButton() {
    return (
      <View style={styles.bottom}>
        <Button
          onPress={this.save}
          style={styles.saveButton}
          textStyle={styles.saveButtonText}
        >
          保存
        </Button>
        <Text style={styles.info}>请您仔细填写，切勿随意更改</Text>
        <Text style={styles.info}>营业时间及营业状态直接影响店铺经营情况</Text>
      </View>
    );
  }
  render() {
    const { isPickerVisible } = this.state;
    const { weeks } = this.store;
    return (
      <Page title="营业时间">
        <View style={styles.container}>
          {this.renderHeader()}
          {this.renderCenter()}
          {this.renderButton()}
          <Picker
            data={weeks}
            visible={isPickerVisible}
            onRequestClose={() => {
              this.setState({
                isPickerVisible: false
              });
            }}
            onValueSelect={(v, item) => {
              const { selectedWeekType } = this.store;
              const { label, value } = item;

              this.setState({
                isPickerVisible: false,
                [selectedWeekType]: label,
                [`${selectedWeekType}Value`]: value
              });
            }}
          />
          <DateTimePicker
            is24Hour={true}
            mode="time"
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>
      </Page>
    );
  }
}
