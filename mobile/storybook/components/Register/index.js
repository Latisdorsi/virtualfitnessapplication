import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

export default function Register() {
    return (
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ padding: 15 }}>
                <TextInput
                    label='Email'
                />
                <TextInput
                    label='Password'
                />
                  <TextInput
                    label='Repeat Password'
                />
                  <TextInput
                    label='First Name'
                />
                  <TextInput
                    label='Last Name'
                />
                <Button mode="contained">Register</Button>
                <TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>Already have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}