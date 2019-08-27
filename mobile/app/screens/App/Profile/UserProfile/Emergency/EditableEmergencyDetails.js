import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';


const EditableEmergencyDetails = ({ value, setValue, editable }) => {

    const [emergencyDetails, setEmergencyDetails] = useState(Object.assign(value.emergencyDetails))

    const updateValues = (name, value) => {
        let newValueTemp = {
            ...emergencyDetails,
            [name]: value
        }
        setEmergencyDetails(newValueTemp)
    }

    const saveValues = (values) => {
        let newObj = {
            emergencyFullName: values.fullName,
            emergencyNumber: values.contactNumber,
            emergencyRelationship: values.relationship,
        }
        axios
            .put('https://mvfagb.herokuapp.com/api/account/detail/' + value._id + '/emergency', newObj)
            .then(response => {
                if (response.status === 200) {
                    setValue({
                        ...value,
                        emergencyDetails: newObj
                    })
                    editable(false)
                }
            })
            .catch(err => {
                console.error('Request failed', err.response)
            });
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    console.log(emergencyDetails);
    return (
        <Formik
            initialValues={{ ...emergencyDetails }}
            onSubmit={values => saveValues(values)}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .max(40, 'Please enter no more than 40 characters')
                    .min(2, 'Please enter a minimum of 2 characters')
                    .required('Please enter your first name'),
                contactNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
                relationship: Yup.string().required()
            })}
        >
            {props => (
                <View>
                    <TextInput
                        label="Name"
                        value={props.values.fullName}
                        onChangeText={props.handleChange('fullName')}
                        onBlur={() => props.setFieldTouched('fullName')}
                        style={{
                            marginVertical: 10,
                            backgroundColor: 'none'
                        }} />
                          {props.touched.fullName && props.errors.fullName &&
                            <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.fullName}</Text>
                        }
                    <TextInput
                        label="Mobile Number"
                        value={props.values.contactNumber.toString()}
                        keyboardType={'numeric'}
                        onChangeText={props.handleChange('contactNumber')}
                        onBlur={() => props.setFieldTouched('contactNumber')}
                        style={{
                            marginVertical: 10,
                            backgroundColor: 'none'
                        }} />
                          {props.touched.contactNumber && props.errors.contactNumber &&
                            <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.contactNumber}</Text>
                        }
                    <TextInput
                        label="Relationship"
                        value={props.values.relationship}
                        onChangeText={props.handleChange('relationship')}
                        onBlur={() => props.setFieldTouched('relationship')}
                        style={{
                            marginVertical: 10,
                            backgroundColor: 'none'
                        }} />
                          {props.touched.relationship && props.errors.relationship &&
                            <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.relationship}</Text>
                        }
                    <Button
                        mode="contained"
                        style={{
                            marginVertical: 10
                        }}
                        onPress={props.handleSubmit}>
                        Save</Button>
                </View>
            )}
        </Formik>
    )
}

export default EditableEmergencyDetails