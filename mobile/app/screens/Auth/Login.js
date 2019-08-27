import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeviceStorage from 'lib/services/DeviceStorage';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        }
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(values) {
        this.setState({ error: '', loading: true });
        axios
            .post('http://mvfagb.herokuapp.com/api/account/authenticate', {
                email: values.email,
                password: values.password
            })
            .then(response => {
                if (response.status === 200) {
                    DeviceStorage.saveItem("token", response.data.token);
                    this.props.navigation.navigate('AuthLoading');
                } else {
                    const error = new Error(response.error);
                    alert(error);
                }
            })
            .catch(err => {
                let errMssg = JSON.parse(err.request._response);
                if (err.request.status == 401)
                    alert(errMssg.error);
                else if (err.request.status == 500)
                    alert('Internal Server Error 500. Please try again')
                else
                    alert('An Unexpected error occured! Please try again.')
            });
    }

    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <View style={{ padding: 15 }}>
                    <Image
                        style={{
                            height: 100,
                            width: 350
                        }}
                        source={require('res/images/af-logo-black.png')}
                    />
                    <Formik
                        initialValues={{ email: this.state.email, password: this.state.password }}
                        onSubmit={values => this.loginUser(values)}
                        validationSchema={
                            yup.object().shape({
                                email: yup
                                    .string()
                                    .email('Please enter a valid email')
                                    .required('Please enter an email'),
                                password: yup
                                    .string()
                                    .min(6, 'Please enter a minimum of 6 characters')
                                    .required('Please enter a password'),
                            })}
                    >
                        {props => (
                            <View>
                                <TextInput
                                    onChangeText={props.handleChange('email')}
                                    onBlur={() => props.setFieldTouched('email')}
                                    value={props.values.email}
                                    label='Email'
                                    keyboardType="email-address"
                                    style={{ marginVertical: 10, backgroundColor: 'none' }}
                                />
                                {props.touched.email && props.errors.email &&
                                    <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.email}</Text>
                                }
                                <TextInput
                                    onChangeText={props.handleChange('password')}
                                    onBlur={() => props.setFieldTouched('password')}
                                    value={props.values.password}
                                    secureTextEntry={true}
                                    label='Password'
                                    style={{ marginVertical: 10, backgroundColor: 'none' }}
                                />
                                {props.touched.password && props.errors.password &&
                                    <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.password}</Text>
                                }
                                <View>
                                    <Button disabled={!props.isValid} mode="contained" onPress={props.handleSubmit} style={{ marginVertical: 10 }}>Login</Button>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={{ marginVertical: 10 }}>
                                        <Text style={{ textAlign: 'center' }}>Don't have an account?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>

                </View>
            </View>
        )
    }
}