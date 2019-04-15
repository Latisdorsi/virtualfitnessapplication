import React, { useState, useContext } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import Modal from "react-native-modal";
import { Headline, Subheading, Button, Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import WizardContext from './StepContext'

const radio_props = [
    { label: '3 Days a Week', value: 0 },
    { label: '5 Days a Week', value: 1 },
    { label: 'Full Week', value: 2 }
];


export default function Schedule() {
    let [step, setStep] = useContext(WizardContext)
    return (
        <View style={{
            paddingHorizontal: 15,
            paddingVertical: 15
        }}>
            <Headline>Schedule</Headline>
            <View>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value) => { }}
                />
            </View>
            <Button onPress={() => {
                setStep(4)
            }}>
                Next
        </Button>
        </View >
    )
}