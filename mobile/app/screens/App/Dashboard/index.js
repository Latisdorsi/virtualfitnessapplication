import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { Avatar, Card, Headline, Subheading } from 'react-native-paper'
import DeviceStorage from 'lib/services/DeviceStorage';
import { parseToken } from 'lib/helpers/utils';
import RowViewComponent from 'lib/components/RowViewComponent'
import Axios from 'axios';

export class Dashboard extends Component {
    constructor(props) {
            super(props)
        this.state = {
            user: {
                avatarURL: '',
                name: {
                    firstName: '',
                    lastName: ''
                }
            },
            exercises: []
        }
    }


    componentDidMount() {
        // Convert to Promise All
        const { navigation } = this.props;
        const itemId = this.props.navigation.getParam('item', 'No Item');
        console.log(itemId);

        DeviceStorage.loadItem('token').then(token => {
            const tokenData = parseToken(token);
            const routine = Axios.get('https://mvfagb.herokuapp.com/api/cycle/' + tokenData._id + '/routine')
            const account = Axios.get('http://mvfagb.herokuapp.com/api/account/detail/' + tokenData._id)

            Promise.all([account,routine]).then((values) => {
                    const user = values[0].data;
                    const exercises = values[1].data.exercises
                this.setState({
                    user,
                    exercises
                });
            })
        })
    }

    render() {
        return (
            <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                    <Avatar.Image size={80} source={{ uri: this.state.user.avatarURL }} />
                    <Subheading>{this.state.user.name.firstName} {this.state.user.name.lastName}</Subheading>
                </View>
                <Card style={{ padding: 20, alignContent: 'center', alignItems: 'center' }}>
                    <Subheading>You have a scheduled exercise today</Subheading>
                    <Button title="Start Exercise" onPress={() => {
                        this.props.navigation.navigate('Records', {
                            exercises: this.state.exercises
                        })
                    }} />
                </Card>
                <Card style={{ padding: 20, marginTop: 20, alignContent: 'center', alignItems: 'center' }}>
                    <Subheading>You have an active cycle right now</Subheading>
                    <RowViewComponent>
                        <Text>Fitness Level</Text>
                        <Text>4</Text>
                    </RowViewComponent>
                    <RowViewComponent>
                        <Text>Goal</Text>
                        <Text>Lose Weight</Text>
                    </RowViewComponent>
                    <RowViewComponent>
                        <Text>Schedule</Text>
                        <Text>3 Days a Week</Text>
                    </RowViewComponent>
                    <Button title="Restart Cycle" onPress={() => {
                         this.props.screenProps.rootNavigation.navigate('Wizard')
                    }}/>
                </Card>
            </View>
        )
    }
}

export default Dashboard
