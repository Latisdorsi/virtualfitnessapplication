import React, { useState } from 'react'
import { View, Text } from 'react-native'
import RowViewComponent from 'lib/components/RowViewComponent'
import { IconButton, Subheading } from 'react-native-paper';

import EmergencyDetails from './EmergencyDetails'
import EditableEmergencyDetails from './EditableEmergencyDetails'

export function Emergency() {

    let [isEmergencyEditable, setEmergencyEditable] = useState(false)

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
                    (<EditableEmergencyDetails value={emergencyDetails} setValue={setEmergencyDetails} />) :
                    (<EmergencyDetails value={emergencyDetails} />)
            }
        </View>
    )

}

export default Emergency