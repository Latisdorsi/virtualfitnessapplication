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

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        let token
        const loggedIn = false
        token = !token && DeviceStorage.loadItem('token').then(token => {
            console.log(userData)
            const userData = parseToken(token)
            this.props.navigation.navigate(userData.active ? 'LoggedIn' : 'LoggedOut')
        }
        ).catch(err => {
            console.warn(err)
            this.props.navigation.navigate('LoggedOut')
        })
        this.props.navigation.navigate('LoggedOut')
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