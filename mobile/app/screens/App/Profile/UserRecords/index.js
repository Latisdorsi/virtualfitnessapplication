import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Subheading, Card, IconButton, Button } from 'react-native-paper';

import RowViewComponent from 'lib/components/RowViewComponent';
import DeviceStorage from 'lib/services/DeviceStorage';
import { parseToken } from 'lib/helpers/utils';

import RecordDetails from './RecordDetails';
import EditableRecordDetails from './EditableRecordDetails';
import axios from 'axios';

export default function UserRecords() {

    //Receive Record Details
    const [measurementDetails, setMeasurementDetails] = useState({
        weight: 0,
        neck: 0,
        waist: 0,
        hips: 0,
        bodyComposition: {
            category: '',
            percentBodyFat: 0,
            percentLeanMass: 0
        }
    })

    //setMeasurementDetails({ bodyComposition: compositionValue })

    const [editable, setEditable] = useState(false)

    useEffect(() => {
        DeviceStorage.loadItem('token').then(token => {

            const tokenData = parseToken(token);
            axios
                .get('http://mvfagb.herokuapp.com/api/measurement/' + tokenData._id)
                .then(response => {
                    measurementObj = {
                        weight: response.data.weight,
                        neck: response.data.neck,
                        waist: response.data.waist,
                        hips: response.data.hips,
                        bodyComposition: response.data.bodyComposition
                    }
                    setMeasurementDetails({ ...measurementObj });
                })
                .catch(error => {
                    console.warn(error.response);
                })
        })
            .catch(err => {
                console.warn(err);
            })
    }, [])

    // useEffect(() => {
    //     setMeasurementDetails({
    //         ...measurementDetails,
    //         bodyComposition: compositionValue
    //     })
    // }, [measurementDetails])

    return (
        <ScrollView>
            <View
                style={{
                    justifyContent: 'center',
                    padding: 15
                }}>
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
                    <EditableRecordDetails value={measurementDetails} setValue={setMeasurementDetails} setEditable={setEditable} />
                    :
                    <>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View>
                                <Text><Subheading>Composition Level: </Subheading>{
                                    measurementDetails.bodyComposition ?
                                        measurementDetails.bodyComposition.category :
                                        'Not Set'
                                }</Text>
                            </View>
                            <View>
                                <Text><Subheading>Body Fat Percentage: </Subheading>{
                                    measurementDetails.bodyComposition ?
                                        Math.round(measurementDetails.bodyComposition.percentBodyFat * 100) / 100 :
                                        'Not Set'}</Text>
                            </View>
                            <View>
                                <Text><Subheading>Lean Body Mass Percentage: </Subheading>{
                                    measurementDetails.bodyComposition ?
                                        Math.round(measurementDetails.bodyComposition.percentLeanMass * 100) / 100 :
                                        'Not Set'
                                }</Text>
                            </View>
                        </View>
                        <RecordDetails value={measurementDetails} />
                    </>
                }

            </View>

        </ScrollView >
    )
}