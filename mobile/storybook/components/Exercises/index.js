import React, { Component } from 'react'
import { View, ScrollView, FlatList, Text } from 'react-native'
import { List } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const exerciseData = [
    { name: 'Barbell Squat' },
    { name: 'Bench Press' }
]


export default function Exercises() {
    const ExerciseItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <List.Item
                    title={item.name}
                    left={props => <List.Icon {...props} icon="folder" />}
                />
            </TouchableOpacity>
        )
    }
    return <FlatList
        data={exerciseData}
        renderItem={({ item }) =>
            <ExerciseItem item={item} />
        }
    />
}