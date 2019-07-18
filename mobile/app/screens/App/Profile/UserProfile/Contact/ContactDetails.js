import React from 'react'
import { View, Text } from 'react-native'
import RowViewComponent from 'lib/components/RowViewComponent'

const ContactDetails = ({ value }) => {

    return (
        <View>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Address
                 </Text>
                <Text>{value.contactDetails.address ? value.contactDetails.address : 'Not Set'}</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Mobile Phone
                 </Text>
                <Text>{value.contactDetails.phone.mobile ? value.contactDetails.phone.mobile : 'Not Set'}</Text>
            </RowViewComponent>
        </View>
    )
}

export default ContactDetails