import React, { Component } from "react";
import { View } from "react-native";
//import PropTypes from "prop-types";

import {Page  } from "src/components";
import styles from "./style";
export default class AddAdmin extends Component {
    static defaultProps = {
        
    };
    static propTypes = {
        
    };
    state = {
        
    };
    render(){
        return(
           <Page title="添加分站长">
            <View style={styles.container}>
            </View>
           </Page>
        )
    }
}
