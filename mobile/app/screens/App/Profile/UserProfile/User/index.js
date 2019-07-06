import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import RowViewComponent from 'lib/components/RowViewComponent'
import { IconButton, Subheading } from 'react-native-paper';

import UserDetails from './UserDetails';
import EditableUserDetails from './EditableUserDetails';

import ProfileContext from '../ProfileContext';

const User = () => {

    const [user, setUser] = useContext(ProfileContext);
    const [isContactEditable, setContactEditable] = useState(false);
    return (
        <View>
            <RowViewComponent>
                <Subheading>User Details</Subheading>
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
                    (<EditableUserDetails value={user} setValue={setUser} editable={setContactEditable} />) :
                    (<UserDetails value={user} />)
            }
        </View>
    )

}

export default User
