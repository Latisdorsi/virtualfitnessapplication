import React from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button, Subheading } from 'react-native-paper';
import { Formik } from 'formik'
import axios from 'axios'
import DeviceStorage from 'lib/services/DeviceStorage'
import { parseToken } from 'lib/helpers/utils'


export default class ChangePassword extends React.Component {

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
                        _id: response.data._id
                    })
                })
        })
            .catch(err => {
                console.error(err);
            })
    }
    render() {
        return (
            <View style={{ padding: 15 }}>
                <Subheading>Pick a strong password you're not using elsewhere</Subheading>

                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        newPasswordConfirm: ''
                    }}
                    onSubmit={(values, actions) => {
                        actions.resetForm();

                        const newData = {
                            password: values.newPassword
                        };
                        axios
                            .put('https://mvfagb.herokuapp.com/api/account/change/password/' + this.state._id, newData)
                            .then(response => {
                                console.warn('It worked!');
                            })
                            .catch(err => {
                                console.error(err.response);
                            })
                    }}
                    render={props => (
                        <>
                            <TextInput
                                label='Old Password'
                                onChangeText={props.handleChange('oldPassword')}
                                onBlur={props.handleBlur('oldPassword')}
                                value={props.values.oldPassword}
                                secureTextEntry={true}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            <TextInput
                                label='New Password'
                                onChangeText={props.handleChange('newPassword')}
                                onBlur={props.handleBlur('newPassword')}
                                value={props.values.newPassword}
                                secureTextEntry={true}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            <TextInput
                                label='Repeat New Password'
                                onChangeText={props.handleChange('newPasswordConfirm')}
                                onBlur={props.handleBlur('newPasswordConfirm')}
                                value={props.values.newPasswordConfirm}
                                secureTextEntry={true}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            {props.errors.name && <div id="feedback">{props.errors.name}</div>}

                            <Button mode="contained" onPress={props.handleSubmit} style={{ marginVertical: 1 }}>Change Password</Button>
                        </>
                    )}
                />

            </View>

        )
    }
}