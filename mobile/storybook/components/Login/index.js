import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import logo from 'res/images/af-logo-black.png'
export default function Login() {
    return (
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ padding: 15 }}>
               
                <TextInput
                    label='Email'
                />
                <TextInput
                    label='Password'
                />
                <Button mode="contained">Login</Button>
                <TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>Don't have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}