import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Avatar, Card, IconButton, Subheading } from 'react-native-paper';
import ContactDetails from './ContactDetails'
import EditableContactDetails from './EditableContactDetails'
import EmergencyDetails from './EmergencyDetails'
import EditableEmergencyDetails from './EditableEmergencyDetails'

const UserProfile = () => {
    let [isContactEditable, setContactEditable] = useState(false)
    let [isEmergencyEditable, setEmergencyEditable] = useState(false)

    let [contactDetails, setContactDetails] = useState({
        address: 'N/A',
        mobilePhone: 0,
        homePhone: 0,
        workPhone: 0
    })

    let [emergencyDetails, setEmergencyDetails] = useState({
        name: 'N/A',
        number: 0,
        relationship: 'N/A'
    })

    return (
        <ScrollView>
            <View style={{ padding: 15 }}>
                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                    <Avatar.Image size={80} source={require('./1512637940449.jpg')} />
                    <Subheading>Christopher John Cuna</Subheading>
                    <Text>Male, 23</Text>
                </View>
                <Card style={{ padding: 15, marginVertical: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        alignContent: 'center',
                    }}>
                        <Subheading>Contact Details</Subheading>

                        <IconButton
                            icon="edit"
                            size={20}
                            onPress={() => {
                                if (!isContactEditable)
                                    setContactEditable(true)
                                else
                                    setContactEditable(false)
                            }}
                        />
                    </View>
                    {
                        isContactEditable ?
                            (<EditableContactDetails value={contactDetails} setValue={setContactDetails} />) :
                            (<ContactDetails value={contactDetails} />)
                    }
                </Card>
                <Card style={{ padding: 15, marginVertical: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Subheading>Emergency Contact Details</Subheading>
                        <IconButton
                            icon="edit"
                            size={20}
                            onPress={() => {
                                if (!isEmergencyEditable)
                                    setEmergencyEditable(true)
                                else
                                    setEmergencyEditable(false)
                            }}
                        />
                    </View>

                    {
                        isEmergencyEditable ?
                            (<EditableEmergencyDetails value={emergencyDetails} setValue={setEmergencyDetails} />) :
                            (<EmergencyDetails value={emergencyDetails} />)
                    }
                </Card>

            </View>
        </ScrollView>
    )
}

export default UserProfile