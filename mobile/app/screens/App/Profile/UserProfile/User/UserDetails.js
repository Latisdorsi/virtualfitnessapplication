import React from 'react'
import {View, Text} from 'react-native'
import RowViewComponent from 'lib/components/RowViewComponent'

const ContactDetails = ({ value }) => {
 
    return (
        <View>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    First Name
                 </Text>
                <Text>{value.name.firstName ? value.name.firstName : 'Not Set'}</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Last Name
                 </Text>
                <Text>{value.name.lastName ? value.name.lastName : 'Not Set'}</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Text
                    style={{ fontSize: 16 }}>
                    Middle Initial
                 </Text>
                <Text>{value.name.middleInitial ? value.name.middleInitial : 'Not Set'}</Text>
            </RowViewComponent>
        </View>
    )
}

export default ContactDetails