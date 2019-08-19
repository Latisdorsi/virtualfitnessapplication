import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Subheading, Button, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import Axios from 'axios';
export default function DeleteAccount() {
    return (
        <ScrollView>
            <View style={{ padding: 15 }}>
                <Subheading>This action is irreversible and will permanently delete your account from our system</Subheading>

                <Formik
                    initialValues={{ name: 'jared' }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                            DeviceStorage.loadItem('token').then(token => {
                                const tokenData = parseToken(token)
                                Axios.put('https://mvfagb.herokuapp.com/deactivate/' + tokenData._id)
                                    .then(
                                        DeviceStorage.deleteItem('token')
                                            .then(
                                                this.props.screenProps.screenProps.rootNavigation.navigate('AuthLoading')
                                            )
                                            .catch(err =>
                                                this.props.screenProps.screenProps.rootNavigation.navigate('AuthLoading')
                                            )
                                    )

                            })
                        }, 1000);
                    }}
                    render={props => (
                        <>
                            <TextInput
                                label='Password'
                                secureTextEntry={true}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            <TextInput
                                label='Confirm Password'
                                secureTextEntry={true}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            <Button mode="contained" onPress={() => this.props.navigation.navigate('LoggedIn')} style={{ marginVertical: 15 }}>Yes, delete my account</Button>
                        </>
                    )}
                />
            </View>
        </ScrollView>
    )
}