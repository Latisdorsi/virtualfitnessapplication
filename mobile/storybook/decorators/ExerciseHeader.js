import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper'

export default function ExerciseHeader({ children }) {
    return <View>
        <Appbar.Header style={{backgroundColor: '#ffffff'}}>
        <Appbar.Action icon="keyboard-arrow-down" onPress={() => console.log('Pressed archive')} />
        <Appbar.Content
            title="Today's Workout"
            subtitle="00:50"
        />
        <Appbar.Action icon="check" onPress={() => console.log('Pressed Finished')} />
    </Appbar.Header>
    {children}
    </View>
}

ExerciseHeader.defaultProps = {
    children: null,
};

ExerciseHeader.propTypes = {
    children: PropTypes.node,
};
