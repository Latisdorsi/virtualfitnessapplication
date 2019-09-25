import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View
} from 'react-native';
import DeviceStorage from 'lib/services/DeviceStorage'
import { parseToken } from 'lib/helpers/utils'

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        let token
        const loggedIn = false
        token = !token && DeviceStorage.loadItem('token').then(token => {
            const userData = parseToken(token)
            if (userData.active) {
                this.props.navigation.navigate('LoggedIn')
            } else {
                DeviceStorage.deleteItem('token').then(() => {
                    alert('User does not exist!');
                    this.props.navigation.navigate('LoggedOut');
                }
                )
            }
        }
        ).catch(err => {
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