import React from 'react'
import {View, Text} from 'react-native'
import RowViewComponent from 'lib/components/RowViewComponent'


const EmergencyDetails = ({ value }) => {

    return (
        <View>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Name
                 </Text>
                <Text>{value.emergencyDetails.fullName || 'Not Set'}</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Number
                 </Text>
                <Text>{value.emergencyDetails.contactNumber || 'Not Set'}</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Relationship
                 </Text>
                <Text>{value.emergencyDetails.relationship || 'Not Set'}</Text>
            </RowViewComponent>
        </View>
    )
}

export default EmergencyDetails