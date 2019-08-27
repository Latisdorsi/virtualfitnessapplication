import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

const EditableUserDetails = ({ value, setValue, editable }) => {

    const [userDetails, setUserDetails] = useState(Object.assign(value.name));

    const updateValues = (name, value) => {
        let newValueTemp = {
            ...userDetails,
            [name]: value
        }
        setUserDetails(newValueTemp)
    }

    const saveValues = (values) => {
        const newObj = {
            firstName: values.firstName,
            lastName: values.lastName,
            middleInitial: values.middleInitial,
        }

        axios
            .put('https://mvfagb.herokuapp.com/api/account/detail/' + value._id + '/main', newObj)
            .then(response => {
                if (response.status === 200) {
                    setValue({
                        ...value,
                        name: newObj
                    })
                    editable(false)
                }
            })
            .catch(err => {
                console.error('Request failed', err.response)
            });

    }

    return (
        <View>
            <Formik
                initialValues={{ ...userDetails }}
                onSubmit={values => saveValues(values)}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .max(40, 'Please enter no more than 40 characters')
                        .min(2, 'Please enter a minimum of 2 characters')
                        .required('Please enter your first name'),
                    lastName: Yup.string()
                        .max(40, 'Please enter no more than 40 characters')
                        .min(2, 'Please enter a minimum of 2 characters')
                        .required('Please enter a last name')
                })}
            >
                {props => (
                    <View>
                        <TextInput
                            label="First Name"
                            value={props.values.firstName}
                            onChangeText={props.handleChange('firstName')}
                            onBlur={() => props.setFieldTouched('firstNAme')}
                            style={{
                                marginVertical: 10,
                                backgroundColor: 'none'
                            }} />
                        {props.touched.firstName && props.errors.firstName &&
                            <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.firstName}</Text>
                        }
                        <TextInput
                            label="Last Name"
                            value={props.values.lastName}
                            onChangeText={props.handleChange('lastName')}
                            onBlur={() => props.setFieldTouched('lastName')}
                            style={{
                                marginVertical: 10,
                                backgroundColor: 'none'
                            }} />
                        {props.touched.lastName && props.errors.lastName &&
                            <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.lastName}</Text>
                        }
                        <TextInput
                            label="Middle Initial"
                            maxLength={1}
                            value={props.values.middleInitial}
                            onChangeText={props.handleChange('middleInitial')}
                            onBlur={() => props.setFieldTouched('middleInitial')}
                            style={{
                                marginVertical: 10,
                                backgroundColor: 'none'
                            }} />
                        {props.touched.midleInitial && props.errors.middleInitial &&
                            <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.middleInitial}</Text>
                        }
                        <Button
                            mode="contained"
                            style={{
                                marginVertical: 10
                            }}
                            onPress={props.handleSubmit}
                        >Save</Button>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default EditableUserDetails