import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native"
import { Headline, Subheading, Card } from "react-native-paper";

export default function UpperBodyTest() {
    const [data, setData] = useState({
        reps: 0,
        weight: 0
    })
    const [oneRepMax, setOneRepMax] = useState(0)
    const [score, setScore] = useState('None')

    const updateSets = (name, value) => {
        const updatedSet = {
            ...data,
            [name]: value
        }
        setData(updatedSet)

    }

    useEffect(() => {
        const oneRepMax = Math.round(data.weight * (1 + (data.reps / 30)) * 100) / 100
        setOneRepMax(oneRepMax)
    })

    return (
        <View >
            <View style={{
                alignItems:'center'
            }}>
                <Subheading >Upper Body Strength Test</Subheading>
                <Text>Instructions</Text>
                <Text>Level: {score}</Text>
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
                        value={data.reps}
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
                        value={data.weight}
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
