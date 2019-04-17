import React, { useState, useContext } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import Modal from "react-native-modal";
import { Headline, Subheading, Button, Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


import WizardContext from './StepContext'

import Profile from './Profile'
import Assessment from './Assessment'
import Goal from './Goal'
import Schedule from './Schedule'
import Exercise from './Exercise'


export default function MultiStep() {

    let [step, stepStep] = useContext(WizardContext)

    switch (step) {
        case 0:
            return <Profile />
        case 1:
            return <Assessment />
        case 2:
            return <Goal />
        case 3:
            return <Schedule />
        case 4:
            return <Exercise />
    }
}