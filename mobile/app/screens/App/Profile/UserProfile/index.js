import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Avatar, Card, IconButton, Subheading } from 'react-native-paper';
import Contact from './Contact';
import Emergency from './Emergency';


const UserProfile = () => {

    return (
        <ScrollView>
            <View style={{ padding: 15 }}>
                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                    <Avatar.Image size={80} source={require('./soft-copy-image.jpg')} />
                    <Subheading>Christopher John Cuna</Subheading>
                    <Text>Male, 23</Text>
                </View>
                <Card style={{ padding: 15, marginVertical: 15 }}>
                    <Contact />
                </Card>
                <Card style={{ padding: 15, marginVertical: 15 }}>
                    <Emergency />
                </Card>

            </View>
        </ScrollView>
    )
}

export default UserProfile