import React, { Component } from 'react'
import { View, Text } from 'react-native'

export class Dashboard extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center',}}>
                <Text>Dashboard</Text>
            </View>
        )
    }
}

export default Dashboard
