import React, {useState} from 'react'
import {createMaterialTopTabNavigator} from 'react-native'

const ProfileNavigator = createMaterialTopTabNavigator({
    Home: UserProfile,
    Records: UserRecords
}, TabNavigatorConfig)

export default ProfileNavigator