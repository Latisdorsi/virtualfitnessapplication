import React, { useState } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import { Headline, Subheading, Button, Card, Portal, Dialog, Paragraph } from "react-native-paper";
import WizardContext from "./WizardContext";
import axios from 'axios';
import RowViewComponent from 'lib/components/RowViewComponent';
// import RowViewComponent from 'lib/components';

export default class Routine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPromptVisible: false
        }

        this._hideDialog = this._hideDialog.bind(this);
        this._showDialog = this._showDialog.bind(this);
    }


    getDates = (startDate, endDate, schedule) => {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        arrDate = [];

        while (startDate < endDate) {
            startDate.setDate(startDate.getDate() + 1);
            switch (schedule) {
                case 0:
                    if (startDate.getDay() == 1) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 3) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 5) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    break;

                case 1:
                    if (startDate.getDay() == 1) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 2) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 3) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 4) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 5) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    break;
                case 2:
                    if (startDate.getDay() == 0) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 1) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 2) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 3) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 4) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 5) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    else if (startDate.getDay() == 6) {
                        arrDate.push(new Date(startDate).getTime());
                    }
                    break;
            }
        }
        return arrDate;
    }
    _showDialog = () => this.setState({ isPromptVisible: true });

    _hideDialog = () => this.setState({ isPromptVisible: false });

    render() {
        const { navigate } = this.props.navigation;

        


        _getGoal = (goal) => {
            switch (goal) {
                case 0:
                    return 'Tone Muscle and Lose Weight';

                case 1:
                    return 'Increase Muscle Mass and Size';

                case 2:
                    return 'Get Stronger Lifts';

                case 3:
                    return 'General Fitness';

                default:
                    return 'Unknown';

            }
        }

        _getSchedule = (schedule) => {
            switch (schedule) {
                case 0:
                    return '3 Days a Week';

                case 1:
                    return '5 Days a Week';

                case 2:
                    return 'Full Week';

                default:
                    return 'Unknown';

            }
        }

        return (
            <WizardContext.Consumer>
                {(context) =>
                    <ScrollView>
                        <View style={{ padding: 20 }}>
                            <Headline>Thank you for filling up all the forms</Headline>

                            <View stlye={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                <Subheading>Body Composition</Subheading>
                                <Text>Composition Level: {context.context.composition.category}</Text>
                                <Text>Body Fat Percentage: {context.context.composition.percentBodyFat.toString().substr(0, 5)}%</Text>
                                <Text>Lean Body Mass Percentage: {context.context.composition.percentLeanMass.toString().substr(0, 5)}%</Text>
                            </View>
                            <RowViewComponent>
                                <Text>Age</Text>
                                <Text>{context.context.age}</Text>
                            </RowViewComponent>
                            <RowViewComponent>
                                <Text>Sex</Text>
                                <Text>{context.context.sex}</Text>
                            </RowViewComponent>
                            <RowViewComponent>
                                <Text>Height</Text>
                                <Text>{context.context.height}</Text>
                            </RowViewComponent>
                            <RowViewComponent>
                                <Text>Weight</Text>
                                <Text>{context.context.weight}</Text>
                            </RowViewComponent>
                            <RowViewComponent>
                                <Text>Neck</Text>
                                <Text>{context.context.neck}</Text>
                            </RowViewComponent>
                            <RowViewComponent>
                                <Text>Waist</Text>
                                <Text>{context.context.waist}</Text>
                            </RowViewComponent>
                            <RowViewComponent>
                                <Text>Hips</Text>
                                <Text>{context.context.hips}</Text>
                            </RowViewComponent>
                            <RowViewComponent>
                                <Text>Fitness Level</Text>
                                <Text>{context.context.level}</Text>
                            </RowViewComponent>
                            <RowViewComponent>
                                <Text>Fitness Goal</Text>
                                <Text>{_getGoal(context.context.goal)}</Text>
                            </RowViewComponent>
                            <RowViewComponent>
                                <Text>Schedule</Text>
                                <Text>{_getSchedule(context.context.schedule)}</Text>
                            </RowViewComponent>

                            <Button
                                mode="contained"
                                onPress={() => { this._showDialog() }}
                            >
                                Generate Exercises
                                </Button>
                            <Portal>
                                <Dialog
                                    visible={this.state.isPromptVisible}
                                    onDismiss={this._hideDialog}>
                                    <Dialog.Title>Finalize Data</Dialog.Title>
                                    <Dialog.Content>
                                        <Paragraph>Are you sure your data is accurate? We will save your data and generate a routine.</Paragraph>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button onPress={this._hideDialog}>No</Button>
                                        <Button onPress={() => {

                                            const cycleObj = {
                                                level: context.context.level,
                                                goal: context.context.goal,
                                                schedule: context.context.schedule,
                                                assessment: {
                                                    upperBodyStrength: context.context.upperBodyStrength,
                                                    lowerBodyStrength: context.context.lowerBodyStrength,
                                                    muscleEndurance: context.context.muscleEndurance,
                                                    flexibility: context.context.flexibility
                                                }
                                            }


                                            const measurementObj = {
                                                weight: context.context.weight,
                                                neck: context.context.neck,
                                                waist: context.context.waist,
                                                hips: context.context.hips,
                                                composition: context.context.composition
                                            }

                                            let dates;

                                            axios.post('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408', cycleObj)
                                                .then(() => {
                                                    // console.warn('Success');
                                                    return axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408')
                                                })
                                                .then(response => {
                                                    dates = this.getDates(response.data.startDate, response.data.targetDate, 0);
                                                    return axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408/routine');
                                                })
                                                .then(response => {
                                                    scheduleArr = [];
                                                    dates.map(value => {
                                                        currDate = new Date(value);

                                                        currDayOfTheWeek = currDate.getDay();

                                                        exercisePerDay = response.data.exercises.filter(value => {
                                                            return value.day == currDayOfTheWeek;
                                                        });

                                                        scheduleArr.push({
                                                            date: currDate.getTime(),
                                                            exercises: exercisePerDay
                                                        });
                                                    });
                                                    scheduleArr.forEach(schedule => {
                                                        return axios.post('https://mvfagb.herokuapp.com/api/schedule/5ce9092d50081503e89ae408', schedule);
                                                    })
                                                    return axios.post('http://mvfagb.herokuapp.com/api/measurement/5ce9092d50081503e89ae408', measurementObj);
                                                })
                                                .then((response) => {
                                                    // console.warn(response);
                                                    // this.props.screenProps.rootNavigation.navigate('App');
                                                    navigate('Confirmation');
                                                })
                                                .catch(err => {
                                                    console.warn(err);
                                                });
                                        }}>Yes, I understand</Button>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </View>
                    </ScrollView>
                }
            </WizardContext.Consumer>
        )
    }
}