import React, { useState } from "react";
import { Text, View, ActivityIndicator, StatusBar } from "react-native"
import { Button, Headline, Subheading, Portal, Dialog, Paragraph, Divider } from "react-native-paper";
import WizardContext from "./Wizard/WizardContext";
import axios from 'axios';
import RowViewComponent from 'lib/components/RowViewComponent';
// import RowViewComponent from 'lib/components';

export default class Confirmation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPromptVisible: false,
            schedules: [],
            exercises: []
        }
    }

    componentDidMount() {
        let schedules;
        let exercises;
        axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408/routine')
            .then(response => {
                schedules = response.data.exercises;


            })
            .then(() => {
                this.setState({
                    schedules,
                    exercises
                })
            })
            .catch(err => {
                console.warn(err);
            })
    }

    _showDialog = () => this.setState({ isPromptVisible: true });

    _hideDialog = () => this.setState({ isPromptVisible: false });

    getScheduledDay(day) {
        return this.state.schedules.filter(schedule => {
            return schedule.day == day
        });
    }

    render() {
        const days = [
            { name: 'Sunday', number: 0 },
            { name: 'Monday', number: 1 },
            { name: 'Tuesday', number: 2 },
            { name: 'Wednesday', number: 3 },
            { name: 'Thursday', number: 4 },
            { name: 'Firday', number: 5 },
            { name: 'Saturday', number: 6 }
        ];
        return (
            <View style={{ padding: 15 }}>
                <Headline>Success!</Headline>
                <Subheading>We've successfully created your routine based on your data.</Subheading>
                {
                    this.state.schedules.length > 0 ?
                        days.map((day, index) => {
                            if (this.getScheduledDay(day.number).length > 0) {
                                return (
                                    <View key={index}>
                                        <Subheading style={{ textAlign: 'center' }}>{day.name}</Subheading>
                                        <RowViewComponent>
                                            <Subheading>Name</Subheading>
                                            <Subheading>Sets</Subheading>
                                        </RowViewComponent>
                                        <Divider />

                                        <View>
                                            {this.getScheduledDay(day.number).map((item, key) => {
                                                return (
                                                    <RowViewComponent key={key}>
                                                        <Text>{item.name}</Text>
                                                        <Text>{item.sets}</Text>
                                                    </RowViewComponent>
                                                )
                                            })
                                            }
                                        </View>
                                    </View>
                                )
                            }
                        })
                        :
                        <View>
                            <ActivityIndicator />
                            <StatusBar barStyle="default" />
                        </View>
                }


                <Button
                    style={{ marginTop: 15, marginBottom: 15 }}
                    onPress={() => this.props.screenProps.rootNavigation.navigate('App')} mode="contained">
                    Go To Dashboard
                </Button>


                <Button
                    style={{ marginTop: 15, marginBottom: 15 }}
                    mode="contained"
                    onPress={this._showDialog}
                >
                    Restart Cycle
                                </Button>

                <Portal>
                    <Dialog
                        visible={this.state.isPromptVisible}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title>Warning!</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Restarting your cycle will delete your current cycle. Are you sure you wish to proceed?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={this._hideDialog}>No</Button>
                            <Button onPress={() => {
                                axios.get('https://mvfagb.herokuapp.com/api/schedule/5ce9092d50081503e89ae408')
                                    .then(response => {
                                        console.log(response);
                                        response.data.forEach(schedule => {
                                            // console.log(schedule);
                                            return axios.put('https://mvfagb.herokuapp.com/api/schedule/' + schedule._id + '/deactivate/');
                                        });
                                    })
                                    .then(() => {
                                        return axios.put('https://mvfagb.herokuapp.com/api/account/cycle/deactivate/5ce9092d50081503e89ae408');
                                    })
                                    .then(() => {
                                        this.props.screenProps.rootNavigation.navigate('Wizard');
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                            }}>Yes, I understand</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                {/* <Button onPress={() => this.props.screenProps.rootNavigation.navigate('App')} mode="contained">Reset Cycle</Button> */}
            </View>
        )
    }
}