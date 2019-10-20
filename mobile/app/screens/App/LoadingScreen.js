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
        // this.props.navigation.navigate('Wizard');
        DeviceStorage.loadItem('token').then(token => {
            const tokenData = parseToken(token);            
            axios.get('https://mvfagb.herokuapp.com/api/cycle/' + tokenData._id + '/end')
                .then(response => {
                    if (response.data == null) {
                            axios.get('https://mvfagb.herokuapp.com/api/account/detail/' + tokenData._id + '/flags')
                                .then(response => {
                                    this.props.navigation.navigate(response.data.hasCycle ? 'App' : 'Wizard');
                                })
                    }
                })
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