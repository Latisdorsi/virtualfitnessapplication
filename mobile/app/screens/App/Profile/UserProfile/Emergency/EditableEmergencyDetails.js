import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import axios from 'axios'

const EditableEmergencyDetails = ({ value, setValue, editable }) => {

    const [emergencyDetails, setEmergencyDetails] = useState(Object.assign(value.emergencyDetails))

    const updateValues = (name, value) => {
        let newValueTemp = {
            ...emergencyDetails,
            [name]: value
        }
        setEmergencyDetails(newValueTemp)
    }

    const saveValues = () => {
        let newObj = {
            emergencyFullName: emergencyDetails.name,
            emergencyNumber: emergencyDetails.number,
            emergencyRelationship: emergencyDetails.relationship,
        }
        axios
            .put('http://10.0.2.2:3000/account/detail/' + value._id + '/emergency', newObj)
            .then(response => {
                if (response.status === 200) {
                    setValue({
                        ...value,
                        emergencyDetails: emergencyDetails
                    })
                    editable(false)
                }
                console.log(response)
            })
            .catch(err => {
                console.error('Request failed', err.response)
            });
    }

    return (
        <View>
            <TextInput
                label="Name"
                value={emergencyDetails.name}
                onChangeText={(text) => {
                    updateValues('name', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Number"
                value={emergencyDetails.number}
                onChangeText={(text) => {
                    updateValues('number', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Relationship"
                value={emergencyDetails.relationship}
                onChangeText={(text) => {
                    updateValues('relationship', text)
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

export default EditableEmergencyDetails