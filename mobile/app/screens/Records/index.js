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
        exercises ?
            exercises.map((exercise, index) => {
                return (
                    <View key={index}>
                        <RecordHeader exercise={exercise} />
                        <RecordDetails exercise={exercise} index={index} />
                        <Divider />
                    </View>
                )
            })
            :
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
    )
}



export default function Records({ ExerciseData, children }) {

    const [exerciseState, setExerciseState] = useState([]);
    useEffect(() => {
        axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408/routine')
            .then(response => {
                setExerciseState(response.data);
            })
            .catch(err => {
                console.warn(err);
            })
    }, []);

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