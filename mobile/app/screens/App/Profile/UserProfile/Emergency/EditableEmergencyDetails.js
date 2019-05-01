import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

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
        setValue({
            ...value,
            emergencyDetails: emergencyDetails
        })
        editable(false)
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