import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation'
import { Dashboard } from './app/config/router'
//import {root} from './app/config/router';
import {isSignedIn} from './app/config/auth'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentDidMount() {
        isSignedIn()
            .then(res => this.setState({signedIn: res, checkedSignIn: true}))
            .catch(err => alert("An error occurred"));
    }

    render() {
        const {checkedSignIn, signedIn} = this.state;
        // If we haven't checked AsyncStorage yet, don't render anything (better ways to
        // do this)
   
        return <DashboardContainer/>
      
    }
}



//const LoginContainer = createAppContainer(Login);
const DashboardContainer = createAppContainer(Dashboard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e'
    }
});
