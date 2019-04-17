import React, { useState } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import Modal from "react-native-modal";
import { Headline, Subheading, Button, Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import WizardContext from './WizardContext'

export { default as Profile } from './Profile'
export { default as Assessment } from './Assessment'
export { default as Goal } from './Goal'
export { default as Schedule } from './Schedule'
export { default as Exercise } from './Exercise'
export { default as MultiStep } from './MultiStep'


const setupData = {
    age: 0,
    sex: 'Undefined',
    height: 0,
    weight: 0,
    neck: 0,
    waist: 0,
    hips: 0,
    bodyComposition: {
        compositionLevel: 'Undefined',
        bodyFatPercentage: 0,
        leanBodyMassPercentage: 0
    },
    upperBodyStrength: {
        level: 'Undefined',
        oneRepMax: 0,
        weightRatio: 0
    },
    lowerBodyStrength: {
        level: 'Undefined',
        oneRepMax: 0,
        weightRatio: 0
    },
    muscleEndurance: {
        level: 'Undefined',
        pushUpScore: 0
    },
    flexibility: {
        level: 'Undefined',
        flexibilityScore: 0
    },
    goal: 0,
    schedule: 0
}

export default function Wizard({ children }) {

    const setupState = useState(setupData)

    return (
        <WizardContext.Provider value={setupState}>
            <ScrollView>
                <View
                    style={{ padding: 15 }}>
                    {children}
                </View>
            </ScrollView>
        </WizardContext.Provider>
    );
}