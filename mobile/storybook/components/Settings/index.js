import React from 'react';
import { View, ScrollView } from 'react-native'
import { List, Appbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyComponent = () => (
    <View>
        <Appbar.Header style={{ backgroundColor: '#ffffff' }}>
            <Appbar.BackAction
                onPress={this._goBack}
            />
            <Appbar.Content
                title="Settings"
            />
        </Appbar.Header>
        <ScrollView>
            <List.Section>
                <List.Subheader>Profile</List.Subheader>
                <TouchableOpacity>
                    <List.Item
                        title="Change Email Address"
                        left={props => <List.Icon {...props} icon="folder" />}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        title="Change Password"
                        left={props => <List.Icon {...props} icon="folder" />}
                    />
                </TouchableOpacity>
            </List.Section>

            <List.Section>
                <List.Subheader>Units</List.Subheader>
                <TouchableOpacity>
                    <List.Item
                        title="Select Unit"
                        description="US/Imperial"
                        left={props => <List.Icon {...props} icon="folder" />}
                    />
                </TouchableOpacity>
            </List.Section>
            <List.Section>
                <List.Subheader>Account</List.Subheader>
                <TouchableOpacity>
                    <List.Item
                        title="Export Account Data"
                        left={props => <List.Icon {...props} icon="folder" />}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        title="Delete Account"
                        left={props => <List.Icon {...props} icon="folder" />}
                    />
                </TouchableOpacity>
            </List.Section>
        </ScrollView>
    </View >
);

export default MyComponent;