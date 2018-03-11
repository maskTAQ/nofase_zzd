import React, { Component } from "react";
import { View, Text, FlatList, StatusBar } from "react-native";
//import PropTypes from "prop-types";

import { Header, Button, Icon, Input, Alert } from "src/components";
import styles from "./style";

const DeleteModal = () => {
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
        <Alert isVisible={true}>
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
const EditModal = () => {
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
        <Alert isVisible={true}>
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
                                    label: '删除'
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
                <Button style={styles.cancel} textStyle={styles.cancelText}>取消</Button>
            </View>
        </Alert>
    )
}
//分站端页面
export default class SubAdmin extends Component {
    static defaultProps = {};
    static propTypes = {};
    state = {};
    renderHeader() {
        return (
            <View style={styles.header}>
                <StatusBar
                    backgroundColor={styles.header.backgroundColor}
                    translucent={true}
                    barStyle="light-content"
                />
                <View style={styles.headerBox}>
                    <Button style={styles.headerLeftButton}>管理端</Button>
                    <View style={styles.searchBarWrapper}>
                        <View style={styles.searchBarBox}>
                            <Input style={styles.searchInput} placeholder="站长名称/手机号码搜索/区" />
                            <View style={styles.searchBarBorder}></View>
                            <Button style={styles.searchButton}>
                                <Icon size={20} source={require('./img/u15.png')} />
                            </Button>
                        </View></View>
                    <Button style={styles.headerRightButton}>
                        <Icon size={20} source={require('./img/u80.png')} />
                    </Button>
                </View>
            </View>
        );
    }
    renderItem(row) {
        const { name, addr, mobile } = row;
        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={styles.itemLeftTop}>
                        <Text style={styles.itemName}>{name}</Text>
                        <Text style={styles.itemAddr}>{addr}</Text>
                    </View>
                    <View style={styles.itemLeftBottom}>
                        <Text style={styles.itemMobile}>{mobile}</Text>
                    </View>
                </View>
                <View style={styles.itemRight}>
                    <Button>
                        <Icon size={20} source={require('./img/u88.png')} />
                    </Button>
                    <Button style={styles.itemEdit}>编辑</Button>
                </View>
            </View>
        );
    }
    renderList() {
        const data = [
            {
                name: 'wangxiaodong1',
                addr: '广州省-深圳市-南山区',
                mobile: '15048921980'
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
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderList()}
                <EditModal />
            </View>
        );
    }
}
