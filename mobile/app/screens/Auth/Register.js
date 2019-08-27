import React, { Component } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import * as Yup from 'yup';
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
            .post('https://mvfagb.herokuapp.com/api/account/create', userObj)
            .then(response => {
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
                console.warn(err);
            })

    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <ScrollView>
                    <View style={{ padding: 15 }}>
                        <Formik
                            initialValues={{ ...this.state }}
                            onSubmit={values => this.registerUser(values)}
                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email('Please enter a valid email')
                                    .required('Please enter an email'),
                                password: Yup.string().required('Password is required'),
                                password2: Yup.string()
                                    .required('Password confirmation is required')
                                    .oneOf([Yup.ref('password'), null], 'Passwords do not match!'),
                                firstName: Yup.string()
                                    .max(40, 'Please enter no more than 40 characters')
                                    .min(2, 'Please enter a minimum of 2 characters')
                                    .required('Please enter your first name'),
                                lastName: Yup.string()
                                    .max(40, 'Please enter no more than 40 characters')
                                    .min(2, 'Please enter a minimum of 2 characters')
                                    .required('Please enter a last name'),
                            })
                            }
                        >
                            {props => (
                                <View>
                                    <TextInput
                                        onChangeText={props.handleChange('email')}
                                        onBlur={() => props.setFieldTouched('email')}
                                        value={props.values.email}
                                        keyboardType="email-address"
                                        label='Email'
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
                                    <TextInput
                                        onChangeText={props.handleChange('password2')}
                                        onBlur={() => props.setFieldTouched('password2')}
                                        value={props.values.password2}
                                        secureTextEntry={true}
                                        label='Repeat Password'
                                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                                    />
                                    {props.touched.password2 && props.errors.password2 &&
                                        <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.password2}</Text>
                                    }
                                    <TextInput
                                        onChangeText={props.handleChange('firstName')}
                                        oonBlur={() => props.setFieldTouched('firstName')}
                                        value={props.values.firstName}
                                        label='First Name'
                                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                                    />
                                    {props.touched.firstName && props.errors.firstName &&
                                        <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.firstName}</Text>
                                    }
                                    <TextInput
                                        onChangeText={props.handleChange('lastName')}
                                        onBlur={() => props.setFieldTouched('lastName')}
                                        value={props.values.lastName}
                                        label='Last Name'
                                        style={{ marginVertical: 10, backgroundColor: 'none' }}
                                    />
                                    {props.touched.lastName && props.errors.lastName &&
                                        <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.lastName}</Text>
                                    }
                                    <View>
                                        <Button disabled={!props.isValid} mode="contained" onPress={props.handleSubmit} style={{ marginVertical: 10 }}>Register</Button>
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