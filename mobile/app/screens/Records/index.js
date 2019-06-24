import React, { createContext, useState, useContext, useEffect } from "react";
import {
    View,
    ScrollView
} from 'react-native';
import { Divider } from 'react-native-paper'

import RecordContext from './RecordContext'

import { default as RecordHeader } from './RecordHeader'
import { default as RecordDetails } from './RecordDetails'


function ExercisesWrapper({ children }) {
    const [exercises] = useContext(RecordContext)
    return (
        exercises.map((exercise, index) => {
            return (
                <View key={index}>
                    <RecordHeader exercise={exercise} />
                    <RecordDetails exercise={exercise} index={index} />
                    <Divider />
                </View>
            )
        })
    )
}



export default function Records({ ExerciseData, children }) {
    const exerciseState = useState(ExerciseData)
    return (
        //Load Exercise Data From State
        <RecordContext.Provider value={exerciseState}>
                <View style={{
                    padding: 15
                }}>
                    <ExercisesWrapper />
                </View>
        </RecordContext.Provider>
    )
}