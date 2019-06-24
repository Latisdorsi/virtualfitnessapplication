import React, { useContext} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import update from 'immutability-helper';

import RecordContext from './RecordContext'

export default function RecordForm({ set, ParentIndex, ChildIndex }) {
    const [exercises, setExercises] = useContext(RecordContext)
    

    const updateSets = (name, value) => {

        const updatedExercises = update(exercises, {
            [ParentIndex]: {
                sets: {
                    [ChildIndex]: {
                        [name]: { $set: parseInt(value) }
                    }
                }
            }
        })
        console.log(updatedExercises)
        setExercises(updatedExercises)
    }

    return (
        <View
            key={ChildIndex}
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
                    }}>{ChildIndex + 1}</Text>
                <Text style={styles.accentedText}>Set</Text>
            </View>
            <Text>/</Text>
            <View style={styles.recordsContainer}>
                <TextInput
                    style={styles.recordsInput}
                    value={set.reps}
                    maxLength={2}
                    placeholder="0"
                    onChangeText={value => {updateSets('reps', value)}}
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
                    onChangeText={value => {updateSets('weight', value)}}
                    underlineColorAndroid="#666666"
                    keyboardType='numeric' />
                <Text style={styles.accentedText}>KG</Text>
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
