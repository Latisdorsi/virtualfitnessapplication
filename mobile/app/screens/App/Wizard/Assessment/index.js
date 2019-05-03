import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native"
import { Headline, Subheading, Divider, Button } from "react-native-paper";

import { default as CardioRespiratoryTest } from './CardioRespiratoryTest'
import { default as UpperBodyTest } from './UpperBodyTest'
import { default as LowerBodyTest } from './LowerBodyTest'
import { default as MuscleEnduranceTest } from './MuscleEnduranceTest'
import { default as FlexibilityTest } from './FlexibilityTest'

import StepContext from '../StepContext'
import WizardContext from '../WizardContext'

const flexibilityData = [
    { key: 0, label: '20' },
    { key: 1, label: '20' }
]


export default function Assessment() {

    let [step, setStep] = useContext(StepContext)
    let [setupData, setSetupData] = useContext(WizardContext)

    let [upperBodyStrength, setUpperBodyStrength] = useState({
        level: 'Undefined',
        oneRepMax: 0,
        weightRatio: 0
    })

    let [lowerBodyStrength, setLowerBodyStrength] = useState({
        level: 'Undefined',
        oneRepMax: 0,
        weightRatio: 0
    })

    let [muscleEndurance, setMuscleEndurance] = useState({
        level: 'Undefined',
        pushUpScore: 0
    })

    let [flexibility, setFlexibility] = useState({
        level: 'Undefined',
        flexibilityScore: 0
    })

    useEffect(() => {
        const newSetupData = {
            ...setupData,
            upperBodyStrength,
        }
        setSetupData(newSetupData)
        console.log(setupData)
    }, [upperBodyStrength])


    useEffect(() => {
        const newSetupData = {
            ...setupData,
            lowerBodyStrength,
        }
        setSetupData(newSetupData)
        console.log(setupData)
    }, [lowerBodyStrength])


    useEffect(() => {
        const newSetupData = {
            ...setupData,
            muscleEndurance,

        }

        setSetupData(newSetupData)
        console.log(setupData)
    }, [muscleEndurance])


    useEffect(() => {
        const newSetupData = {
            ...setupData,
            flexibility
        }

        setSetupData(newSetupData)
        console.log(setupData)
    }, [flexibility])

    return (
        <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
            <Headline>Fitness Level Assessment</Headline>
            <Subheading>Answer each item as accurately as you can</Subheading>

            <View >
                <Text>Score</Text>
            </View>
            <View style={{ marginVertical: 15, padding: 15 }}>
                <CardioRespiratoryTest />
            </View>
            <Divider />

            <View style={{ marginVertical: 15, padding: 15 }}>
                <UpperBodyTest setValue={setUpperBodyStrength} value={upperBodyStrength} />
            </View>

            <Divider />

            <View style={{ marginVertical: 15, padding: 15 }}>
                <LowerBodyTest setValue={setLowerBodyStrength} value={lowerBodyStrength} />
            </View>

            <Divider />

            <View style={{ marginVertical: 15, padding: 15 }}>
                <MuscleEnduranceTest setValue={setMuscleEndurance} value={muscleEndurance} />
            </View>

            <Divider />

            <View style={{ marginVertical: 15, padding: 15 }}>
                <FlexibilityTest setValue={setFlexibility} />
            </View>

            <Button onPress={() => {
                setStep(2)
            }}>
                Next
                </Button>
        </View>
    )
}

