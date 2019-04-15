import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Appbar, ProgressBar } from 'react-native-paper'
import StepContext from '../components/Wizard/StepContext'

export default function WizardHeader({ children }) {

    const stepState = useState(1)
    return (
        <StepContext.Provider value={stepState}>
            <View>
                <Appbar.Header style={{ backgroundColor: '#ffffff' }}>
                    {stepState > 1 &&
                        <Appbar.BackAction onPress={() => console.log('Pressed archive')} />

                    }
                    <Appbar.Content
                        title="Setup"
                    />
                </Appbar.Header>
                <View style={{ margin: 0, padding: 0, paddingHorizontal: 15, height: 15}}>
                <ProgressBar

                    progress={0.8}
                />
            </View>
            {children}

            </View>
        </StepContext.Provider >
    )
}

WizardHeader.defaultProps = {
    children: null,
};

WizardHeader.propTypes = {
    children: PropTypes.node,
};
