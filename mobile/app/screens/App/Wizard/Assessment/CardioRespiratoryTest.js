import React,  { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native"
import { Headline, Subheading, Card } from "react-native-paper";

export default function CardioRespiratoryTest() {

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
    
                if (weightRatio < 0.88) {
                    return 1;
                }
    
                else if (weightRatio == 0) {
                    return 0;
                }
            }
        }
    }

    const gender = 'Male';
    const weight = 63;
    const age = 23;
    const [scoreData, setScoreData] = useState({
        reps: 0,
        weight: 0
    });
    const [oneRepMax, setOneRepMax] = useState(0);
    const [level, setLevel] = useState('None');


    const updateSets = (name, value) => {
        const updatedSet = {
            ...scoreData,
            [name]: value
        }
        setScoreData(updatedSet);
    }

    useEffect(() => {
        const oneRepMax = Math.round(scoreData.weight * (1 + (scoreData.reps / 30)) * 100) / 100;
        const weightRatio = oneRepMax / weight;

        setOneRepMax(oneRepMax);
        setLevel(calculateScore(gender, weightRatio, age));

        let lowerBodyStrength = {
            level,
            oneRepMax,
            weightRatio
        }
        setValue(lowerBodyStrength)
    }, [scoreData])
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Subheading>Cardio Respiratory Fitness Test</Subheading>
            <Subheading>Flexibility Test</Subheading>
            <Text>Score:</Text>
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
                        onChangeText={value => { updateSets('reps', value) }}
                        maxLength={2}
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
                        maxLength={3}
                        onChangeText={value => { updateSets('weight', value) }}
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