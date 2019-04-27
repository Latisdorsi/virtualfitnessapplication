import React from 'react'
import { View, ScrollView, FlatList, Text } from 'react-native'
import { List } from 'react-native-paper';
import { createMaterialTopTabNavigator } from 'react-navigation';


import Instruction from './Instruction'
import History from './History'
import Records from './Records'

const ExerciseTabNavigator = createMaterialTopTabNavigator({
    Instruction: { screen: Instruction },
    History: { screen: History },
    Records: { screen: Records }
})

export default ExerciseTabNavigator



