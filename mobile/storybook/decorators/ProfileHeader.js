import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Avatar, Appbar } from 'react-native-paper'

export default function ProfileHeader({ children }) {
    return (
        <View>
            <Appbar.Header style={{ backgroundColor: '#ffffff' }}>
                <Appbar.Action icon="keyboard-arrow-down" onPress={() => console.log('Pressed archive')} />
                <Appbar.Content
                    title="Today's Workout"
                    subtitle="00:50"
                />
            </Appbar.Header>
            <Avatar.Image size={80} source={require('./1512637940449.jpg')} />
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
