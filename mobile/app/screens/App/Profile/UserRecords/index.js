import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Subheading, Card, IconButton, Button } from 'react-native-paper';

import RowViewComponent from 'lib/components/RowViewComponent'
import { CalculateComposition } from 'lib/helpers/utils'
import DeviceStorage from 'lib/services/DeviceStorage'

import RecordDetails from './RecordDetails'
import EditableRecordDetails from './EditableRecordDetails'
import Axios from 'axios';
export default function UserRecords() {

    let height = 173

    //Receive Record Details
    const [measurementDetails, setMeasurementDetails] = useState({
        weight: 0,
        neck: 0,
        waist: 0,
        hips: 0,
        bicep: 0,
        forearm: 0,
        calf: 0,
        thigh: 0,
        bodyComposition: {
            category: '',
            percentBodyFat: 0,
            percentLeanMass: 0
        }
    })

    //Calculate Body Composition
    const compositionValue = CalculateComposition(
        23,
        'Male',
        measurementDetails.weight,
        height,
        measurementDetails.neck,
        measurementDetails.waist,
        measurementDetails.hips
    )

    //setMeasurementDetails({ bodyComposition: compositionValue })

    const [editable, setEditable] = useState(false)

    useEffect(() => {
        DeviceStorage.loadItem('token').then(token => {
            const tokenData = parseToken(token)
            Axios.get('http://10.0.2.2:3000/measurement/' + tokenData._id)
                .then(response => {
                    //Do nothing for now
                })
                .catch(error => {
                    console.log('An Error Occured')
                })
        })
        .catch(err => {
            console.log('An Error Occur')
        })
    }, [])

    useEffect(() => {
        setMeasurementDetails({
            ...measurementDetails,
            bodyComposition: compositionValue
        })
    }, [measurementDetails])

    return (
        <ScrollView>
            <View
                style={{
                    justifyContent: 'center',
                    padding: 15
                }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Subheading>Body Composition</Subheading>

                    <View>
                        <Text>Composition Level: {
                            measurementDetails.bodyComposition.category ?
                                measurementDetails.bodyComposition.category :
                                'Not Set'
                        }</Text>
                    </View>
                    <View>
                        <Text>Body Fat Percentage: {
                            measurementDetails.bodyComposition.percentBodyFat ?
                                Math.round(measurementDetails.bodyComposition.percentBodyFat * 100) / 100 :
                                'Not Set'}</Text>
                    </View>
                    <View>
                        <Text>Lean Body Mass Percentage: {
                            measurementDetails.bodyComposition.percentLeanMass ?
                                Math.round(measurementDetails.bodyComposition.percentLeanMass * 100) / 100 :
                                'Not Set'
                        }</Text>
                    </View>
                </View>

                <Card style={{ padding: 15, marginVertical: 15 }}>
                    <RowViewComponent>
                        <Subheading>Body Measurement</Subheading>
                        <IconButton
                            icon="edit"
                            size={20}
                            onPress={() => {
                                if (!editable)
                                    setEditable(true)
                                else
                                    setEditable(false)
                            }}
                        />
                    </RowViewComponent>

                    {editable ?
                        <EditableRecordDetails value={measurementDetails} setValue={setmeasurementDetails} /> :
                        <RecordDetails value={measurementDetails} />
                    }


                </Card>
            </View>
        </ScrollView >
    )
}