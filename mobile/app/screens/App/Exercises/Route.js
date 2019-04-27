import React, { useState } from 'react'
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'

import List from './List'
import Details from './Details'


const ExerciseStackNavigator = createStackNavigator({
    List: {
        screen: List,
        navigationOptions: { title: 'Exercises' }
    },
    Details: {
        screen: Details,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.itemName,
          }),
      
    },
})

export default createAppContainer(ExerciseStackNavigator)