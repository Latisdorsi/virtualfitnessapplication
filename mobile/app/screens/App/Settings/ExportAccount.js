import React from 'react'
import { View, Text } from 'react-native'
import { Button, Subheading } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ExportAccount() {
    return (
        <View style={{ padding: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1 }}>
            <Subheading>Download a PDF file of your account</Subheading>
            <Button mode="contained" onPress={() => this.props.navigation.navigate('LoggedIn')} style={{ marginVertical: 15 }}>Export User Data</Button>
        </View>
    )
}