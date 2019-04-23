import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Subheading, Card, IconButton, Button } from 'react-native-paper';

import RowViewComponent from '../../RowViewComponent'

import RecordDetails from './RecordDetails'
import EditableRecordDetails from './EditableRecordDetails'


const CategorizeGroup = (sex, bodyFatPercent) => {
    if (sex == 'Male') {
        switch (true) {
            case (bodyFatPercent < 2):
                return 'Unacceptable'
            case (bodyFatPercent >= 2 && bodyFatPercent <= 4):
                return 'Essentail Fat';
            case (bodyFatPercent >= 6 && bodyFatPercent <= 13):
                return 'Athletes';
            case (bodyFatPercent >= 14 && bodyFatPercent <= 17):
                return 'Fitness';
            case (bodyFatPercent >= 17 && bodyFatPercent <= 25):
                return 'Acceptable';
            case (bodyFatPercent > 25):
                return 'Obese';
        }
    }
    else if (sex == 'Female') {
        switch (true) {
            case (bodyFatPercent < 10):
                return 'Unacceptable'
            case (bodyFatPercent >= 10 && bodyFatPercent <= 12):
                return 'Essentail Fat';
            case (bodyFatPercent >= 14 && bodyFatPercent <= 20):
                return 'Athletes';
            case (bodyFatPercent >= 21 && bodyFatPercent <= 24):
                return 'Fitness';
            case (bodyFatPercent >= 25 && bodyFatPercent <= 31):
                return 'Acceptable';
            case (bodyFatPercent > 31):
                return 'Obese';
        }

    }
    else {
        return 'Undefined'
    }
}

function CalculateComposition(age, sex, weight, height, neck, waist, hips) {

    let bodyComposition = {
        category: 0,
        percentBodyFat: 0,
        percentLeanMass: 0
    }

    let category, percentBodyFat, percentLeanMass

    if (weight > 0 && height > 0 && neck > 0 && waist > 0 && hips > 0) {
        if (sex == 'Male') {

            percentBodyFat = 495 / (1.0324 - 0.19077 * Math.log10(+waist - +neck) + 0.15456 * Math.log10(height)) - 450
        }
        else if (sex == 'Female') {
            percentBodyFat = 495 / (1.29579 - 0.35004 * Math.log10(+waist + +hips - +neck) + 0.22100 * Math.log10(height)) - 450
        }
    }
    console.log(percentBodyFat)
    if (percentBodyFat > 0) {
        bodyFatMass = ((weight * percentBodyFat) / 100)
        leanBodyMass = weight - bodyFatMass
        percentLeanMass = (leanBodyMass / weight) * 100

        category = CategorizeGroup(sex, percentBodyFat)
        return bodyComposition =
            {
                category,
                percentBodyFat,
                percentLeanMass
            }

    }

    //Return if values are not met
    return bodyComposition
}


const data = {
    weight: 63,
    neck: 32,
    waist: 72,
    hips: 73,
    bicep: 0,
    forearm: 0,
    calf: 0,
    thigh: 0
}


export default function UserRecords() {
    let height = 173
    let [recordDetails, setRecordDetails] = useState(data)
    let compositionValue = CalculateComposition(23, 'Male', recordDetails.weight, height, recordDetails.neck, recordDetails.waist, recordDetails.hips)

    let [bodyComposition, setBodyComposition] = useState(compositionValue)
    let [editable, setEditable] = useState(false)


    useEffect(() => {
        setBodyComposition(compositionValue)
    }, [recordDetails])


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
                        <Text>Composition Level: {bodyComposition.category}</Text>
                    </View>
                    <View>
                        <Text>Body Fat Percentage: {bodyComposition.percentBodyFat}</Text>
                    </View>
                    <View>
                        <Text>Lean Body Mass Percentage: {bodyComposition.percentLeanMass}</Text>
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
                        <EditableRecordDetails value={recordDetails} setValue={setRecordDetails} /> :
                        <RecordDetails value={recordDetails} />
                    }


                </Card>
            </View>
        </ScrollView >
    )
}