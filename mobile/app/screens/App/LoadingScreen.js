import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
    Text
} from 'react-native';
import DeviceStorage from 'lib/services/DeviceStorage'
import { parseToken } from 'lib/helpers/utils'
import axios from 'axios'


export default class LoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        // let token;
        // token = !token && DeviceStorage.loadItem('token').then(token => {

        //     const userData = parseToken(token);            
        //     console.warn(userData);
        //     this.props.navigation.navigate(userData.hasCycle ? 'App' : 'Wizard');
        // }
        // ).catch(err => {
        //     console.warn(err)
        //     props.screenProps.rootNavigation.navigate('AuthLoading');

        // })
        axios.get('https://mvfagb.herokuapp.com/api/account/detail/5ce9092d50081503e89ae408/flags')
            .then(response => {
                this.props.navigation.navigate(response.data.hasCycle ? 'App' : 'Wizard');
            }
            ).catch(err => {
                console.warn(err)
                props.screenProps.rootNavigation.navigate('AuthLoading');

            })
    }

    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}