import React, { useState } from "react";
import { Text, View } from "react-native"
import { Button, Headline, Subheading } from "react-native-paper";
import WizardContext from "./WizardContext";
import axios from 'axios';
import RowViewComponent from 'lib/components/RowViewComponent';
// import RowViewComponent from 'lib/components';

export default class Routine extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Headline>Success!</Headline>
                <Subheading>We've successfully created your routine</Subheading>
                <Button onPress={() => this.props.screenProps.rootNavigation.navigate('App')} mode="contained">Go To Dashboard</Button>
                {/* <Button onPress={() => this.props.screenProps.rootNavigation.navigate('App')} mode="contained">Reset Cycle</Button> */}
            </View>
        )
    }
}