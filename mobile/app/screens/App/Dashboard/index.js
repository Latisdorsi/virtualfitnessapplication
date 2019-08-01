import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Avatar, Card, Headline, Subheading, Dialog, Portal, Paragraph, Button } from 'react-native-paper'
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
            exercises: [],
            cycle: {
                level: 0,
                goal: 0,
                schedule: 0
            },
            isPromptVisible: false
        }
    }

    _showDialog = () => this.setState({ isPromptVisible: true });

    _hideDialog = () => this.setState({ isPromptVisible: false });

    componentDidMount() {
        // Convert to Promise All
        const { navigation } = this.props;
        const itemId = this.props.navigation.getParam('item', 'No Item');
        console.log(itemId);

        DeviceStorage.loadItem('token').then(token => {
            const tokenData = parseToken(token);
            const routine = Axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408/routine')
            const account = Axios.get('http://mvfagb.herokuapp.com/api/account/detail/5ce9092d50081503e89ae408')
            const cycle = Axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408');
            Promise.all([account, routine, cycle]).then((values) => {
                const user = values[0].data;
                const exercises = values[1].data.exercises;
                const cycle = values[0].data;
                this.setState({
                    user,
                    exercises,
                    cycle
                });
            })
        })

       
    }

    render() {
        console.warn(this.state.cycle);
        const { user, exercises } = this.state;
        return (
            <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                    <Avatar.Image size={80} style={{ backgroundColor: 'white' }} source={{ uri: user.avatarURL || 'https://mvfagb.herokuapp.com/static/media/avatar.5ad30128.png' }} />
                    <Subheading>{user.name.firstName} {user.name.lastName}</Subheading>
                </View>
                <Card style={{ padding: 20, alignContent: 'center', alignItems: 'center' }}>
                    <Subheading>You have a scheduled exercise today</Subheading>
                    <Button mode="contained" onPress={() => {
                        this.props.navigation.navigate('Records', {
                            exercises: exercises
                        })
                    }} > Start Exercise </Button>
                </Card>
                <Card style={{ padding: 20, marginTop: 20, alignContent: 'center', alignItems: 'center' }}>
                    <Subheading>You have an active cycle right now</Subheading>
                    <RowViewComponent>
                        <Text>Fitness Level</Text>
                        <Text>{this.state.cycle.level}</Text>
                    </RowViewComponent>
                    <RowViewComponent>
                        <Text>Goal</Text>
                        <Text>{this.state.cycle.goal}</Text>
                    </RowViewComponent>
                    <RowViewComponent>
                        <Text>Schedule</Text>
                        <Text>{this.state.cycle.schedule}</Text>
                    </RowViewComponent>
                    <Button onPress={this._showDialog} mode="contained">Restart Cycle </Button>
                </Card>
                <Portal>
                    <Dialog
                        visible={this.state.isPromptVisible}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title>Warning!</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Restarting your cycle will delete your current cycle. Are you sure you wish to proceed?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={this._hideDialog}>No</Button>
                            <Button onPress={() => {
                                this.props.screenProps.rootNavigation.navigate('Wizard')
                            }}>Yes, I understand</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    }
}

export default Dashboard
