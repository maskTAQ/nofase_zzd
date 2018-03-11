/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { BackHandler, Platform, ToastAndroid, View, NativeModules } from "react-native";
import { Provider, connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import { createStore } from 'redux';
import PropTypes from 'prop-types';

import Navigation from "src/Navigation";
import AppReducer from 'src/reducers';
import initStore from 'src/store';
import { Tip } from 'src/components';
import action from "src/action";
import api from "src/api";
import { EventHub,CreateReduxField } from "src/common";

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };
  componentWillMount() {
    //监听dispatch事件 由onDispatch统一发送action
    EventHub.on('dispatch', this.onDispatch);
  }
  componentDidMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.handleBack);
    }

  }
  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
    }
  }
  onDispatch = (apiUrl,reduxStoreKey,params) => {
    const { dispatch } = this.props;
    dispatch(CreateReduxField.action(reduxStoreKey,"loading"));
    api[apiUrl](params)
      .then(res => {
        dispatch(
          CreateReduxField.action(reduxStoreKey,"success", res)
        );
      })
      .catch(e => {
        dispatch(CreateReduxField.action(reduxStoreKey,"error"));
      });
      return 1;
  }
  handleBack = () => {
    const { nav } = this.props;
    const routeName = nav.routes[nav.index].routeName;
    if (nav.routes.length > 1 && !["Home"].includes(routeName)) {
      this.props.dispatch(action.navigate.back());
      return true;
    }
    if (routeName === "Home") {
      if (this.lastBack && new Date().getTime() - this.lastBack < 2000) {
        BackHandler.exitApp()
      } else {
        this.lastBack = new Date().getTime();
        ToastAndroid.show("再按一次返回键退出程序", 2000);
      }
      return true;
    }
    return false;
  };
  render() {
    const { dispatch, nav } = this.props;
    return (
      <Navigation navigation={addNavigationHelpers({ dispatch, state: nav })} />
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    nav: state.nav
  })
};

const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends Component {
  store = createStore(AppReducer, initStore);
  render() {
    return (
      <Provider store={this.store}>
        <View style={{ flex: 1 }}>
          <AppWithNavigationState />
          <Tip />
        </View>
      </Provider>
    );
  }
}
