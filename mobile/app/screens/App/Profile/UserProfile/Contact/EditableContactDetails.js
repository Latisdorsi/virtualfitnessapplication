import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

const EditableContactDetails = ({ value, setValue, editable }) => {

    const [contactDetails, setContactDetails] = useState(Object.assign(value.contactDetails))

    

    const updateValues = (name, value) => {
        let newValueTemp = {
            ...contactDetails,
            [name]: value
        }
        setContactDetails(newValueTemp)
    }

    const saveValues = () => {
        setValue({
            ...value,
            contactDetails: contactDetails
        })
        editable(false)
    }

    return (
        <View>
            <TextInput
                label="Address"
                value={contactDetails.address}
                onChangeText={(text) => {
                    updateValues('address', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Mobile Number"
                value={contactDetails.phone.mobile}
                onChangeText={(text) => {
                    updateValues('mobilePhone', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Home Number"
                value={contactDetails.phone.work}
                onChangeText={(text) => {
                    updateValues('workPhone', text)
                }}
                style={{
                    marginVertical: 10,
                    backgroundColor: 'none'
                }} />
            <TextInput
                label="Work Number"
                value={contactDetails.phone.home}
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