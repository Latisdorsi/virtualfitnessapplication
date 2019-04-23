import React from 'react'
import {View} from 'react-native'
import {TextInput, Button} from 'react-native-paper'

const EditableContactDetails = ({ value, setValue }) => {

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
            <TextInput label="Name" value={value.address} onChangeText={(text) => { updateValues('address', text) }} style={{ marginVertical: 5 }} />
            <TextInput label="Number" value={value.mobilePhone} onChangeText={(text) => { updateValues('mobilePhone', text) }} style={{ marginVertical: 5 }} />
            <TextInput label="Relationship" value={value.workPhone} onChangeText={(text) => { updateValues('workPhone', text) }} style={{ marginVertical: 5 }} />
            <TextInput label="Relationship" value={value.homePhone} onChangeText={(text) => { updateValues('homePhone', text) }} style={{ marginVertical: 5 }} />
            <Button onPress={() => {
                saveValues()
            }}>Save</Button>
        </View>
    )
}


export default EditableContactDetails