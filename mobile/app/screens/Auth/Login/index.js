import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Login extends Component {

    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <View style={{ padding: 15 }}>
                    <Image
                        style={{
                            height: 100,
                            width: 350
                        }}
                        source={require('res/images/af-logo-black.png')}
                    />
                    <TextInput
                        label='Email'
                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                    />
                    <TextInput
                        label='Password'
                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                    />
                    <View>
                        <Button mode="contained" onPress={() => this.props.navigation.navigate('LoggedIn')} style={{ marginVertical: 10 }}>Login</Button>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={{ marginVertical: 10 }}>
                            <Text style={{ textAlign: 'center' }}>Don't have an account?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}