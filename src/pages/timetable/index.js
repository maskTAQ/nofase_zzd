import React, { Component } from "react";
import { View, Alert, ScrollView, Modal, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";

import action from "src/action";

import { Page, Button, Table, Input } from "src/components";
import styles from "./style";



class SelectTimeModal extends Component {
  static propTypes = {
    requestChangeTime: PropTypes.func,
    rowData: PropTypes.object,
    rowIndex: PropTypes.number,
    isVisible:PropTypes.bool,
    close:PropTypes.func,
    
  };
  state = {
    isDateTimePickerVisible: false,
    dateTimePickerType: "none", //STime end ETime,
  };
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const time = moment(date).format("HH:mm");
    const { requestChangeTime, rowIndex } = this.props;
    const { dateTimePickerType } = this.state;
    requestChangeTime(time, rowIndex, dateTimePickerType)

    return this._hideDateTimePicker();
  };
  render() {
    const { isDateTimePickerVisible } = this.state;
    const { isVisible, rowData ,close} = this.props;
   
    const { STime, ETime } = rowData || {};
    return (
      <Modal
        animationType="fade"
        onRequestClose={() => { }}
        transparent={true}
        visible={isVisible}
      >
        <View style={{ flex: 1 }}></View>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>选择时间区</Text>
          <View style={styles.inputGroup}>
            <Button onPress={() => {
              this.setState({
                isDateTimePickerVisible: true,
                dateTimePickerType: 'STime'
              })
            }} style={styles.startTimeButton} textStyle={{color:'#289fe4'}}>{STime || '--/--'}</Button>
            <Text>至</Text>
            <Button onPress={() => {
              this.setState({
                isDateTimePickerVisible: true,
                dateTimePickerType: 'ETime'
              })
            }} style={styles.endTimeButton} textStyle={{color:'#289fe4'}}>{ETime || '--/--'}</Button>
          </View>
          <View style={styles.buttonGroup}>
            <Button onPress={close} style={styles.cancel} textStyle={styles.cancelText}>取消</Button>
            <Button onPress={close} style={styles.complete} textStyle={styles.completelText}>完成</Button>
          </View>
        </View>
        <DateTimePicker
          is24Hour={true}
          mode="time"
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </Modal>
    )
  }
}
@connect(state => {
  const { newStoreInfo } = state;
  return { newStoreInfo };
})
export default class Timetable extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    newStoreInfo: PropTypes.object,
  };
  state = {
    dataSource: [
      // {
      //   STime: '',
      //   ETime: '',
      //   Week0: "",
      //   Week1: "",
      //   Week2: "",
      //   Week3: "",
      //   Week4: "",
      //   Week5: "",
      //   Week6: "",
      //   deleteButton: ""
      // }
    ],
    currentActiveRow: null,
    currentActiveRowIndex: NaN,
    isTimeChoosePanelVisible: false,

  };
  componentWillMount() {
    this.setState({
      dataSource:this.props.newStoreInfo.timetable
    })
    //console.log(this.props.newStoreInfo.timetable,999)
  }
  store = {
    columns: [
      {
        title: "时间",
        dataIndex: "STime",
        render: (row, value, index) => {
          const { STime, ETime } = row;
          let label = '';
          
          switch (true) {
            case !!STime && !!ETime:
              label = STime + '-' + ETime;
              break;
            case !!STime:
           label = STime + '-' + '?';
              break;
            case !!ETime:
              label = '?' + '-' + ETime;
              break;
            default:
              label = '选择时间段';
              break;
          }
          console.log(STime, ETime,label )
          return (
            <Button
              onPress={() => this.selectTimeRange(row, index)}
              textStyle={styles.selectTime}
            >
              {label}
            </Button>
          );
        }
      },
      {
        title: "周一",
        ...this.createCommonValueByDataIndex("Week0")
      },
      {
        title: "周二",
        ...this.createCommonValueByDataIndex("Week1")
      },
      {
        title: "周三",
        ...this.createCommonValueByDataIndex("Week2")
      },
      {
        title: "周四",
        ...this.createCommonValueByDataIndex("Week3")
      },
      {
        title: "周五",
        ...this.createCommonValueByDataIndex("Week4")
      },
      {
        title: "周六",
        ...this.createCommonValueByDataIndex("Week5")
      },
      {
        title: "周日",
        ...this.createCommonValueByDataIndex("Week6")
      },
      {
        title: "删除",
        dataIndex: "deleteButton",
        render: (row, value, i, index) => {
          return (
            <Button
              onPress={() => this.deleteRow(index)}
              style={styles.deleteButton}
              textStyle={styles.deleteText}
            >
              删除
            </Button>
          );
        }
      }
    ]
  };
  deleteRow(i) {
    Alert.alert("警告!", `确定删除第${i + 1}行的课程数据吗?`, [
      {
        text: "取消"
      },
      {
        text: "确定",
        onPress: () => {
          const nextDataSource = Object.assign([], this.state.dataSource);
          nextDataSource.splice(i, 1);
          this.setState({
            dataSource: nextDataSource
          });
        }
      }
    ]);
  }
  createCommonValueByDataIndex(dataIndex) {
    return {
      dataIndex,
      render: (row, value, columnsIndex, rowIndex) => {
        return (
          <Input
            value={value}
            onChangeText={v => this.handleValueChange(v, rowIndex, dataIndex)}
            style={styles.input}
            clearButtonMode="never"
          />
        );
      }
    };
  }
  handleValueChange(v, i, k) {
    const nextDataSource = Object.assign([], this.state.dataSource);
    nextDataSource[i][k] = v;

    this.setState({
      dataSource: nextDataSource
    });
  }

  addRow = () => {
    const nextDataSource = Object.assign([], this.state.dataSource);
    nextDataSource.push({
        STime: '',
        ETime: '',
      Week0: "",
      Week1: "",
      Week2: "",
      Week3: "",
      Week4: "",
      Week5: "",
      Week6: "",
      deleteButton: ""
    });

    this.setState({
      dataSource: nextDataSource
    });
  };

  selectTimeRange = (row, i) => {
    this.setState({
      isTimeChoosePanelVisible: true,
      currentActiveRow: row,
      currentActiveRowIndex: i
    });

  };
  save = () => {
    const { dataSource } = this.state;
    this.props.navigation.dispatch(
      action.editStoreInfo({
        timetable: dataSource
      })
    )
    return this.props.navigation.dispatch(
      action.navigate.back()
    );
    // api
    //   .saveCurriculum({ data: dataSource })
    //   .then(res => {
    //     Tip.success("保存成功");
    //   })
    //   .catch(e => {
    //     Tip.fail("保存失败");
    //   });
  };
  render() {
    const { columns } = this.store;
    const { dataSource, isTimeChoosePanelVisible, currentActiveRow, currentActiveRowIndex } = this.state;
    return (
      <Page
        title="课程表"
        RightComponent={
          <Button
            onPress={this.save}
            textStyle={{ color: "#fff", fontWeight: "bold" }}
          >
            保存
          </Button>
        }
      >
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <Table
              columns={columns}
              dataSource={dataSource}
              style={{
                th: { paddingLeft: 0, alignItems: "center" },
                td: { paddingLeft: 0 }
              }}
            />
            <Button
              onPress={this.addRow}
              style={styles.addButton}
              textStyle={styles.addButtonText}
            >
              添加一组
            </Button>
          </ScrollView>
        </View>
        <SelectTimeModal
          isVisible={isTimeChoosePanelVisible}
          rowData={currentActiveRow}
          rowIndex={currentActiveRowIndex}
          close={()=>{
            this.setState({
              isTimeChoosePanelVisible:false
            })
          }}
          requestChangeTime={(value, index, type) => {
            const data = Object.assign([], this.state.dataSource);
            data[index][type] = value;
            console.log(data)
            this.setState({
              dataSource:data
            })
          }}
        />

      </Page>
    );
  }
}
