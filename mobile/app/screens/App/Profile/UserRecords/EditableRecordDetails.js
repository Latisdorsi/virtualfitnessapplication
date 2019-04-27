import React, { useState } from 'react'

import { View, Text } from 'react-native'
import ModalSelector from 'react-native-modal-selector';
import { Button } from 'react-native-paper'


let index = 0;


const ageData =

    [
        { key: index++, label: '16' },
        { key: index++, label: '17' },
        { key: index++, label: '18' },
        { key: index++, label: '19' },
        { key: index++, label: '20' },
        { key: index++, label: '21' },
        { key: index++, label: '22' },
        { key: index++, label: '23' },
        { key: index++, label: '24' },
    ]

const sexData = [
    { key: index++, label: 'Male' },
    { key: index++, label: 'Female' },
]


const weightData = [
    { key: index++, label: '59' },
    { key: index++, label: '59' },
    { key: index++, label: '60' },
    { key: index++, label: '61' },
    { key: index++, label: '62' },
    { key: index++, label: '63' },
    { key: index++, label: '64' },
    { key: index++, label: '65' },
    { key: index++, label: '66' },
    { key: index++, label: '63' },
]

const heightData = [
    { key: index++, label: '168' },
    { key: index++, label: '169' },
    { key: index++, label: '170' },
    { key: index++, label: '171' },
    { key: index++, label: '172' },
    { key: index++, label: '173' },
    { key: index++, label: '174' }
]

const neckData = [
    { key: index++, label: '29' },
    { key: index++, label: '30' },
    { key: index++, label: '31' },
    { key: index++, label: '32' },
    { key: index++, label: '33' },
    { key: index++, label: '34' },
    { key: index++, label: '35' },
    { key: index++, label: '36' },
    { key: index++, label: '37' },
    { key: index++, label: '38' },
    { key: index++, label: '39' },
    { key: index++, label: '40' },
    { key: index++, label: '41' },
]

const waistData = [
    { key: index++, label: '69' },
    { key: index++, label: '70' },
    { key: index++, label: '71' },
    { key: index++, label: '72' },
    { key: index++, label: '73' },
    { key: index++, label: '74' },
    { key: index++, label: '75' },
    { key: index++, label: '76' },
    { key: index++, label: '77' },
    { key: index++, label: '78' },
    { key: index++, label: '79' },
    { key: index++, label: '80' },
    { key: index++, label: '81' },
]

const hipsData = [
    { key: index++, label: '69' },
    { key: index++, label: '70' },
    { key: index++, label: '71' },
    { key: index++, label: '72' },
    { key: index++, label: '73' },
    { key: index++, label: '74' },
    { key: index++, label: '75' },
    { key: index++, label: '76' },
    { key: index++, label: '77' },
    { key: index++, label: '78' },
    { key: index++, label: '79' },
    { key: index++, label: '80' },
    { key: index++, label: '81' },
]


function Measurement({ name, suffix, data, value, setValue }) {
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


const EditableRecordDetails = ({ value, setValue }) => {
    let [weight, setWeight] = useState(value.weight)
    let [neck, setNeck] = useState(value.neck)
    let [waist, setWaist] = useState(value.waist)
    let [hips, setHips] = useState(value.hips)

    let [bicep, setBicep] = useState(value.bicep)
    let [forearm, setForearm] = useState(value.forearm)
    let [calf, setCalf] = useState(value.calf)
    let [thigh, setThigh] = useState(value.thigh)

    const saveData = () => {
        const newData = {
            weight,
            neck,
            waist,
            hips,
            bicep,
            forearm,
            calf,
            thigh
        }
        setValue(newData)
    }

    return (
        <View>
            <Measurement name="Weight" data={weightData} suffix="kg" value={weight} setValue={setWeight} />

            <Measurement name="Neck" data={neckData} suffix="cm" value={neck} setValue={setNeck} />

            <Measurement name="Waist" data={waistData} suffix="cm" value={waist} setValue={setWaist} />

            <Measurement name="Hips" data={hipsData} suffix="cm" value={hips} setValue={setHips} />

            <Measurement name="Bicep" data={hipsData} suffix="cm" value={bicep} setValue={setBicep} />

            <Measurement name="Hips" data={hipsData} suffix="cm" value={forearm} setValue={setForearm} />

            <Measurement name="Calf" data={hipsData} suffix="cm" value={calf} setValue={setCalf} />

            <Measurement name="Thigh" data={hipsData} suffix="cm" value={thigh} setValue={setThigh} />

            <Button onPress={saveData}>Save</Button>
        </View>
    )
}

export default EditableRecordDetails