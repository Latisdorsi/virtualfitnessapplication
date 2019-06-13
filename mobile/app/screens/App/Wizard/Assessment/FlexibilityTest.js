import React, { useState, useEffect } from "react";
import { View, Text } from "react-native"
import { Subheading } from "react-native-paper";

import ModalSelector from 'react-native-modal-selector'

let index = 0

const flexibilityData = [
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
    { key: index++, label: '36' },
    { key: index++, label: '37' },
    { key: index++, label: '38' },
    { key: index++, label: '39' },
    { key: index++, label: '40' },

]

const calculateScore = (gender, flexibilityScore, age) => {
    if (gender == 'Male') {
        if (age > 20 && age < 30) {
            if (flexibilityScore >= 40) {
                return 5;
            }
            else if (flexibilityScore <= 39 && flexibilityScore >= 34) {
                return 4;
            }
            else if (flexibilityScore <= 33 && flexibilityScore >= 30) {
                return 3;
            }
            else if (flexibilityScore <= 29 && flexibilityScore >= 25) {
                return 2;
            }
            else if (flexibilityScore < 25) {
                return  1;
            }
        }
    }
}

export default function FlexibilityTest({setValue}) {
    const gender = 'Male'
    const age = 23;

    const [flexibilityScore, setFlexibilityScore] = useState(0)
    const [level, setLevel] = useState(0)


    useEffect(() => {
        setLevel(calculateScore(gender, flexibilityScore, age))

    }, [flexibilityScore])

    useEffect(() =>{
        const newFlexibilityScore = {
            level,
            flexibilityScore
        }
        setValue(newFlexibilityScore)
    }, [level])

    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Subheading>Flexibility Test</Subheading>
            <Text>Score: {level}</Text>
            <ModalSelector
                data={flexibilityData}
                initValue="Enter Reach Length"
                onChange={(option) => { setFlexibilityScore(option.label) }} />
        </View>
    )
}
