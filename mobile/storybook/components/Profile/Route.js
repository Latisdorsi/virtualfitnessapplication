import React, { useState } from 'react'
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'

import UserProfile from './UserProfile'
import UserRecords from './UserRecords'
import UserChart from './UserChart'

const ProfileNavigator = createMaterialTopTabNavigator({
    Profile: { screen: UserProfile },
    Measurement: { screen: UserRecords },
    Charts: {screen: UserChart}
})

export default createAppContainer(ProfileNavigator)