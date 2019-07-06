import React, { useState } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import { Headline, Subheading, Button, Card } from "react-native-paper";
import WizardContext from "./WizardContext";
import axios from 'axios';
import RowViewComponent from 'lib/components/RowViewComponent';
// import RowViewComponent from 'lib/components';

export default class Routine extends React.Component {

    componentDidMount() {

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


    render() {
        const { navigate } = this.props.navigation;
        return (
            <WizardContext.Consumer>
                {context =>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
                        <Headline>Thank you for filling up all the forms</Headline>
                        <Subheading> We'll create a exercise for you based on your data</Subheading>

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

                        <Button
                            mode="contained"
                            onPress={() => {

                                // const { context } = context;
                                // const newObj = {
                                //     level: context.context.level,
                                //     goal: context.context.goal,
                                //     schedule: context.context.schedule,
                                //     assessment: {
                                //         upperBodyStrength: context.context.upperBodyStrength,
                                //         lowerBodyStrength: context.context.lowerBodyStrength,
                                //         muscleEndurance: context.context.muscleEndurance,
                                //         flexibility: context.context.flexibility
                                //     }
                                // }

                                // axios.post('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408', newObj)
                                //     .then(response => {
                                //         console.warn(response);
                                axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408')
                                    .then(response => {
                                        const dates = this.getDates(response.data.startDate, response.data.targetDate, 0);
                                        axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408/routine')
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
                                                scheduleArr.forEach( schedule => {
                                                    // console.log(schedule);
                                                    axios.post('https://mvfagb.herokuapp.com/api/schedule/5ce9092d50081503e89ae408', schedule)
                                                    .then( response => {
                                                        console.log(response);
                                                    })
                                                    .catch( err => {
                                                        console.log(err);
                                                    })
                                                })
                                                // Push Schedule Here
                                            })

                                    })
                                    .catch(err => {
                                        console.warn(err);
                                    })

                                //     })
                                //     .catch(err => {
                                //         console.warn(err.response);
                                //     })
                                // console.warn(newObj);

                                // const measurementObj = {
                                //     weight: context.context.weight,
                                //     neck: context.context.neck,
                                //     waist: context.context.waist,
                                //     hips: context.context.hips,
                                //     bodyComposition: context.context.composition
                                // }
                                // console.warn(measurementObj);

                                // axios.post('http://mvfagb.herokuapp.com/api/measurement/5ce9092d50081503e89ae408', measurementObj)
                                //     .then(response => {
                                //         console.warn(response);
                                //     })
                                //     .catch(err => {
                                //         console.warn(err.response);
                                //     })
                            }}
                        >Generate Exercises</Button>
                        {console.warn(context)}
                    </View>
                }
            </WizardContext.Consumer>
        )
    }
}