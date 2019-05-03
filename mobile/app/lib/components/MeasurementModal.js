import React from 'react'
import { View, Text } from 'react-native'
import ModalSelector from 'react-native-modal-selector';

const MeasurementModal = ({ name, suffix, data, value, setValue })  => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
                marginVertical: 15
            }}>

            <Text
                style={{ fontSize: 16 }}>
                {name}
            </Text>
            <ModalSelector
                data={data}
                initValue="Enter"
                onChange={(option) => { setValue(option.label) }}>
                <Text style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    height: 40
                }}>
                    {(value > 0 || (value != '' && value != null)) ? value + ' ' + suffix : 'Enter'}
                </Text>
            </ModalSelector>
        </View>
    )
}

export default MeasurementModal