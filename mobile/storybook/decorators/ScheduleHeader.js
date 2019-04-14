import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper'

export default function ScheduleHeader({ children }) {
    return <View>
        <Appbar.Header style={{backgroundColor: '#ffffff'}}>
        <Appbar.Content
            title="Your Schedule"
        />
    </Appbar.Header>
    {children}
    </View>
}

ScheduleHeader.defaultProps = {
    children: null,
};

ScheduleHeader.propTypes = {
    children: PropTypes.node,
};
