import React, { useState } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import { Headline, Subheading, Button, Card } from "react-native-paper";
import WizardContext from "./WizardContext";
// import RowViewComponent from 'lib/components';

export default class Routine extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <WizardContext.Consumer>
                {context =>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
                        <Headline>Thank you for filling up all the forms</Headline>
                        {/*                     

                <View style={{
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Subheading>Body Composition</Subheading>
                  <Text>Composition Level: {context.composition.category}</Text>
                  <Text>Body Fat Percentage: {context.composition.percentBodyFat.toString().substr(0, 5)}%</Text>
                  <Text>Lean Body Mass Percentage: {context.composition.percentLeanMass.toString().substr(0, 5)}%</Text>
                </View> */}

                        <Button mode="contained">Generate Exercises</Button>
                        {console.warn(context)}
                    </View>
                }
            </WizardContext.Consumer>
        )
    }
}