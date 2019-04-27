import React, { useState } from 'react'
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'

import List from './SettingList'
import ChangeEmail from './ChangeEmail'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'
import ExportAccount from './ExportAccount'

const SettingStackNavigator = createStackNavigator({
    List: {
        screen: List,
        navigationOptions: { title: 'Settings' }
    },
    ChangeEmail: {
        screen: ChangeEmail,
        navigationOptions: { title: 'Change Email Address' }
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: { title: 'Change Password' }
    },
    DeleteAccount: {
        screen: DeleteAccount,
        navigationOptions: { title: 'Delete Account' }
    },
    ExportAccount: {
        screen: ExportAccount,
        navigationOptions: { title: 'Export Account' }
    }
})

export default createAppContainer(SettingStackNavigator)