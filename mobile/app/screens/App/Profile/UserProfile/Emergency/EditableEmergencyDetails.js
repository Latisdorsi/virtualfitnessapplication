import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

const EditableEmergencyDetails = ({ value, setValue }) => {

    let [newValue,
        setNewValue] = useState(value)

    const updateValues = (name, value) => {
        let newValueTemp = {
            ...newValue,
            [name]: value
        }
        setNewValue(newValueTemp)
    }

    const saveValues = () => {
        setValue(newValue)
    }

    return (
        <View>
            <TextInput
                label="Name"
                value={newValue.name}
                onChangeText={(text) => {
                    updateValues('name', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Number"
                value={newValue.number}
                onChangeText={(text) => {
                    updateValues('number', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Relationship"
                value={newValue.relationship}
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