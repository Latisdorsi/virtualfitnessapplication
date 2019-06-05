import React, { useState } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import Modal from "react-native-modal";
import { Headline, Subheading, Button, Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { createAppContainer, createStackNavigator } from "react-navigation";



import WizardContext from './WizardContext';
import { CalculateComposition } from 'lib/helpers/utils';

import Profile from './Profile';
import Goal from './Goal';
import Schedule from './Schedule';
import Routine from "./Routine";
// import Exercise from './Exercise';
// import Assessment from './Assessment';
// export { default as Profile } from './Profile'
// export { default as Assessment } from './Assessment'
// export { default as Goal } from './Goal'
// export { default as Schedule } from './Schedule'
// export { default as Exercise } from './Exercise'
// export { default as MultiStep } from './MultiStep'


const setupData = {
    age: 0,
    sex: 'Undefined',
    height: 0,
    weight: 0,
    neck: 0,
    waist: 0,
    hips: 0,
    bodyComposition: {
        compositionLevel: 'Undefined',
        bodyFatPercentage: 0,
        leanBodyMassPercentage: 0
    },
    upperBodyStrength: {
        level: 'Undefined',
        oneRepMax: 0,
        weightRatio: 0
    },
    lowerBodyStrength: {
        level: 'Undefined',
        oneRepMax: 0,
        weightRatio: 0
    },
    muscleEndurance: {
        level: 'Undefined',
        pushUpScore: 0
    },
    flexibility: {
        level: 'Undefined',
        flexibilityScore: 0
    },
    goal: 0,
    schedule: 0
}
const WizardNavigator = createAppContainer(createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile'
        }
    },
    Goal: {
        screen: Goal,
        navigationOptions: {
            title: 'Goal'
        }
    },
    Schedule: {
        screen: Schedule,
        navigationOptions: {
            title: 'Schedule'
        }
    },
    Routine: {
        screen: Routine,
        navigationOptions: {
            title: 'Routine'
        }
    }
}));

export default class Wizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'name',
            age: 0,
            sex: 'Male',
            weight: 0,
            height: 0,
            neck: 0,
            wasit: 0,
            hips: 0,
            composition: CalculateComposition(this.age, this.sex, this.weight, this.height, this.neck, this.waist, this.hips)
        }
    }


    render() {
        return (
            <>
            <WizardContext.Provider value={this.state}>
                <WizardNavigator screenProps={{title:'Title'}}/>
            </WizardContext.Provider>
            </>
        );
    }
}