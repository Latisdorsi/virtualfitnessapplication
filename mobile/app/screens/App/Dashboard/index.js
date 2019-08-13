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
                goal: -1,
                schedule: -1
            },
            isPromptVisible: false,
            hasExercise: false
        }
    }

    _showDialog = () => this.setState({ isPromptVisible: true });

    _hideDialog = () => this.setState({ isPromptVisible: false });

    componentDidMount() {
        // Convert to Promise All
        const { navigation } = this.props;
        const itemId = this.props.navigation.getParam('item', 'No Item');

        DeviceStorage.loadItem('token').then(token => {
            const tokenData = parseToken(token);
            const account = Axios.get('http://mvfagb.herokuapp.com/api/account/detail/5ce9092d50081503e89ae408')
            const routine = Axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408/routine')
            const cycle = Axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408/latest');
            const schedule = Axios.get('https://mvfagb.herokuapp.com/api/schedules/5ce9092d50081503e89ae408/now')
            Promise.all([account, routine, cycle, schedule]).then((values) => {
                const user = values[0].data;
                const exercises = values[1].data.exercises;
                const cycle = values[2].data;
                const hasExercise = values[3].data !== null;
                this.setState({
                    user,
                    exercises,
                    cycle,
                    hasExercise
                });
            })
        })


    }

    _getGoal = (goal) => {
        switch (goal) {
            case 0:
                return 'Tone Muscle and Lose Weight';

            case 1:
                return 'Increase Muscle Mass and Size';

            case 2:
                return 'Get Stronger Lifts';

            case 3:
                return 'General Fitness';

            default:
                return 'Unknown';

        }
    }

    _getSchedule = (schedule) => {
        switch (schedule) {
            case 0:
                return '3 Days a Week';

            case 1:
                return '5 Days a Week';

            case 2:
                return 'Full Week';

            default:
                return 'Unknown';

        }
    }

    render() {

        const { user, exercises } = this.state;
        return (
            <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                    <Avatar.Image size={80} style={{ backgroundColor: 'white' }} source={{ uri: user.avatarURL || 'https://mvfagb.herokuapp.com/static/media/avatar.5ad30128.png' }} />
                    <Subheading>{user.name.firstName} {user.name.lastName}</Subheading>
                </View>
                <Card style={{ padding: 20, alignContent: 'center', alignItems: 'center' }}>
                    {this.state.hasExercise ?
                        <>
                            <Subheading>You have a scheduled exercise today</Subheading>
                            <Button mode="contained" onPress={() => {
                                this.props.navigation.navigate('Records')
                            }} > Start Exercise </Button>
                        </>
                        :
                        <Subheading>You have no scheduled exercise today</Subheading>

                    }
                </Card>
                <Card style={{ padding: 20, marginTop: 20, alignContent: 'center', alignItems: 'center' }}>
                    <Subheading>You have an active cycle right now</Subheading>
                    <RowViewComponent>
                        <Text>Fitness Level</Text>
                        <Text>{this.state.cycle.level}</Text>
                    </RowViewComponent>
                    <RowViewComponent>
                        <Text>Goal</Text>
                        <Text>{this._getGoal(this.state.cycle.goal)}</Text>
                    </RowViewComponent>
                    <RowViewComponent>
                        <Text>Schedule</Text>
                        <Text>{this._getSchedule(this.state.cycle.schedule)}</Text>
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
                                Axios.get('https://mvfagb.herokuapp.com/api/cycle/5ce9092d50081503e89ae408/latest')
                                    .then(response => {
                                        return Axios.get('https://mvfagb.herokuapp.com/api/schedule/5ce9092d50081503e89ae408/deactivate/' + response.data._id);
                                    })
                                    .then(() => {
                                        return Axios.put('https://mvfagb.herokuapp.com/api/account/cycle/deactivate/5ce9092d50081503e89ae408');
                                    })
                                    .then(() => {
                                        this.props.screenProps.rootNavigation.navigate('Wizard');
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                            }}>Yes, I understand</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    }
}

export default Dashboard
