import React, { useState } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import Modal from "react-native-modal";
import { Headline, Subheading, Button, Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


export { default as Profile } from './Profile'
export { default as Assessment} from './Assessment'
export { default as Goal} from './Goal'
export { default as Schedule} from './Schedule'
export { default as Exercise} from './Exercise'


export default function Wizard({ children }) {
    return (
        <View>
            {children}
        </View>
    );
}