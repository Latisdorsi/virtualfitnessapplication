import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import axios from 'axios'

const EditableUserDetails = ({ value, setValue, editable }) => {

    const [userDetails, setUserDetails] = useState(Object.assign(value.name));

    const updateValues = (name, value) => {
        let newValueTemp = {
            ...userDetails,
            [name]: value
        }
        setUserDetails(newValueTemp)
    }

    const saveValues = () => {
        const newObj = {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            middleInitial: userDetails.middleInitial,
        }

        axios
            .put('https://mvfagb.herokuapp.com/api/account/detail/' + value._id + '/main', newObj)
            .then(response => {
                if (response.status === 200) {
                    setValue({
                        ...value,
                        name: userDetails
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
            <TextInput
                label="First Name"
                value={userDetails.firstName}
                onChangeText={(text) => {
                    updateValues('firstName', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Last Name"
                value={userDetails.lastName}
                onChangeText={(text) => {
                    updateValues('lastName', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Middle Initial"
                value={userDetails.middleInitial}
                onChangeText={(text) => {
                    updateValues('middleInitial', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <Button
                mode="contained"
                style={{
                    marginVertical: 10
                }}
                onPress={() => {
                    saveValues()
                }}>Save</Button>
        </View>
    )
}

export default EditableUserDetails