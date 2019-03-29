import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

import HomeScreen from './screens/HomeScreen';

export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
      {
        SignedIn: {
          screen: Login
        },
        SignedOut: {
          screen: Dashboard
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    );
  };


export const Login = createStackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            headerVisible: false,
            header: null
        },
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: null
        }
        
    },
    headerMode: 'none'
});

export const Dashboard = createDrawerNavigator({
    Home: {
        screen: HomeScreen
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

});