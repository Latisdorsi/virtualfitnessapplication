import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import axios from 'axios'

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
        const newObj = {
            address: contactDetails.address,
            mobile: contactDetails.phone.mobile,
            home: contactDetails.phone.home,
            work: contactDetails.phone.work
        }
        // console.warn(newObj)

        axios
            .put('https://mvfagb.herokuapp.com/api/account/detail/' + value._id + '/contact', newObj)
            .then(response => {
                if (response.status === 200) {
                    setValue({
                        ...value,
                        contactDetails: contactDetails
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