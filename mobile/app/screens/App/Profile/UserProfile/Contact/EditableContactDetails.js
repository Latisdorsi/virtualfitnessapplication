import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

const EditableContactDetails = ({ value, setValue }) => {

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
                value={newValue.address}
                onChangeText={(text) => {
                    updateValues('address', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Mobile Number"
                value={newValue.mobilePhone}
                onChangeText={(text) => {
                    updateValues('mobilePhone', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Home Number"
                value={newValue.workPhone}
                onChangeText={(text) => {
                    updateValues('workPhone', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Work Number"
                value={newValue.homePhone}
                onChangeText={(text) => {
                    updateValues('homePhone', text)
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

export default EditableContactDetails