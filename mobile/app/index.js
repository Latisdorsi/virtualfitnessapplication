import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation'
import axios from 'axios'

import Router from './config/router'

export default class App extends Component {
    render() {
        return <Router />
    }
}

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
