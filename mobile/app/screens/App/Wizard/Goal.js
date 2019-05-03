import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import Modal from "react-native-modal";
import { Headline, Subheading, Button, Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const radio_props = [
    { label: 'Tone Muscle and Lose Weight', value: 0 },
    { label: 'Increase Muscle Mass and Size', value: 1 },
    { label: 'Get Stronger Lifts', value: 2 },
    { label: 'General Fitness', value: 3 }
];

import StepContext from './StepContext'
import WizardContext from './WizardContext'


export default function Goal() {
    let [setupData, setSetupData] = useContext(WizardContext)

    let [step, setStep] = useContext(StepContext)

    let [goal, setGoal] = useState(0)

    useEffect(() => {
        let newData = {
            ...setupData,
            goal
        }
        setSetupData(newData)
        console.log(setupData)
    })

    return (
        <View>
            <Subheading>Goal</Subheading>
            <View>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value) => { setGoal(value) }}
                />
            </View>
            <Button onPress={() => {
                setStep(3)
            }}>
                Next
        </Button>
        </View>
    )
}
