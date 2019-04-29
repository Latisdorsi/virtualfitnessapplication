import React, { Component } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { Formik } from 'formik'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            firstName: '',
            lastName: '',
            error: '',
            loading: false
        }
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(values) {
        this.setState({ error: '', loading: true });

        userObj = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            role: 'member'
        }

        axios
            .post('http://10.0.2.2:3000/account/create', userObj)
            .then(response => {
                console.log(response)
                this.setState({
                    email: '',
                    password: '',
                    password2: '',
                    firstName: '',
                    lastName: ''
                })
                this.props.navigation.navigate('Login')
            }, (reason) => {
                this.props.navigation.navigate('Login')
            })
            .catch(err => {
                console.error('Request failed', err.response)
            })
            .then()

    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <ScrollView>
                    <View style={{ padding: 15 }}>
                        <Formik
                            initialValues={{ ...this.state }}
                            onSubmit={values => this.registerUser(values)}
                        >
                            {props => (
                                <View>
                                    <TextInput
                                        onChangeText={props.handleChange('email')}
                                        onBlur={props.handleBlur('email')}
                                        value={props.values.email}
                                        keyboardType="email-address"
                                        label='Email'
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
                                    <TextInput
                                        onChangeText={props.handleChange('password2')}
                                        onBlur={props.handleBlur('password2')}
                                        value={props.values.password2}
                                        secureTextEntry={true}
                                        label='Repeat Password'
                                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                                    />
                                    <TextInput
                                        onChangeText={props.handleChange('firstName')}
                                        onBlur={props.handleBlur('firstName')}
                                        value={props.values.firstName}
                                        label='First Name'
                                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                                    />
                                    <TextInput
                                        onChangeText={props.handleChange('lastName')}
                                        onBlur={props.handleBlur('lastName')}
                                        value={props.values.lastName}
                                        label='Last Name'
                                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                                    />
                                    <View>
                                        <Button mode="contained" onPress={props.handleSubmit} style={{ marginVertical: 10 }}>Register</Button>
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }} style={{ marginVertical: 10 }}>
                                            <Text style={{ textAlign: 'center' }}>Already have an account?</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}