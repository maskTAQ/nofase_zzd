import React, { Component } from "react";
import { View, Text, StatusBar, Linking } from "react-native";
import action from "src/action";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Icon, Input, Alert, DataView } from "src/components";
import { Tip } from 'src/common';
import api from 'src/api';
import styles from "./style";

const DeleteModal = ({ isVisible, onOk, onCancel }) => {
    const s = {
        container: {
            width: '100%',
            alignItems: 'center',
            paddingBottom: 15,
            borderWidth: 1,
            borderColor: '#1a9cf5',
            borderRadius: 4,
            backgroundColor: '#fff',
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
                    <Button onPress={onOk} style={[s.button, s.confirm]} textStyle={s.confirmText}>确定</Button>
                    <Button onPress={onCancel} style={[s.button, s.cancel]} textStyle={s.cancelText}>取消</Button>
                </View>
            </View>
        </Alert>
    )
}
DeleteModal.propTypes = {
    isVisible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};
const EditModal = ({ isVisible, close, onEdit, onDelete }) => {
    const styles = {
        container: {
            width: '100%',
            padding: 15,
            backgroundColor: '#fff',
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
                                    label: '编辑',
                                    onPress: onEdit
                                },
                                {
                                    icon: require('./img/u284.png'),
                                    label: '删除',
                                    onPress: onDelete
                                }
                            ].map(({ icon, label, onPress }) => (
                                <Button onPress={onPress} style={styles.item} key={label}>
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
EditModal.propTypes = {
    isVisible: PropTypes.bool,
    close: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};
//分站端页面

@connect(state => {
    const { auth } = state;
    return { auth };
})
export default class SubAdmin extends Component {
    static defaultProps = {};
    static propTypes = {
        navigation: PropTypes.object,
        auth: PropTypes.object
    };
    state = {
        isDeleteModalVisible: false,
        isEditModalVisible: false,
        searchValue: ''
    };

    getAdminList = () => {
        const { searchValue } = this.state;
        return api.getAdminList(this.props.auth.AdminId)
            .then(res => {
                return res.filter(({ UserName, NickName, AddressList }) => {
                    if (!searchValue) { return true }

                    let hasCity = false;
                    for (let i = 0; i < AddressList.length; i++) {
                        if (AddressList[i].Address.includes(searchValue)) {
                            hasCity = true;
                            break;
                        }
                    }
                    console.log(hasCity || UserName.includes(searchValue) || NickName.includes(searchValue))
                    return hasCity || UserName.includes(searchValue) || NickName.includes(searchValue)
                })
            })
    }
    renderHeader() {
        const { searchValue } = this.state;
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
                            <Input value={searchValue} onChangeText={v => this.setState({ searchValue: v })} style={styles.searchInput} placeholder="站长名称/手机号码搜索/区" />
                            <View style={styles.searchBarBorder}></View>
                            <Button onPress={()=>this.list.triggerRefresh()} style={styles.searchButton}>
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
        const { NickName, UserName, AddressList } = row;
        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={styles.itemLeftTop}>
                        <Text style={styles.itemName}>{NickName + '   '}</Text>
                        <Text style={styles.itemAddr}>{AddressList.map(({ Area }) => Area).join('/')}</Text>
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
                        this.setState({
                            isEditModalVisible: true,
                            currentAdminInfo: row
                        })

                    }} style={styles.itemEdit}>编辑</Button>
                </View>
            </View>
        );
    }
    renderList() {

        return (
            <DataView
                ref={e => this.list = e}
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
        const { isEditModalVisible, isDeleteModalVisible, currentAdminInfo } = this.state;
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderList()}
                <EditModal
                    isVisible={isEditModalVisible}
                    close={() => {
                        this.setState({
                            isEditModalVisible: false
                        })
                    }}
                    onEdit={() => {
                        this.setState({
                            isEditModalVisible: false,
                        }, () => {
                            this.props.navigation.dispatch(
                                action.navigate.go({ routeName: "AddAdmin", params: currentAdminInfo })
                            );
                        })

                    }}
                    onDelete={() => {
                        this.setState({
                            isEditModalVisible: false,
                            isDeleteModalVisible: true
                        })
                    }}
                />
                <DeleteModal
                    isVisible={isDeleteModalVisible}
                    onOk={() => {
                        api.deleteAdmin(currentAdminInfo.Id)
                            .then(res => {
                                this.setState({
                                    isDeleteModalVisible: false
                                }, () => {
                                    this.list.triggerRefresh();
                                    Tip.success('删除管理员成功');
                                })
                            })
                            .catch((e) => {
                                this.setState({
                                    isDeleteModalVisible: false
                                }, () => {
                                    Tip.fail('删除管理员失败');
                                })
                            })

                    }}
                    onCancel={() => {
                        this.setState({
                            isDeleteModalVisible: false
                        })
                    }}
                />
            </View>
        );
    }
}
