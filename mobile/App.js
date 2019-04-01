import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation'
import { Dashboard } from './app/config/router'
//import {root} from './app/config/router';
import { isSignedIn } from './app/config/auth'
import axios from 'axios'


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false,
            userId: '5c9b4fc283c6187261f13823',
            avatarURL: '',
            email:'',
            firstName: '',
            lastName: ''
        };
    }
    componentDidMount() {
        axios
        .get('http://10.0.2.2:3000/account/detail/' + this.state.userId)
        .then(response => {
            this.setState({
                avatarURL: response.data.avatarURL,
                email: response.data.email,
                firstName: response.data.name.firstName,
                lastName: response.data.name.lastName
            })
            
        })
        .catch(err => {
            console.warn(err)
        })


        isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch(err => alert("An error occurred"));
    }
    render() {
        const { checkedSignIn, signedIn } = this.state;
        // If we haven't checked AsyncStorage yet, don't render anything (better ways to
        // do this)

        return <DashboardContainer screenProps={{email: this.state.email, avatarURL: this.state.avatarURL, fullName: this.state.firstName + ' ' + this.state.lastName}}/>

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
