import React from 'react'
import {View, Text} from 'react-native'
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
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Work Phone
                 </Text>
                <Text>{value.contactDetails.phone.work ? value.contactDetails.phone.work : 'Not Set'}</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Home Phone
                 </Text>
                <Text>{value.contactDetails.phone.home ? value.contactDetails.phone.home : 'Not Set'}</Text>
            </RowViewComponent>
        </View>
    )
}

export default ContactDetails