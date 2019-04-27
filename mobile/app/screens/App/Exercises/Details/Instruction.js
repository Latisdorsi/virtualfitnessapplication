import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Subheading } from 'react-native-paper';

export default class Instruction extends Component {
    render() {

        return (
            <View style={{ padding: 15 }}>
                <Subheading>Instruction</Subheading>
                <Text>Lorem Ipsum Dolor Amaet</Text>
            </View>
        )
    }
}