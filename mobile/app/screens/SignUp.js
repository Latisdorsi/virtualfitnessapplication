import React, {Component} from 'react'
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'Email',
            password: 'Password',
            firstName: 'First Name',
            lastName: 'Last Name',
            password2: 'Confirm Password'
        };
    }
    static defauavigationOptions = {
        drawerLabel: 'Home'
    };

    render() {
        return (
            <View>
                <Text>Sign Up</Text>
                <TextInput
                    style={{
                    height: 40
                }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 5, flexDirection: 'row'}}>
                        <TextInput
                            style={{
                            height: 40
                        }}
                            onChangeText={(firstName) => this.setState({firstName})}
                            value={this.state.firstName}/>
                    </View >
                    <View style={{flex: 5, flexDirection: 'row'}}>
                        <TextInput
                            style={{
                            height: 40
                        }}
                            onChangeText={(lastName) => this.setState({lastName})}
                            value={this.state.lastName}/>
                    </View>
                </View>
                
                <TextInput
                    style={{
                    height: 40
                }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}/>
                <TextInput
                    style={{
                    height: 40
                }}
                    onChangeText={(password2) => this.setState({password2})}
                    value={this.state.password2}/>
                <Button
                    onPress={() => {
                    Alert.alert('You tapped the button!');
                }}
                    title="Sign Up"/>
            </View>
        )
    }
}

export default SignUp
