import React, { useState, useContext } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native"
import { Headline, Subheading, Divider, Button } from "react-native-paper";

import { default as CardioRespiratoryTest } from './CardioRespiratoryTest'
import { default as UpperBodyTest } from './UpperBodyTest'
import { default as LowerBodyTest } from './LowerBodyTest'
import { default as MuscleEnduranceTest } from './MuscleEnduranceTest'
import { default as FlexibilityTest } from './FlexibilityTest'

import WizardContext from '../StepContext'

export default function Assessment() {

  let [step, setStep] = useContext(WizardContext)
    return (
        <ScrollView>
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
                    <UpperBodyTest />
                </View>

                <Divider />

                <View style={{ marginVertical: 15, padding: 15 }}>
                    <LowerBodyTest />
                </View>

                <Divider />

                <View style={{ marginVertical: 15, padding: 15 }}>
                    <MuscleEnduranceTest />
                </View>

                <Divider />

                <View style={{ marginVertical: 15, padding: 15 }}>
                    <FlexibilityTest />
                </View>
                <Button onPress={() => {
                    setStep(3)
                }}>
                    Next
        </Button>
            </View>
        </ScrollView>
    )
}

