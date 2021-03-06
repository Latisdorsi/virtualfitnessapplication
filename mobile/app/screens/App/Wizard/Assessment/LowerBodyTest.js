import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native"
import { Subheading } from "react-native-paper";


const calculateScore = (gender, weightRatio, age) => {

    if (gender == 'Male') {
        if (age > 20 && age < 30) {
            if (weightRatio > 1.63) {
                return 6;
            }
            if (weightRatio < 1.63 && weightRatio > 1.32) {
                return 5;
            }
            if (weightRatio < 1.32 && weightRatio > 1.14) {
                return 4;
            }
            if (weightRatio < 1.14 && weightRatio > 0.99) {
                return 3;
            }
            if (weightRatio < 0.99 && weightRatio > 0.88) {
                return 2;
            }

            if (weightRatio < 0.88 && weightRatio > 0) {
                return 1;
            }

            else {
                return 0;
            }
        }
    }
}

export default function LowerBodyTest({ setValue }) {

    const gender = 'Male'
    const weight = 63;
    const age = 23;
    const [scoreData, setScoreData] = useState({
        reps: '',
        weight: ''
    })
    const [oneRepMax, setOneRepMax] = useState(0)
    const [level, setLevel] = useState(0)


    handleLowerInputChange = (type, value) => {

        if (type == 'reps') {
            if (/^[1-9][0-9]*$|^$/.test(value)) {
                updateSets(type, value)
            }
        }
        else if (type == 'weight') {
            if (/^[1-9][0-9]*\.?\d*$|^$/.test(value)) {
                updateSets(type, value)
            }
        }
    }
    const updateSets = (name, value) => {
        const updatedSet = {
            ...scoreData,
            [name]: value
        }
        setScoreData(updatedSet)
    }

    useEffect(() => {
        const oneRepMax = Math.round(scoreData.weight * (1 + (scoreData.reps / 30)) * 100) / 100
        const weightRatio = oneRepMax / weight
        setOneRepMax(oneRepMax.toFixed(2))
        setLevel(calculateScore(gender, weightRatio, age))
    }, [scoreData])

    useEffect(() => {
        const weightRatio = oneRepMax / weight
        let lowerBodyStrength = {
            level,
            oneRepMax,
            weightRatio
        }
        setValue(lowerBodyStrength)
    }, [level])

    return (
        <View>
            <View
                style={{
                    alignItems: 'center'
                }}>
                <Subheading >Lower Body Strength Test</Subheading>
                <Text>Instructions</Text>
                <Text>Level: {level}</Text>
                <Text>1RM: {oneRepMax} kg</Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 70
                }}>
                <View style={styles.recordsContainer}>
                    <TextInput
                        style={styles.recordsInput}
                        placeholder="0"
                        value={scoreData.reps}
                        maxLength={4}
                        onChangeText={value => { this.handleLowerInputChange('reps', value) }}
                        underlineColorAndroid="#666666"
                        keyboardType='numeric' />
                    <Text style={styles.accentedText}>Reps</Text>
                </View>
                <Text>/</Text>
                <View style={styles.recordsContainer}>
                    <TextInput
                        style={styles.recordsInput}
                        placeholder="0"
                        value={scoreData.weight}
                        maxLength={5}
                        onChangeText={value => { this.handleLowerInputChange('weight', value) }}
                        underlineColorAndroid="#666666"
                        keyboardType='numeric' />
                    <Text style={styles.accentedText}>KG</Text>
                </View>
            </View>


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
