import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper'

export default function ExerciseHeader({ children }) {
    return <View style={{ flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: '#ffffff' }}>
            <Appbar.BackAction
                onPress={this._goBack}
            />
            <Appbar.Content
                title="Barbell Squat"
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
