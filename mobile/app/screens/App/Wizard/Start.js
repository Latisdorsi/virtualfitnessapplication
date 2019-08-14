import React, { useState } from "react";
import { Text, View } from "react-native"
import { Button, Headline, Subheading, Portal, Dialog, Paragraph } from "react-native-paper";

import axios from 'axios';
import RowViewComponent from 'lib/components/RowViewComponent';
// import RowViewComponent from 'lib/components';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent:'center', flex: 1, padding: 15 }}>
                
                <Headline>Welcome To MVFAGB!</Headline>
                <Subheading style={{textAlign: 'center'}}>Before we start, we'll ask you a few questions to generate a routine for you.</Subheading>
                <Button
                    style={{ marginTop: 15, marginBottom: 15 }}
                    onPress={() =>  navigate('Profile')} mode="contained">
                    Let's Go!
                </Button>
                {/* <Button onPress={() => this.props.screenProps.rootNavigation.navigate('App')} mode="contained">Reset Cycle</Button> */}
            </View>
        )
    }
}