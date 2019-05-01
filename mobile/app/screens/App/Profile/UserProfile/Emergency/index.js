import React, { useState, useContext } from 'react'
import { View, Text } from 'react-native'
import RowViewComponent from 'lib/components/RowViewComponent'
import { IconButton, Subheading } from 'react-native-paper';

import EmergencyDetails from './EmergencyDetails'
import EditableEmergencyDetails from './EditableEmergencyDetails'

import ProfileContext from '../ProfileContext'

export function Emergency() {

    const [isEmergencyEditable, setEmergencyEditable] = useState(false)
    const [user, setUser] = useContext(ProfileContext)

    let [emergencyDetails, setEmergencyDetails] = useState({
        name: 'N/A',
        number: 0,
        relationship: 'N/A'
    })

    return (
        <View>
            <RowViewComponent>
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
            </RowViewComponent>

            {
                isEmergencyEditable ?
                    (<EditableEmergencyDetails value={user} setValue={setUser} editable={setEmergencyEditable} />) :
                    (<EmergencyDetails value={user} />)
            }
        </View>
    )

}

export default Emergency