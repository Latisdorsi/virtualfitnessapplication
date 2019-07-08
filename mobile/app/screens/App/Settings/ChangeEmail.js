import React from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik'
import axios from 'axios';
import DeviceStorage from 'lib/services/DeviceStorage'
import { parseToken } from 'lib/helpers/utils'

class ChangeEmail extends React.Component {

    // const saveValues = () => {
    //     r  const newObj = {
    //         address: contactDetails.address,
    //         mobile: contactDetails.phone.mobile,
    //         home: contactDetails.phone.home,
    //         work: contactDetails.phone.work
    //     }
    //     console.log(newObj)

    //     axios
    //         .put('http://10.0.2.2:3000/account/detail/' + value._id + '/contact', newObj)
    //         .then(response => {
    //             if (response.status === 200) {
    //                 setValue({
    //                     ...value,
    //                     contactDetails: contactDetails
    //                 })
    //                 editable(false)
    //             }
    //         })
    //         .catch(err => {
    //             console.error('Request failed', err.response)
    //         });
    // }

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
                    }}
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
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                                style={{ marginVertical: 10, backgroundColor: 'none' }}
                            />
                            <Button mode="contained" onPress={props.handleSubmit} style={{ marginVertical: 10 }}>Change Email Address</Button>
                        </>
                    )}
                />
            </View>
        )
    }
}

export default ChangeEmail