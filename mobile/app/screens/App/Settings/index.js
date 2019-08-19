import React, { Component } from 'react';
import { View, ScrollView } from 'react-native'
import { List, Appbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalSelector from 'react-native-modal-selector';
import DeviceStorage from 'lib/services/DeviceStorage'

class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unit: {
                index: 0,
                name: 'US/Imperial'
            }
        }
        this.logOutUser = this.logOutUser.bind(this)
    }

    logOutUser() {
        // console.warn('deleted');

        console.log(this.props);
        DeviceStorage.deleteItem('token')
            .then( () => {
                this.props.screenProps.screenProps.rootNavigation.navigate('AuthLoading')
            })
            .catch(() => {
                this.props.screenProps.rootNavigation.navigate('AuthLoading')
            })
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <List.Section>
                        <List.Subheader>Profile</List.Subheader>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ChangeEmail');
                        }}>
                            <List.Item
                                title="Change Email Address"

                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ChangePassword');
                        }}>
                            <List.Item
                                title="Change Password"

                            />
                        </TouchableOpacity>
                    </List.Section>
                    <List.Section>
                        <List.Subheader>Account</List.Subheader>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ExportAccount');
                        }}>
                            <List.Item
                                title="Export Account Data"

                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('DeleteAccount');
                        }}>
                            <List.Item
                                title="Delete Account"

                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                                this.logOutUser()
                        }}>
                            <List.Item
                                title="Logout"

                            />
                        </TouchableOpacity>
                    </List.Section>
                </ScrollView>
            </View >
        )
    }
}

export default Settings