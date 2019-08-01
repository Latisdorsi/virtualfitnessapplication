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
import Assessment from "./Assessment"
import Goal from './Goal';
import Schedule from './Schedule';
import Routine from "./Routine";
import Confirmation from "./Confirmation";


const WizardNavigator = createAppContainer(createStackNavigator({

    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile'
        }
    },
    Assessment: {
        screen: Assessment,
        navigationOptions: {
            title: 'Assessment'
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
    },
    Confirmation: {
        screen: Confirmation,
        navigationOptions: {
            title: 'Confirmation',
            header: null
        }
    }

}));

export default class Wizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 0,
            sex: '',
            height: 0,
            weight: 0,
            neck: 0,
            waist: 0,
            hips: 0,
            level: 0,
            upperBodyStrength: {
                level: 0,
                oneRepMax: 0,
                weightRatio: 0
            },
            lowerBodyStrength: {
                level: 0,
                oneRepMax: 0,
                weightRatio: 0
            },
            muscleEndurance: {
                level: 0,
                pushUpScore: 0
            },
            flexibility: {
                level: 0,
                flexibilityScore: 0
            },
            goal: 0,
            schedule: 0,
            composition: {
                category: 'Undefined',
                percentBodyFat: 0,
                percentLeanMass: 0
            }
        }
        this.setAge = (age) => this.setState({ age });
        this.setSex = (sex) => this.setState({ sex });
        this.setWeight = (weight) => this.setState({ weight });
        this.setHeight = (height) => this.setState({ height });
        this.setNeck = (neck) => this.setState({ neck });
        this.setWaist = (waist) => this.setState({ waist });
        this.setHips = (hips) => this.setState({ hips });
        this.setGoal = (goal) => this.setState({ goal });
        this.setSchedule = (schedule) => this.setState({ schedule });
        this.setComposition = (composition) => this.setState({ composition });
        this.setLevel = (level) => this.setState({ level });
        this.setUpperBodyStrength = (upperBodyStrength) => this.setState({ upperBodyStrength });
        this.setLowerBodyStrength = (lowerBodyStrength) => this.setState({ lowerBodyStrength });
        this.setMuscleEndurance = (muscleEndurance) => this.setState({ muscleEndurance });
        this.setFlexibility = (flexibility) => this.setState({ flexibility });
    }


    render() {
        // {console.warn(this.props)}
        const {
            setAge,
            setSex,
            setWeight,
            setHeight,
            setNeck,
            setWaist,
            setHips,
            setGoal,
            setSchedule,
            setComposition,
            setLevel,
            setUpperBodyStrength,
            setLowerBodyStrength,
            setMuscleEndurance,
            setFlexibility } = this;
        const context = this.state;
        return (
            <>
                <WizardContext.Provider value={{
                    context,
                    setAge,
                    setSex,
                    setWeight,
                    setHeight,
                    setNeck,
                    setWaist,
                    setHips,
                    setGoal,
                    setSchedule,
                    setComposition,
                    setLevel,
                    setUpperBodyStrength,
                    setLowerBodyStrength,
                    setMuscleEndurance,
                    setFlexibility
                }}>
                    <WizardNavigator screenProps={{ rootNavigation: this.props.screenProps.rootNavigation }} />
                </WizardContext.Provider>
            </>
        );
    }
}