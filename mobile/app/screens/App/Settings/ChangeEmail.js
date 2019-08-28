import React from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik'
import axios from 'axios';
import DeviceStorage from 'lib/services/DeviceStorage'
import { parseToken } from 'lib/helpers/utils'
import * as yup from 'yup';

class ChangeEmail extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            _id: '',
            oldEmail: '',
            email: ''
        })
    }

    componentDidMount() {

        DeviceStorage.loadItem('token').then(token => {
            const tokenData = parseToken(token)
            axios
                .get('http://mvfagb.herokuapp.com/api/account/detail/' + tokenData._id)
                .then(response => {
                    this.setState({
                        _id: response.data._id,
                        oldEmail: response.data.email
                    })
                });
        })
            .catch(err => {
                console.error(err);
            })
    }

    render() {

        return (
            <View style={{ padding: 15, justifyContent: 'center' }}>
                <Formik
                    initialValues={{
                        oldEmail: this.state.oldEmail,
                        email: this.state.email,
                    }}
                    onSubmit={(values, actions) => {
                        actions.resetForm();

                        const newData = {
                            email: values.email
                        };

                        axios.get('https://mvfagb.herokuapp.com/api/account/verify/email', newData)
                            .then(response => {
                                if (response.status == 200) {
                                    console.warn('reached 200');
                                    axios
                                        .put('https://mvfagb.herokuapp.com/api/account/change/email/' + this.state._id, newData)
                                        .then(response => {
                                            this.setState({
                                                oldEmail: values.email
                                            })
                                        })
                                        .catch(err => {
                                            console.error(err.response);
                                        })
                                }
                                else if (response.status == 401) {
                                    console.warn('reached 401');
                                    alert('Email already exists!');
                                }
                            }
                            )
                            .catch(error => {
                                console.warn(error.response);
                            })
                    }}
                    validationSchema={
                        yup.object().shape({
                            email: yup
                                .string()
                                .email('Please enter a valid email')
                                .required('Please enter an email')

                        })
                    }
                    enableReinitialize="true"
                    render={props => (
                        <>
                            <TextInput
                                label='Current Email'
                                disabled="true"
                                value={props.values.oldEmail}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            <TextInput
                                label='New Email'
                                onChangeText={props.handleChange('email')}
                                onBlur={() => props.setFieldTouched('email')}
                                value={props.values.email}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            {props.touched.email && props.errors.email &&
                                <Text style={{ fontSize: 15, color: 'red' }}>{props.errors.email}</Text>
                            }
                            <Button mode="contained" disabled={!props.isValid} onPress={props.handleSubmit} style={{ marginVertical: 10 }}>Change Email Address</Button>
                        </>
                    )}
                />
            </View>
        )
    }
}

export default ChangeEmail