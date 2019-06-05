import React, { Children, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Appbar, ProgressBar } from 'react-native-paper'
import StepContext from '../components/Wizard/StepContext'

const Header = () => {
    let [step, setStep] = useContext(StepContext)
    goBackOneStep = () => {
        setStep(step - 1)
    }

    return (
        <Appbar.Header style={{ backgroundColor: '#ffffff' }}>
        { step > 0 &&
            <Appbar.BackAction onPress={() => {
                goBackOneStep()
            }} />
        }
            <Appbar.Content
                title="Setup"
            />
        </Appbar.Header>
    )
}

export default function WizardHeader({ children }) {

    const stepState = useState(0)

    return (

        <StepContext.Provider value={stepState}>
              
            <View style={{ flex: 1 }}>
                <Header />
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
