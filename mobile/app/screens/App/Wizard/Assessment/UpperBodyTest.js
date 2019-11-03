import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native"
import { Subheading } from "react-native-paper";


const calculateScore = (gender, weightRatio, age) => {
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


export default function UpperBodyTest({ setValue }) {


    const gender = 'Male'
    const weight = 63;
    const age = 23;
    const [upperScoreData, setUpperScoreData] = useState({
        reps: '',
        weight: ''
    })

    const [oneRepMax, setOneRepMax] = useState(0)
    const [level, setLevel] = useState(0)


    handleUpperInputChange = (type, value) => {
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
            ...upperScoreData,
            [name]: value
        }
        setUpperScoreData(updatedSet)
    }

    useEffect(() => {
        const oneRepMax = Math.round(upperScoreData.weight * (1 + (upperScoreData.reps / 30)) * 100) / 100;
        const weightRatio = oneRepMax / weight;

        //Set OneRepMax and Level
        setOneRepMax(oneRepMax.toFixed(2));
        setLevel(calculateScore(gender, weightRatio, age));


    }, [upperScoreData]);

    useEffect(() => {
        const weightRatio = oneRepMax / weight;
        const upperBodyStrength = {
            level,
            oneRepMax,
            weightRatio
        }

        setValue(upperBodyStrength);
    }, [level])

    return (
        <View >
            <View style={{
                alignItems: 'center'
            }}>
                <Subheading >Upper Body Strength Test</Subheading>
                <Text>Instructions</Text>
                <Text>Level: {level}</Text>
                <Text>1RM: {oneRepMax} kg</Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <View style={styles.recordsContainer}>
                    <TextInput
                        style={styles.recordsInput}
                        placeholder="0"
                        value={upperScoreData.reps}
                        onChangeText={value => { this.handleUpperInputChange('reps', value) }}
                        underlineColorAndroid="#666666"
                        maxLength={4}
                        keyboardType='numeric' />
                    <Text style={styles.accentedText}>Reps</Text>
                </View>
                <Text>/</Text>
                <View style={styles.recordsContainer}>
                    <TextInput
                        style={styles.recordsInput}
                        placeholder="0"
                        value={upperScoreData.weight}
                        onChangeText={value => { this.handleUpperInputChange('weight', value) }}
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

/*
    if (age < 20) {
        if (point > 1.76) {

        }
        if (point < 1.76 && point > 1.34) {

        }
        if (point < 1.34 && point > 1.19) {

        }
        if (point < 1.119 && point > 1.06) {

        }
        if (point < 1.06 && point > 0.89) {

        }

        if (point < 0.89) {

        }

    }
    else if (age > 20 && age < 30) {
        if (point > 1.63) {

        }
        if (point < 1.63 && point > 1.32) {

        }
        if (point < 1.32 && point > 1.14) {

        }
        if (point < 1.14 && point > 0.99) {

        }
        if (point < 0.99 && point > 0.88) {

        }

        if (point < 0.88) {

        }
    }

    else if (age > 30 && age < 30) {
        if (point > 1.35) {

        }
        if (point < 1.35 && point > 1.08) {

        }
        if (point < 1.08 && point > 0.96) {

        }
        if (point < 0.96 && point > 0.86) {

        }
        if (point < 0.86 && point > 0.75) {

        }

        if (point < 0.75) {

        }
    }
    else if (age > 40 && age < 30) {
        if (point > 1.76) {

        }
        if (point < 1.76 && point > 1.34) {

        }
        if (point < 1.34 && point > 1.19) {

        }
        if (point < 1.119 && point > 1.06) {

        }
        if (point < 1.06 && point > 0.89) {

        }

        if (point < 0.89) {

        }
    }
    else if (age > 50 && age <= 60) {
        if (point > 1.76) {

        }
        if (point < 1.76 && point > 1.34) {

        }
        if (point < 1.34 && point > 1.19) {

        }
        if (point < 1.119 && point > 1.06) {

        }
        if (point < 1.06 && point > 0.89) {

        }

        if (point < 0.89) {

        }
    }
    */