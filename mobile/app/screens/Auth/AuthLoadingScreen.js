import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
    Text
} from 'react-native';
import DeviceStorage from 'lib/services/DeviceStorage'
import axios from 'axios'

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        const loggedIn = false
        const token = DeviceStorage.loadToken()
        this.props.navigation.navigate(token ? 'LoggedIn' : 'LoggedOut')
    }

    // Render any loading content that you like here
    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}