import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Subheading, Button, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import Axios from 'axios';
import * as Yup from 'yup';


export default function DeleteAccount() {

    return (
        <ScrollView>
            <View style={{ padding: 15 }}>
                <Subheading>This action is irreversible and will permanently delete your account from our system</Subheading>

                <Formik
                    initialValues={{
                        password: '',
                        passwordConfirm: ''
                    }}
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
                    validationSchema={Yup.object().shape({
                        password: Yup.string()
                            .required('Password is required')
                            .min(6, 'Please enter a minimum of 6 characters'),
                        passwordConfirm: Yup.string()
                            .required('Password confirmation is required')
                            .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
                    })}
                    render={props => (
                        <>
                         <TextInput
                                label='Password'
                                onChangeText={props.handleChange('password')}
                                onBlur={() => props.setFieldTouched('password')}
                                value={props.values.password}
                                secureTextEntry={true}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            {props.touched.password && props.errors.password &&
                                <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.password}</Text>
                            }
                            <TextInput
                                label='Confirm Password'
                                onChangeText={props.handleChange('passwordConfirm')}
                                onBlur={() => props.setFieldTouched('passwordConfirm')}
                                value={props.values.passwordConfirm}
                                secureTextEntry={true}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            {props.touched.passwordConfirm && props.errors.passwordConfirm &&
                                <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.passwordConfirm}</Text>
                            }
                            <Button mode="contained" disabled={!props.isValid} onPress={() => this.props.navigation.navigate('LoggedIn')} style={{ marginVertical: 15 }}>Yes, delete my account</Button>
                        </>
                    )}
                />
            </View>
        </ScrollView>
    )
}