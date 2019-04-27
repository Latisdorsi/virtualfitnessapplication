import React, { useState } from 'react'
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'

import Calendar from './Calendar'


const CalendarStackNavigator = createStackNavigator({
    Calendar: {
        screen: Calendar,
        navigationOptions: { title: 'Calendar' }
    }
})

export default createAppContainer(CalendarStackNavigator)