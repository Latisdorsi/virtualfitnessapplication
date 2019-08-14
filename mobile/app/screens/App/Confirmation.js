import React, { useState } from "react";
import { Text, View } from "react-native"
import { Button, Headline, Subheading, Portal, Dialog, Paragraph } from "react-native-paper";
import WizardContext from "./Wizard/WizardContext";
import axios from 'axios';
import RowViewComponent from 'lib/components/RowViewComponent';
// import RowViewComponent from 'lib/components';

export default class Confirmation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPromptVisible: false
        }
    }

    _showDialog = () => this.setState({ isPromptVisible: true });

    _hideDialog = () => this.setState({ isPromptVisible: false });

    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Headline>Success!</Headline>
                <Subheading>We've successfully created your routine</Subheading>
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