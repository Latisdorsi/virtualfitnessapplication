import React from "react";
import { View, Text, ScrollView } from "react-native"
import { Headline, Subheading, Divider, Button } from "react-native-paper";

import WizardContext from '../WizardContext'
import CardioRespiratoryTest from './CardioRespiratoryTest'
import UpperBodyTest from './UpperBodyTest'
import LowerBodyTest from './LowerBodyTest'
import MuscleEnduranceTest from './MuscleEnduranceTest'
import FlexibilityTest from './FlexibilityTest'

export default class Assessment extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <WizardContext.Consumer>
                {({context, setUpperBodyStrength, setLowerBodyStrength, setMuscleEndurance, setFlexibility, setLevel}) => (
                    <ScrollView>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
                            <Headline>Fitness Level Assessment</Headline>
                            <Subheading>Answer each item as accurately as you can</Subheading>
                            <View>
                                <Text>Score</Text>
                            </View>
                            {/* <View style={{ marginVertical: 15, padding: 15 }}>
                                <CardioRespiratoryTest />
                            </View> */}
                            <Divider />

                            <View style={{ marginVertical: 15, padding: 15 }}>
                                <UpperBodyTest setValue={setUpperBodyStrength} />
                            </View>

                            <Divider />

                            <View style={{ marginVertical: 15, padding: 15 }}>
                                <LowerBodyTest setValue={setLowerBodyStrength} />
                            </View>

                            <Divider />

                            <View style={{ marginVertical: 15, padding: 15 }}>
                                <MuscleEnduranceTest setValue={setMuscleEndurance} />
                            </View>

                            <Divider />

                            <View style={{ marginVertical: 15, padding: 15 }}>
                                <FlexibilityTest setValue={setFlexibility} />
                            </View>

                            <Button
                                mode="contained"
                                onPress={() => {
                                    const level = Math.floor((context.lowerBodyStrength.level + context.upperBodyStrength.level  + context.muscleEndurance.level  + context.flexibility.level)/4);
                                    setLevel(level);
                                    navigate('Goal');
                                }}>
                                Next
                </Button>
                        </View>
                    </ScrollView>
                )}
            </WizardContext.Consumer>   
        )
    }
}

