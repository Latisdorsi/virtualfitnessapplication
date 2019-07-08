import React, { useState } from 'react'
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'

import UserProfile from './UserProfile'
import UserRecords from './UserRecords'
import UserChart from './UserChart'

const ProfileNavigator = createMaterialTopTabNavigator({
    Profile: { screen: UserProfile },
    Measurement: { screen: UserRecords },
    Progress: { screen: UserChart }
})

export default ProfileNavigator