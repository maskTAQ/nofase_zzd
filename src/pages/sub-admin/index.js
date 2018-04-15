import React, { Component } from "react";
import { View, Text, StatusBar, Linking } from "react-native";
import action from "src/action";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Icon, Input, Alert, DataView } from "src/components";
import api from 'src/api';
import styles from "./style";

const DeleteModal = ({ isVisible }) => {
    const s = {
        container: {
            width: '100%',
            alignItems: 'center',
            paddingBottom: 15,
            borderWidth: 1,
            borderColor: '#1a9cf5',
            borderRadius: 4,
        },
        title: {
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleText: {
            fontSize: 18,
            color: '#333'
        },
        buttonGroup: {
            width: '90%',
            height: 42,
            flexDirection: 'row',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#1a9cf5',
        },
        button: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        confirmText: {
            fontSize: 16,
        },
        confirm: {
            backgroundColor: '#1a9cf5',
        },

        cancelText: {
            color: '#1a9cf5',
        }
    };
    return (
        <Alert isVisible={isVisible}>
            <View style={s.container}>
                <View style={s.title}>
                    <Text style={s.titleText}>确定删除该分站管理吗？
                    </Text>
                </View>
                <View style={s.buttonGroup}>
                    <Button style={[s.button, s.confirm]} textStyle={s.confirmText}>确定</Button>
                    <Button style={[s.button, s.cancel]} textStyle={s.cancelText}>取消</Button>
                </View>
            </View>
        </Alert>
    )
}
const EditModal = ({ isVisible, close }) => {
    const styles = {
        container: {
            width: '100%',
        },
        content: {
            width: '100%',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#1a9cf5',
            borderRadius: 4,
        },
        header: {
            height: 26,
            justifyContent: 'center',
            alignItems: 'center',
        },
        list: {
            width: '100%',
        },
        item: {
            width: '100%',
            padding: 8,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            borderColor: '#1681fb',
        },
        itemLabel: {
            color: '#1a9cf5',
        },
        cancel: {
            marginTop: 15,
            width: '100%',
            height: 42,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            backgroundColor: '#1a9cf5',
        },
        cancelText: {
            fontSize: 14,
        }
    };
    return (
        <Alert isVisible={isVisible} close={close}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>分站长管理</Text>
                    </View>
                    <View style={styles.list}>
                        {
                            [
                                {
                                    icon: require('./img/u141.png'),
                                    label: '编辑'
                                },
                                {
                                    icon: require('./img/u284.png'),
                                    label: '删除',
                                }
                            ].map(({ icon, label }) => (
                                <Button style={styles.item} key={label}>
                                    <Icon size={20} source={icon} />
                                    <Text style={styles.itemLabel}>{label}</Text>
                                </Button>
                            ))
                        }
                    </View>
                </View>
                <Button onPress={close} style={styles.cancel} textStyle={styles.cancelText}>取消</Button>
            </View>
        </Alert>
    )
}
//分站端页面

@connect(state => {
    const { auth } = state;
    return { auth };
})
export default class SubAdmin extends Component {
    static defaultProps = {};
    static propTypes = {
        navigation: PropTypes.object
    };
    state = {
        isDeleteModalVisible: false,
        isEditModalVisible: false,
    };

    getAdminList = () => {
        return api.getAdminList(this.props.auth.AdminId)
            .then(res => {
                console.log(res);
                return res;
            })
    }
    renderHeader() {
        return (
            <View style={styles.header}>
                <StatusBar
                    backgroundColor={styles.header.backgroundColor}
                    translucent={true}
                    barStyle="light-content"
                />
                <View style={styles.headerBox}>
                    <Button onPress={() => {
                        this.props.navigation.dispatch(
                            action.navigate.go({ routeName: "Home" })
                        );
                    }} style={styles.headerLeftButton}>管理端</Button>
                    <View style={styles.searchBarWrapper}>
                        <View style={styles.searchBarBox}>
                            <Input style={styles.searchInput} placeholder="站长名称/手机号码搜索/区" />
                            <View style={styles.searchBarBorder}></View>
                            <Button style={styles.searchButton}>
                                <Icon size={20} source={require('./img/u15.png')} />
                            </Button>
                        </View></View>
                    <Button onPress={() => {
                        this.props.navigation.dispatch(
                            action.navigate.go({ routeName: "AddAdmin" })
                        );
                    }} style={styles.headerRightButton}>
                        <Icon size={20} source={require('./img/u80.png')} />
                    </Button>
                </View>
            </View>
        );
    }
    renderItem(row) {
        const { NickName, UserName, AdminId, AddressList } = row;
        const { Province, City, Area, } = AddressList;
        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={styles.itemLeftTop}>
                        <Text style={styles.itemName}>{NickName+'   '}</Text>
                        <Text style={styles.itemAddr}>{   AddressList.map(({Area})=>Area).join('/')}</Text>
                    </View>
                    <View style={styles.itemLeftBottom}>
                        <Text style={styles.itemMobile}>{UserName}</Text>
                    </View>
                </View>
                <View style={styles.itemRight}>
                    <Button onPress={() => {
                        Linking.openURL(`tel:${UserName}`)
                    }}>
                        <Icon size={20} source={require('./img/u88.png')} />
                    </Button>
                    <Button onPress={() => {
                        // this.setState({
                        //     isEditModalVisible: true
                        // })
                        api.getAdminInfo(AdminId)
                            .then(res => {
                                console.log(res)
                            })
                    }} style={styles.itemEdit}>编辑</Button>
                </View>
            </View>
        );
    }
    renderList() {

        return (
            <DataView
                style={styles.list}
                getData={this.getAdminList}
                isPulldownLoadMore={false}
                ListEmptyComponent={<Text>暂时没有数据哦</Text>}
                renderItem={({ item }) => this.renderItem(item)}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                keyExtractor={item => item.UserName + item.Address}
            />
        );
    }
    render() {
        const { isEditModalVisible } = this.state;
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderList()}
                <EditModal isVisible={isEditModalVisible} close={() => {
                    this.setState({
                        isEditModalVisible: false
                    })
                }} />
            </View>
        );
    }
}
