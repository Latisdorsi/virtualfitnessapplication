import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { Button } from 'react-native-paper';

import Route from './Route'

export default class Profile extends Component {
    static navigationOptions = {
        Title: 'Profile'
    }
    
    render() {
        return <Route />
    }
}