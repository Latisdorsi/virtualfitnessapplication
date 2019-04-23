import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper'

export default function ExerciseListHeader({ children }) {
    return <View style={{ flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: '#ffffff' }}>
            <Appbar.Content
                title="List of Exercises"
            />
            <Appbar.Action icon="settings" onPress={() => console.log('Pressed Finished')} />
        </Appbar.Header>
        {children}
    </View>
}

ExerciseListHeader.defaultProps = {
    children: null,
};

ExerciseListHeader.propTypes = {
    children: PropTypes.node,
};
