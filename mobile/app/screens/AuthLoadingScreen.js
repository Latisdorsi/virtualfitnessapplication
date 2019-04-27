import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
    constructor(props){
        super(props)
        const loggedIn = false
        this.props.navigation.navigate(loggedIn ? 'LoggedIn' : 'LoggedOut')
    }
    // Render any loading content that you like here
    render() {
        return (
            <View style={{flex: 1, alignContent: 'center', justifyContent:'center'}}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}