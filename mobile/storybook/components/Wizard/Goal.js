import React, { useState } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import Modal from "react-native-modal";
import { Headline, Subheading, Button, Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const radio_props = [
    { label: 'Tone Muscle and Lose Weight', value: 0 },
    { label: 'Increase Muscle Mass and Size', value: 1 },
    { label: 'Tone Muscle and Lose Weight', value: 2 },
    { label: 'General Fitness', value: 3 }
];



export default function Goal() {
    return (
        <View
            style={{
                paddingHorizontal: 15,
                paddingVertical: 15,

            }}>
            <Subheading>Goal</Subheading>
            <View>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value) => { }}
                />
            </View>
        </View>
    )
}
