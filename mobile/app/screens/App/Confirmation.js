import React, { useState } from "react";
import { Text, View } from "react-native"
import { Button, Headline, Subheading } from "react-native-paper";
import WizardContext from "./Wizard/WizardContext";
import axios from 'axios';
import RowViewComponent from 'lib/components/RowViewComponent';
// import RowViewComponent from 'lib/components';

export default class Confirmation extends React.Component {
    constructor(props) {
        super(props)
    }

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
                    onPress={() => {
                        Axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408/latest')
                            .then(response => {
                                return Axios.get('https://mvfagb.herokuapp.com/api/schedule/5ce9092d50081503e89ae408/deactivate/' + response.data._id);
                            })
                            .then(() => {
                                return Axios.put('https://mvfagb.herokuapp.com/api/account/cycle/deactivate/5ce9092d50081503e89ae408');
                            })
                            .then(() => {
                                this.props.screenProps.rootNavigation.navigate('Wizard');
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }}
                >
                    Restart Cycle
                                </Button>
                {/* <Button onPress={() => this.props.screenProps.rootNavigation.navigate('App')} mode="contained">Reset Cycle</Button> */}
            </View>
        )
    }
}