import React from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function ChangeEmail() {
    return (
        <View style={{ padding: 15, justifyContent: 'center'}}>
            <TextInput
                label='Current Email'
                disabled="true"
                style={{ marginVertical: 10, backgroundColor: 'none' }}
            />
            <TextInput
                label='New Email'
                style={{ marginVertical: 10, backgroundColor: 'none' }}
            />
            <Button mode="contained" onPress={() => this.props.navigation.navigate('LoggedIn')} style={{ marginVertical: 10 }}>Change Email Address</Button>


        </View>
    )
}

export default ChangeEmail