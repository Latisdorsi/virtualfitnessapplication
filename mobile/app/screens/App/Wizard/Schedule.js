import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import RadioForm from 'react-native-simple-radio-button';

import WizardContext from './WizardContext'

const radio_props = [
    { label: '3 Days a Week', value: 0 },
    { label: '5 Days a Week', value: 1 },
    { label: 'Full Week', value: 2 }
];


export default class Schedule extends React.Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <WizardContext.Consumer>
                {context => (
                    <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
                        <View>
                            <RadioForm
                                radio_props={radio_props}
                                initial={context.schedule}
                                onPress={(value) => { context.setSchedule(value) }}
                            />
                        </View>
                        <Button onPress={() => {
                            navigate('Routine');
                        }}
                            mode="contained"
                        >
                            Next
        </Button>
                    </View >
                )}
            </WizardContext.Consumer>
        )
    }
}