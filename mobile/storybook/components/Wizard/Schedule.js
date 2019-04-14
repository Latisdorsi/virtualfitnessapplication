import React, { useState } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import Modal from "react-native-modal";
import { Headline, Subheading, Button, Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


const radio_props = [
    { label: '3 Days a Week', value: 0 },
    { label: '5 Days a Week', value: 1 },
    { label: 'Full Week', value: 2 }
];


export default function Schedule() {
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
        </View >
    )
}