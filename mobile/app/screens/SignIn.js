import React, {Component} from 'react'
import {View, Text, StyleSheet, Button, TextInput, Alert} from 'react-native';

export class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'email',
            password: 'password'
        };
    }
    static defauavigationOptions = {
        drawerLabel: 'Login'
    };
    render() {
        return (
            <View>
                <Text>Login</Text>
                <TextInput
                    style={{
                    height: 40
                }}
                    onChangeText={(text) => this.setState({email})}
                    value={this.state.email}/>
                <TextInput
                    style={{
                    height: 40
                }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}/>
                <Button
                    onPress={() => {
                    Alert.alert('You tapped the button!');
                }}
                    title="Login"/>
                <Text
                onPress={() => {this.props.navigation.navigate("SignUp")}}>Sign Up</Text>
            </View>
        )
    }
}

export default SignIn
