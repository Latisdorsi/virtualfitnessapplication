import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper'

import Route from '../components/Profile/Route'

export default function ProfileHeader({ children }) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{backgroundColor: '#663399'}}>
                <Appbar.Header style={{ backgroundColor: '#663399' }}>
                    <Appbar.Content
                        title="Profile"
                    />
                </Appbar.Header>
          
            </View>
            {children}
        </View>
    )
}

ProfileHeader.defaultProps = {
    children: null,
};

ProfileHeader.propTypes = {
    children: PropTypes.node,
};
