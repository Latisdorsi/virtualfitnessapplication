import React, { useState } from "react";
import { View } from "react-native"
import { Button, Headline, Subheading } from "react-native-paper";


export default class Start extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', flex: 1, padding: 15 }}>

                <Headline>Congratulations!</Headline>
                <Subheading style={{ textAlign: 'center' }}> You've reached the end of your cycle.</Subheading>
                <Button
                    style={{ marginTop: 15, marginBottom: 15 }}
                    onPress={() => {
                        DeviceStorage.loadItem('token').then(token => {
                            const tokenData = parseToken(token)
                            axios.get('https://mvfagb.herokuapp.com/api/schedule/' . tokenData._id)
                                .then(response => {
                                    console.log(response);
                                    response.data.forEach(schedule => {
                                        return axios.put('https://mvfagb.herokuapp.com/api/schedule/' + schedule._id + '/deactivate/');
                                    });
                                })
                                .then(() => {
                                    return axios.put('https://mvfagb.herokuapp.com/api/account/cycle/deactivate/' + tokenData._id );
                                })
                                .then(() => {
                                    this.props.screenProps.rootNavigation.navigate('Wizard');
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        })
                    }} mode="contained">
                    Restart Cycle
                </Button>
            </View>
        )
    }
}