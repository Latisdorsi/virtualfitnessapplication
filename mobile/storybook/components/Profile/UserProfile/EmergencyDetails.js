import React from 'react'
import {View, Text} from 'react-native'
import RowViewComponent from '../../RowViewComponent'


const EmergencyDetails = ({ value }) => {
    return (
        <View>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Name
                 </Text>
                <Text>{value.name}</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    number
                 </Text>
                <Text>{value.number}</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Relationship
                 </Text>
                <Text>{value.relationship}</Text>
            </RowViewComponent>
        </View>
    )
}

export default EmergencyDetails