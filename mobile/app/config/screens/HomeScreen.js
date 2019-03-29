import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, NetInfo } from 'react-native';
import { onSignOut} from '../auth'


export class HomeScreen extends Component {
    constructor(props){
        super(props)

        this.state = {
            isConnected: ''
        }
    }
    static defauavigationOptions = {
        drawerLabel: 'Home',


    };
    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );
        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({isConnected}); }
        );
      }
      
      componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );
      }
      
      _handleConnectivityChange = (isConnected) => {
        this.setState({
          isConnected,
        });
      };
      
   
    render() {
        return (
            <View>
                 <Text>{this.state.isConnected ? 'Online' : 'Offline'}</Text>
                <Text>Home Screen</Text>
                <Button title="Logout" onPress={() => onSignOut().then(() => navigation.navigate("Login"))}/>
            </View>
        )
    }
}

export default HomeScreen
