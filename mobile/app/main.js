import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation'

import axios from 'axios'

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
import Settings from '../screens/App/Settings'
import ChangeEmail from '../screens/App/Settings/ChangeEmail'
import ChangePassword from '../screens/App/Settings/ChangePassword'
import DeleteAccount from '../screens/App/Settings/DeleteAccount'
import ExportAccount from '../screens/App/Settings/ExportAccount'

import Records from '../screens/App/Records';

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

const DashboardStackNavigator = createStackNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            headerVisible: false,
            header: null
        }
    },
    Records: {
        screen: Records,
        navigationOptions: {
            title: 'Record Exercises'
        }
    }
});


const AppStack = createAppContainer(createBottomTabNavigator({
    Profile: {
        screen: ProfileStackNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="account-outline" size={25} color={tintColor} />
            )
        }
    },
    Exercises: {
        screen: ExerciseStackNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="run-fast" size={25} color={tintColor} />
            )
        }
    },
    Dashboard: {
        screen: DashboardStackNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home-outline" size={25} color={tintColor} />
            )
        }
    },
    Calendar: {
        screen: CalendarStackNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="calendar" size={25} color={tintColor} />
            )
        }
    },
    Settings: {
        screen: SettingStackNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="settings-outline" size={25} color={tintColor} />
            )
        }

    },

}, {
        initialRouteName: 'Dashboard',
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
        barStyle: { backgroundColor: '#694fad' },
        tabBarOptions: {
            showLabel: true
        }
    })
)


export default class App extends Component {
    componentDidMount() {

    }

    render() {
        return <AppStack />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e'
    }
});
