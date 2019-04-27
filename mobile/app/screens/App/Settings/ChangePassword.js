import React from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button, Subheading } from 'react-native-paper';

export default function ChangePassword() {
    return (
        <View style={{ padding: 15 }}>
        <Subheading>Pick a strong password you're not using elsewhere</Subheading>
            <TextInput
                label='Old Password'
                style={{ marginVertical: 10, backgroundColor: 'none' }}
            />
            <TextInput
                label='New Passowrd'
                style={{ marginVertical: 10, backgroundColor: 'none' }}
            />
            <TextInput
                label='Repeat New Password'
                style={{ marginVertical: 10, backgroundColor: 'none' }}
            />

            <Button mode="contained" onPress={() => this.props.navigation.navigate('LoggedIn')} style={{ marginVertical: 1 }}>Change Password</Button>
        </View>

    )
}