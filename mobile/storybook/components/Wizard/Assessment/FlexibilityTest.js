import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native"
import { Headline, Subheading, Card } from "react-native-paper";

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


export default function FlexibilityTest() {
    const [flexibility, setFlexibility] = useState(0)
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Subheading>Flexibility Test</Subheading>
            <Text>Score:</Text>
            <ModalSelector
                data={flexibilityData}
                initValue="Enter Reach Length"
                onChange={(option) => { setFlexibility(option.label) }} />
        </View>
    )
}
