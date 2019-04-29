import React, { Component } from 'react';
import { View, ScrollView } from 'react-native'
import { List, Appbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalSelector from 'react-native-modal-selector';

class SettingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unit: {
                index: 0,
                name: 'US/Imperial'
            }
        }
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
                        <List.Subheader>Units</List.Subheader>

                        <ModalSelector
                            data={[
                                { key: 0, label: 'US / Imperial' },
                                { key: 1, label: 'Metric' }
                            ]}
                            initValue="US/Imperial"
                            onChange={(option) => {
                                this.setState({
                                    unit: {
                                        index: option.key,
                                        name: option.label
                                    }
                                })
                            }}>
                            <List.Item
                                title="Select Unit"
                                description={this.state.unit.name}

                            />
                        </ModalSelector>
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
                            this.props.navigation.navigate('LoggedOut');
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

export default SettingList