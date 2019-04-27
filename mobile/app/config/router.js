import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


// Initial Loading Screen
import LoadingScreen from '../screens/AuthLoadingScreen'

//Auth Stack Screens
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register"

//App Stack Screens
import Profile from '../screens/App/Profile'
import Exercises from '../screens/App/Exercises'
import Dashboard from '../screens/App/Dashboard'
import Settings from '../screens/App/Settings'
import Calendar from '../screens/App/Calendar'
import { IconButton } from 'react-native-paper';

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
const AppStack = createBottomTabNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="account-outline" size={25} />
            )
        }
    },
    Exercises: {
        screen: Exercises,
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
        screen: Calendar,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="calendar" size={25} />
            )
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="settings-outline" size={25} />
            )
        }

    },

}, {
        tabBarOptions: {
            showLabel: false
        }
    })

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: LoadingScreen,
        LoggedIn: AppStack,
        LoggedOut: AuthStack
    }, {
        initialRouteName: 'AuthLoading'
    }
));



