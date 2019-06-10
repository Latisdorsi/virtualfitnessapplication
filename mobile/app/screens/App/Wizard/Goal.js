import React from "react";
import { View } from "react-native"
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RadioForm from 'react-native-simple-radio-button';
const radio_props = [
    { label: 'Tone Muscle and Lose Weight', value: 0 },
    { label: 'Increase Muscle Mass and Size', value: 1 },
    { label: 'Get Stronger Lifts', value: 2 },
    { label: 'General Fitness', value: 3 }
];
import WizardContext from './WizardContext'


export default class Goal extends React.Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <WizardContext.Consumer>
                {context => (
                              <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
                        <View>
                            <RadioForm
                                radio_props={radio_props}
                                initial={context.goal}
                                onPress={(value) => { context.setGoal(value) }}
                            />
                        </View>
                        <Button onPress={() => {
                            navigate('Schedule');
                            
                        }}
                        mode="contained"
                        >
                            Next
                            </Button>
                    </View>
                )}
            </WizardContext.Consumer>
        )
    }
}
