import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

export default class Register extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>

                <View style={{ padding: 15 }}>
                    <TextInput
                        label='Email'
                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                    />
                    <TextInput
                        label='Password'
                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                    />
                    <TextInput
                        label='Repeat Password'
                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                    />
                    <TextInput
                        label='First Name'
                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                    />
                    <TextInput
                        label='Last Name'
                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                    />
                    <View>
                        <Button mode="contained" style={{ marginVertical: 10 }}>Register</Button>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }} style={{ marginVertical: 10 }}>
                            <Text style={{ textAlign: 'center' }}>Already have an account?</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}