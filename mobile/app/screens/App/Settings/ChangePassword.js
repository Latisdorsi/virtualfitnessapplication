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
                        id: response.data._id,
                        oldEmail: response.data.email
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
                        console.warn('hi');
                    }}
                    render={props => (
                        <>
                            <TextInput
                                label='Old Password'
                                onChangeText={props.handleChange('oldPassword')}
                                onBlur={props.handleBlur('oldPassword')}
                                value={props.values.oldPassword}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            <TextInput
                                label='New Password'
                                onChangeText={props.handleChange('newPassword')}
                                onBlur={props.handleBlur('newPassword')}
                                value={props.values.newPassword}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            <TextInput
                                label='Repeat New Password'
                                onChangeText={props.handleChange('newPasswordConfirm')}
                                onBlur={props.handleBlur('newPasswordConfirm')}
                                value={props.values.newPasswordConfirm}
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