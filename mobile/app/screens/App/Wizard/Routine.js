import React, { useState } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import { Headline, Subheading, Button, Card } from "react-native-paper";
import WizardContext from "./WizardContext";

export default class Routine extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <WizardContext.Consumer>
                {context =>
                    <View>
                        <Headline>Thank you for filling up all the forms</Headline>
                        <Button mode="contained">Generate Exercises</Button>
                    </View>
                }
            </WizardContext.Consumer>
        )
    }
}