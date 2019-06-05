import React from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import Modal from "react-native-modal";
import { Headline, Subheading, Button, Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import WizardContext from './WizardContext'

const radio_props = [
    { label: '3 Days a Week', value: 0 },
    { label: '5 Days a Week', value: 1 },
    { label: 'Full Week', value: 2 }
];


export default class Schedule extends React.Component {
    // let [setupData, setSetupData] = useContext(WizardContext)
    // // let [step, setStep] = useContext(StepContext)
    // let [schedule, setSchedule] = useState(0)

    // useEffect(() => {
    //     let newData = {
    //         ...setupData,
    //         schedule
    //     }
    //     setSetupData(newData)
    //     console.log(setupData)
    // })



    render() {
        const { navigate } = this.props.navigation;
        return (
            <WizardContext.Consumer>
                {context => (
                    <View>
                        <Headline>Schedule</Headline>
                        <View>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                            // onPress={(value) => { setSchedule(value) }}
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