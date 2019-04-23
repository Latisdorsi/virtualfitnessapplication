import React from 'react'
import {View, Text} from 'react-native'
import RowViewComponent from '../../RowViewComponent'

const ContactDetails = ({ value }) => {
    return (
        <View>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Address
                 </Text>
                <Text>{value.address}</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Mobile Phone
                 </Text>
                <Text>{value.mobilePhone}</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Work Phone
                 </Text>
                <Text>{value.workPhone}</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Home Phone
                 </Text>
                <Text>{value.homePhone}</Text>
            </RowViewComponent>
        </View>
    )
}

export default ContactDetails