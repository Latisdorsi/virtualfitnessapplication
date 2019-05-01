import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeviceStorage from 'lib/services/DeviceStorage'
import { Formik } from 'formik'
import axios from 'axios'

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
            .post('http://10.0.2.2:3000/account/authenticate', {
                email: values.email,
                password: values.password
            })
            .then(response => {
                if (response.status === 200) {
                    DeviceStorage.saveItem("token", response.data.token)
                    this.props.navigation.navigate('AuthLoading')
                } else {
                    const error = new Error(response.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
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
                    >
                        {props => (
                            <View>
                                <TextInput
                                    onChangeText={props.handleChange('email')}
                                    onBlur={props.handleBlur('email')}
                                    value={props.values.email}
                                    label='Email'
                                    keyboardType="email-address"
                                    style={{ marginVertical: 10, backgroundColor: 'none' }}
                                />
                                <TextInput
                                    onChangeText={props.handleChange('password')}
                                    onBlur={props.handleBlur('password')}
                                    value={props.values.password}
                                    secureTextEntry={true}
                                    label='Password'
                                    style={{ marginVertical: 10, backgroundColor: 'none' }}
                                />
                                <View>
                                    <Button mode="contained" onPress={props.handleSubmit} style={{ marginVertical: 10 }}>Login</Button>
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