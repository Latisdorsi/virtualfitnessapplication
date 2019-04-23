import React from 'react'
import {View, Text} from 'react-native'
import {TextInput, Button} from 'react-native-paper'


const EditableEmergencyDetails = ({ value, setValue }) => {

    const updateValues = (name, value) => {
        let newValue = {
            ...value,
            [name]: value
        }
        setValue(newValue)
    }

    const saveValues = () => {
        //setValue(newValue)

    }

    return (
        <View>
            <TextInput label="Name" value={value.name} onChangeText={(text) => { updateValues('name', text) }} style={{ marginVertical: 5 }} />
            <TextInput label="Number" value={value.number} onChangeText={(text) => { updateValues('number', text) }} style={{ marginVertical: 5 }} />
            <TextInput label="Relationship" value={value.relationship} onChangeText={(text) => { updateValues('relationship', text) }} style={{ marginVertical: 5 }} />
            <Button onPress={() => {
                saveValues()
            }}>Save</Button>
        </View>
    )
}

export default EditableEmergencyDetails