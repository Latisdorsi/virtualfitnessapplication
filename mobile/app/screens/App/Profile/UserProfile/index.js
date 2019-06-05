import React, { Component, useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Avatar, Card, IconButton, Subheading } from 'react-native-paper';
import Contact from './Contact';
import Emergency from './Emergency';
import DeviceStorage from 'lib/services/DeviceStorage'
import { parseToken } from 'lib/helpers/utils'
import axios from 'axios'

import ProfileContext from './ProfileContext'

export default function UserProfile() {
    let [user, setUser] = useState({
        name: {
            firstName: '',
            lastName: '',
            middleInitial: ''
        },
        contactDetails: {
            address: '',
            phone: {
                mobile: '',
                home: '',
                work: ''
            }
        },
        emergencyDetails: {
            name: '',
            number: 0,
            relationship: ''
        }
    })

    useEffect(() => {
        DeviceStorage.loadItem('token').then(token => {
            const tokenData = parseToken(token)
            axios
                .get('http://mvfagb.herokuapp.com/api/account/detail/' + tokenData._id)
                .then(response => {
                    setUser({
                        ...user,
                        ...response.data
                    })
                })
        }
        ).catch(err => {
            console.warn(err)
        })
    }, [])

    useEffect(() => {
        const { contactDetails, emergencyDetails } = user
        console.log({contactDetails, emergencyDetails})
    }, [user])


    return (
        <ProfileContext.Provider value={[user, setUser]}>
            <ScrollView>
                <View style={{ padding: 15 }}>
                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                        <Avatar.Image size={80} source={{ uri: user.avatarURL }} />
                        <Subheading>{user.name.firstName} {user.name.lastName}</Subheading>
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
        </ProfileContext.Provider>

    )

}