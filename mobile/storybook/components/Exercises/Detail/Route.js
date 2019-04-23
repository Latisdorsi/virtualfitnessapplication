import React from 'react'
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'

import Instruction from './Instruction'
import History from './History'
import Records from './Records'

const ExerciseDetailNavigator = createMaterialTopTabNavigator({
    Instruction: { screen: Instruction },
    History: { screen: History },
    Records: {screen: Records}
})

export default createAppContainer(ExerciseDetailNavigator)