import React from 'react'
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'

import Profile from './Profile'
import Exercises from './Exercises'
import Schedules from './Schedules'

const MainNavigator = createBottomTabNavigator({
    Profile: { screen: Profile },
    Dashboard: { screen: Profile },
    Exercises: { screen: Exercises },
    Schedule: { screen: Schedules }

})

export default createAppContainer(MainNavigator)