import React, { Component } from "react";
import { View, Text, Image,StatusBar, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./style";
import { Input, Button, CodeButton } from "src/components";
import action from "src/action";
import api from "src/api";
import { Tip } from "src/common";

@connect()
export default class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    phone: "",
    code: "",
  };
  componentWillMount() {
    AsyncStorage.getItem('mobile', (e, m) => {
      if (!e && m) {
        this.setState({
          phone: m
        });
      }
    })
  }
  handleValueChange(type, value) {
    this.setState({
      [type]: value
    });
  }
  login = () => {
    const { phone, code } = this.state;
    // if (!this.codeRef.isGetCode) {
    //   return Tip.fail("请先获取验证码");
    // }
    return api
      .login({ Tel: phone, ExCode: code })
      .then(res => {
        AsyncStorage.setItem('mobile', phone)
        this.props.navigation.dispatch(
          action.login(res)
        );
        this.props.navigation.dispatch(
          action.navigate.go({ routeName: "Home" })
        );
      })
      .catch(e => {
        console.log(e, 1)
        Tip.fail(e);
      });
  };
  register = () => {
    this.props.navigation.dispatch(
      action.navigate.go({ routeName: "Register" })
    );
  };

  render() {
    const { phone, code } = this.state;
    return (
      <View style={[styles.container]}>
        <StatusBar
          backgroundColor="#1a98e0"
          translucent={true}
          barStyle="light-content"
        />
        <View style={styles.logo}>
          <Image
            source={require("src/images/login/logo.png")}
            style={styles.logoImg}
          />
          <Text style={styles.logoLabel}>GYM</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Image
              source={require("src/images/login/username.png")}
              style={styles.formItemImg}
            />
            <Input
              value={phone}
              onChangeText={v => {
                this.handleValueChange("phone", v);
              }}
              style={styles.formItemInput}
              placeholder="手机号"
              placeholderTextColor="#fff"

            />
          </View>
          <View style={styles.formItem}>
            <Image
              source={require("src/images/login/password.png")}
              style={styles.formItemImg}
            />
            <Input
              value={code}
              onChangeText={v => {
                this.handleValueChange("code", v);
              }}
              style={styles.formItemInput}
              placeholder="密码"

              placeholderTextColor="#fff"
            />
            <CodeButton ref={e => (this.codeRef = e)} phone={phone}>
              验证码
            </CodeButton>
          </View>
          <Button
            disabled={!phone || !code}
            onPress={this.login}
            style={styles.loginButton}
            textStyle={styles.loginText}
          >
            立即登录
          </Button>

        </View>


        
      </View>
    );
  }
}
