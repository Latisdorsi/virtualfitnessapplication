import React, { useState } from 'react'
import { View } from 'react-native'
import RowViewComponent from 'lib/components/RowViewComponent'
import { IconButton, Subheading } from 'react-native-paper';

import ContactDetails from './ContactDetails'
import EditableContactDetails from './EditableContactDetails'

export function Contact() {

    let [isContactEditable, setContactEditable] = useState(false)

    let [contactDetails, setContactDetails] = useState({
        address: 'N/A',
        mobilePhone: 0,
        homePhone: 0,
        workPhone: 0
    })
    return (
        <View>
            <RowViewComponent>
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
            </RowViewComponent>
            {
                isContactEditable ?
                    (<EditableContactDetails value={contactDetails} setValue={setContactDetails} />) :
                    (<ContactDetails value={contactDetails} />)
            }
        </View>
    )

}

export default Contact
