import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native"
import { Headline, Subheading, Card } from "react-native-paper";

import ModalSelector from 'react-native-modal-selector'

let index = 0

const pushUpData = [
    { key: index++, label: '0' },
    { key: index++, label: '1' },
    { key: index++, label: '2' },
    { key: index++, label: '3' },
    { key: index++, label: '4' },
    { key: index++, label: '5' },
    { key: index++, label: '6' },
    { key: index++, label: '7' },
    { key: index++, label: '8' },
    { key: index++, label: '9' },
    { key: index++, label: '10' },
    { key: index++, label: '11' },
    { key: index++, label: '12' },
    { key: index++, label: '13' },
    { key: index++, label: '14' },
    { key: index++, label: '15' },
    { key: index++, label: '16' },
    { key: index++, label: '17' },
    { key: index++, label: '18' },
    { key: index++, label: '19' },
    { key: index++, label: '20' },
    { key: index++, label: '21' },
    { key: index++, label: '20' },
    { key: index++, label: '21' },
    { key: index++, label: '22' },
    { key: index++, label: '23' },
    { key: index++, label: '24' },
    { key: index++, label: '25' },
    { key: index++, label: '26' },
    { key: index++, label: '27' },
    { key: index++, label: '28' },
    { key: index++, label: '29' },
    { key: index++, label: '30' },
    { key: index++, label: '31' },
    { key: index++, label: '30' },
    { key: index++, label: '31' },
    { key: index++, label: '32' },
    { key: index++, label: '33' },
    { key: index++, label: '34' },
    { key: index++, label: '35' },
    { key: index++, label: '36' }
]


const calculateScore = (gender, pushUpScore, age) => {
    if (gender == 'Male') {
        if (age > 20 && age < 30) {
            if (pushUpScore >= 36) {
                return 5;
            }
            if (pushUpScore <= 35 && pushUpScore >= 29) {
                return 4;
            }
            if (pushUpScore <= 28 && pushUpScore >= 22) {
                return 3;
            }
            if (pushUpScore <= 21 && pushUpScore >= 17) {
                return 2;
            }
            if (pushUpScore < 17 && pushUpScore > 0) {
                return 1;
            }
            else{
                return 0;
            }
        }
    }
}

export default function MuscleEnduranceTest({setValue}) {

    const gender = 'Male';
    const weight = 63;
    const age = 23;
    const [pushUpScore, setPushUpScore] = useState(0);
    const [level, setLevel] = useState(0);

    useEffect(() => {
        setLevel(calculateScore(gender, pushUpScore, age));
    }, [pushUpScore]);

    useEffect(()=> {
        const newMuscleEndurance ={
            pushUpScore,
            level
        }
        setValue(newMuscleEndurance);
    }, [level])


    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Subheading>Muscular Endurance</Subheading>
            <Text>Instructions</Text>
            <Text>Score: {level}</Text>
            <ModalSelector
                data={pushUpData}
                initValue="Enter Max Push-Up"
                onChange={(option) => { setPushUpScore(option.label) }} />
            <Text>Max Push-Ups</Text>
        </View>
    )
}