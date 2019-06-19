import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import RowViewComponent from 'lib/components/RowViewComponent'
import { IconButton, Subheading } from 'react-native-paper';

import ContactDetails from './ContactDetails';
import EditableContactDetails from './EditableContactDetails';

import ProfileContext from '../ProfileContext';

const Contact = () => {

    const [user, setUser] = useContext(ProfileContext);
    const [isContactEditable, setContactEditable] = useState(false);
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
                    (<EditableContactDetails value={user} setValue={setUser} editable={setContactEditable} />) :
                    (<ContactDetails value={user} />)
            }
        </View>
    )

}

export default Contact
