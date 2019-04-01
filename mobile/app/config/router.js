import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View } from 'react-native'
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from "react-navigation";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

import HomeScreen from './screens/HomeScreen';

export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator({
        SignedIn: {
            screen: Login
        },
        SignedOut: {
            screen: Dashboard
        }
    }, {
            initialRouteName: signedIn
                ? "SignedIn"
                : "SignedOut"
        });
};

export const Login = createStackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            headerVisible: false,
            header: null
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: null
        }

    },
    headerMode: 'none'
});

const CustomDrawerContentComponent = props => {
    return (
        <ScrollView>
            <SafeAreaView>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={{ uri: props.screenProps.avatarURL }}
                    />
                    <Text>{props.screenProps.fullName}</Text>
                    <Text>{props.screenProps.email}</Text>
                </View>
            </SafeAreaView>

            <SafeAreaView
                style={styles.container}
                forceInset={{
                    top: 'always',
                    horizontal: 'never'
                }}>
                <DrawerItems {...props} />
            </SafeAreaView>
        </ScrollView>
    );
}

export const Dashboard = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home'
        }
    },
    Records: {
        screen: HomeScreen
    },
    Workout: {
        screen: HomeScreen
    },
    Cycle: {
        screen: HomeScreen
    },
    Settings: {
        screen: HomeScreen
    },
    Logout: {
        screen: HomeScreen
    }
}, { contentComponent: CustomDrawerContentComponent });

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
