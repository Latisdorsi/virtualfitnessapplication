 import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

const EditableContactDetails = ({ value, setValue, editable }) => {

    const [contactDetails, setContactDetails] = useState(Object.assign(value.contactDetails))

    const updateValues = (name, value) => {
        let newValueTemp = {
            ...contactDetails,
            [name]: value
        }
        setContactDetails(newValueTemp)
    }

    const saveValues = (values) => {
        const newObj = {
            address: values.address,
            mobile: values.mobile,
        }
        axios
            .put('https://mvfagb.herokuapp.com/api/account/detail/' + value._id + '/contact', newObj)
            .then(response => {
                if (response.status === 200) {
                    setValue({
                        ...value,
                        contactDetails: newObj
                    })
                    editable(false)
                }
            })
            .catch(err => {
                console.error('Request failed', err.response)
            });

    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    return (
        <Formik
            initialValues={{ ...contactDetails }}
            onSubmit={values => saveValues(values)}
            validationSchema={Yup.object().shape({
                address: Yup.string()
                    .max(40, 'Please enter no more than 40 characters')
                    .min(2, 'Please enter a minimum of 2 characters')
                    .required('Please enter your first name'),
                mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
            })}
        >
            {props => (
                <View>
                    <TextInput
                        label="Address"
                        value={props.values.address}
                        onChangeText={props.handleChange('address')}
                        onBlur={() => props.setFieldTouched('address')}
                        style={{
                            marginVertical: 10,
                            backgroundColor: 'none'
                        }} />
                    <TextInput
                        label="Mobile Number"
                        value={props.values.mobile.toString()}
                        keyboardType={'numeric'}
                        onChangeText={props.handleChange('mobile')}
                        onBlur={() => props.setFieldTouched('mobile')}
                        style={{
                            marginVertical: 10,
                            backgroundColor: 'none'
                        }} />
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

export default EditableContactDetails