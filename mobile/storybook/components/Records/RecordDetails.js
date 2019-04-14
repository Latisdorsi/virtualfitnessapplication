import React, { useContext, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import update from 'immutability-helper';

import RecordContext from './RecordContext'

import { default as RecordForm } from './RecordForm'

export default function RecordDetails({ exercise, index }) {
    let parentIndex = index
    const [exercises, setExercises] = useContext(RecordContext)

    _addSet = () => {
        const updatedExercises = update(exercises, {
            [index]: {
                sets: {
                    $push: [{
                        reps: 0,
                        weight: 0
                    }]
                }
            }
        })

        setExercises(updatedExercises)
    }

    useEffect(() => {
        const volume = exercises
            .map((exercise) => {
                return exercise.sets
            })
            .flat()
            .map((set) => {
                return set.reps * set.weight
            })
            .reduce(function (initial, set) {
                return initial + set;
            }, 0);


        const oneRepMaxArray = exercises
            .map((exercise) => {
                return exercise.sets
            })
            .flat()
            .map((set) => {
                return set.weight * (1 + (set.reps / 30))
            })

        const oneRepMax = Math.max.apply(0, oneRepMaxArray)

        const updatedExercises = update(exercises, {
            [index]: {
                oneRepMax: { $set: oneRepMax },
                volume: { $set: volume }
            }
        })

        setExercises(updatedExercises)
    })

    return (
        <View>
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingVertical: 15
                }}>
                <View >
                    <Text
                        style={{
                            fontSize: 20,
                            color: '#000000',
                            alignSelf: 'center'
                        }}>{exercise.oneRepMax.toString().substr(0, 5)} kg</Text>
                    <Text>1-Rep Max</Text>
                </View>
                <View>
                    <Text
                        style={{
                            fontSize: 20,
                            color: '#000000',
                            alignSelf: 'center',
                        }}>{exercise.volume.toString().substr(0, 5)} kg</Text>
                    <Text>Volume</Text>
                </View>
            </View>

            {exercise.sets.map((set, index) => {
                return (
                    <View>
                        <RecordForm set={set} ParentIndex={parentIndex} ChildIndex={index} />
                    </View>
                )
            })}

            <TouchableOpacity onPress={this._addSet} style={{ paddingVertical: 15 }}>
                <Text
                    style={{
                        alignSelf: 'center',
                        color: '#ef6c57',
                    }}>
                    Add Set
                    </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    header: {
        fontSize: 12,
        fontFamily: 'Cochin'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'

    },
    recordsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    recordsInput: {
        marginHorizontal: 10,
        height: 60,
        paddingLeft: 6,
        fontSize: 25
    },
    accentedText: {
        fontSize: 15,
        color: '#000000'
    },
    textBlack: {
        color: '#000000'
    }
})
