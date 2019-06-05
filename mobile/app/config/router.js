import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


// Initial Loading Screen
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen'
import AppLoadingScreen from '../screens/App/LoadingScreen'

//Auth Stack Screens
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register"

//Dashboard Screens
import Dashboard from '../screens/App/Dashboard'

//Profile Screens
import Profile from '../screens/App/Profile'

//Exercise Screens
import Exercises from '../screens/App/Exercises'
import Exercise from '../screens/App/Exercises/Details'

//Calendar Screens
import Calendar from '../screens/App/Calendar'

//Settings Screens
import Wizard from '../screens/App/Wizard'
import Settings from '../screens/App/Settings'
import ChangeEmail from '../screens/App/Settings/ChangeEmail'
import ChangePassword from '../screens/App/Settings/ChangePassword'
import DeleteAccount from '../screens/App/Settings/DeleteAccount'
import ExportAccount from '../screens/App/Settings/ExportAccount'


// Profile Screen Stack NAvigation
const ProfileStackNavigator = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: { title: 'Profile' }
    }
})


// Exercise Screen Stack Navigation
const ExerciseStackNavigator = createStackNavigator({
    List: {
        screen: Exercises,
        navigationOptions: { title: 'Exercises' }
    },
    Details: {
        screen: Exercise,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.itemName,
        }),

    },
})


// Calendar Screen Stack Navigation
const CalendarStackNavigator = createStackNavigator({
    Calendar: {
        screen: Calendar,
        navigationOptions: { title: 'Calendar' }
    }
})


// Settings Screen Stack Navigation
const SettingStackNavigator = createStackNavigator({
    List: {
        screen: Settings,
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
    ExportAccount: {
        screen: ExportAccount,
        navigationOptions: { title: 'Export Account' }
    },
    DeleteAccount: {
        screen: DeleteAccount,
        navigationOptions: { title: 'Delete Account' }
    },
    Logout: {
        screen: ExportAccount,
        navigationOptions: { title: 'Logout' }
    }
})



const AppStack = createAppContainer(createBottomTabNavigator({
    Profile: {
        screen: ProfileStackNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="account-outline" size={25} />
            )
        }
    },
    Exercises: {
        screen: ExerciseStackNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="run-fast" size={25} />
            )
        }
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home-outline" size={25} />
            )
        }
    },
    Calendar: {
        screen: CalendarStackNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="calendar" size={25} />
            )
        }
    },
    Settings: {
        screen: SettingStackNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="settings-outline" size={25} />
            )
        }

    },

}, {
        tabBarOptions: {
            showLabel: false
        },
        initialRouteName: 'Dashboard'
    })
)

const MainStack = createAppContainer(createSwitchNavigator({
    Wizard:{
        screen: Wizard,
        navigationOptions: {
            title: 'Wizard'
        }
    },
    App: AppStack,
    WizardStackLoading: AppLoadingScreen},
     {
        initialRouteName: 'Wizard'
    }
));

//Stack Navigator For Logging In and Signing Up
const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerVisible: false,
            header: null
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            title: 'Register'
        }

    },
    headerMode: 'none'
});



export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        LoggedIn: {
            screen: ({ navigation }) => <MainStack screenProps={{ rootNavigation: navigation }} />
        },
        LoggedOut: AuthStack
    }, {
        initialRouteName: 'AuthLoading'
    }
));



