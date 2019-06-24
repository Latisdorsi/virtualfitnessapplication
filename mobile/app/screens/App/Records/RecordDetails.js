import React, { Component, useContext, useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import update from 'immutability-helper';

import { ThemeProvider } from "react-native-paper";


export default class RecordDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            record: {
                name: props.exercise._id,
                sets: [],
                oneRepMax: 0,
                volume: 0
            }
        }
    }

    componentDidMount() {
        sets = [];

        for (let index = 0; index < this.props.exercise.sets; index++) {
            sets.push({
                rep: 0,
                weight: 0
            })
        }

        this.setState({
            record: {
                ...this.state.record,
                sets
            }
        }, () => {
            this.props.addRecords(this.state.record)
        })
    }

    componentWillReceiveProps(newProps) {
        // console.warn(newProps);
    }

    updateSets = (index, name, value) => {

        const updatedRecord =
            update(this.state.record, {
                sets: {
                    [index]: {
                        [name]: { $set: parseInt(value) }
                    }
                }
            })
        this.setState({
            record: {
                ...updatedRecord
            }
        }, () => {
            const volume = this.state.record.sets
                .map((set) => {
                    return set.rep * set.weight
                })
                .reduce(function (initial, set) {
                    return initial + set;
                }, 0);

            const oneRepMaxArray = this.state.record.sets
                .map((set) => {
                    return set.weight * (1 + (set.rep / 30))
                })

            const oneRepMax = Math.max.apply(0, oneRepMaxArray);

            this.setState({
                record: {
                    ...this.state.record,
                    oneRepMax,
                    volume
                }
            }, () => {
                // console.warn(this.state.record);
                this.props.updateRecords(this.props.index, this.state.record);
            })

        })
    }

    render() {
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
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#000000',
                                alignSelf: 'center'
                            }}>{this.state.record.oneRepMax} kg</Text>
                        <Text>1-Rep Max</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#000000',
                                alignSelf: 'center',
                            }}>{this.state.record.volume} kg</Text>
                        <Text>Volume</Text>
                    </View>
                </View>

                {
                    this.state.record.sets.map((set, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    height: 70
                                }}>
                                <View style={styles.recordsContainer}>
                                    <Text
                                        style={{
                                            paddingHorizontal: 10,
                                            fontSize: 25,
                                            color: '#000000'
                                        }}>{index + 1}</Text>
                                    <Text style={styles.accentedText}>Set</Text>
                                </View>
                                <Text>/ </Text>
                                <View style={styles.recordsContainer}>
                                    <TextInput
                                        style={styles.recordsInput}
                                        value={set.rep}
                                        maxLength={2}
                                        placeholder="0"
                                        onChangeText={value => { this.updateSets(index, 'rep', value) }}
                                        label="reps"
                                        underlineColorAndroid="#666666"
                                        keyboardType='numeric' />
                                    <Text style={styles.accentedText}>Reps</Text>
                                </View>
                                <Text>/</Text>
                                <View style={styles.recordsContainer}>
                                    <TextInput
                                        style={styles.recordsInput}
                                        placeholder="0"
                                        maxLength={3}
                                        value={set.weight}
                                        onChangeText={value => { this.updateSets(index, 'weight', value) }}
                                        underlineColorAndroid="#666666"
                                        keyboardType='numeric' />
                                    <Text style={styles.accentedText}>KG</Text>
                                </View>
                            </View>
                        )
                    })
                }

            </View>
        )
    }
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


//   // exercises.map(exercise => {
//     //     record = {};
//     //     for (let index = 0; index < exercise.set.length; index++) {
//     //         record.push({
//     //             set: index,
//     //             weight: 0,
//     //             oneRepMax: 0,
//     //             volume: 0
//     //         })
//     //     }
//     //     setRecords([
//     //         ...records,
//     //         record
//     //     ])
//     // })

//     _addSet = () => {

//         // const updatedExercises = update(exercises, {
//         //     [index]: {
//         //         sets: {
//         //             $push: [{
//         //                 reps: 0,
//         //                 weight: 0
//         //             }]
//         //         }
//         //     }
//         // })
//         // setExercises(updatedExercises)

//     }

    // _setRecord = (name, value, index) => {
    //     setTempRecord({
    //         ...tempRecord,
    //         sets: {
    //             [index]: {
    //                 [name]: value
    //             }
    //         }
    //     })

    // }