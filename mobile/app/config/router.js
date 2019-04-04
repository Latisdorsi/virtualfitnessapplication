import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View } from 'react-native'
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, DrawerItems, SafeAreaView, createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";

//Stack Navigator For Logging In and Signing Up
const AuthStack = createStackNavigator({
    SignIn: {
        screen: HomeScreen,
        navigationOptions: {
            headerVisible: false,
            header: null
        }
    },
    SignUp: {
        screen: HomeScreen,
        navigationOptions: {
            title: null
        }

    },
    headerMode: 'none'
});

// Drawer Navigator Custom Content
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

//Drawer Navigator For Main App Contents
const AppStack = createDrawerNavigator({
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


export default createAppContainer(createSwitchNavigator(
    {
        SignedIn: AppStack,
        SignedOut: AuthStack
    }, {
        initialRouteName: 'SignedIn'
    }
));



