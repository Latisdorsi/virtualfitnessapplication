import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, StyleSheet, Button, NetInfo } from 'react-native';
import { Text, Card, Header } from "react-native-elements";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'axios'


const data = [{
    title: 'Get Toned'
},
{
    title: 'Get Strong'
},
{
    title: 'Lose Weight'
}]

export class HomeScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: data,
            isConnected: '',
            targetGoal: '',
            targetDate: '',
            isDateTimePickerVisible: false,
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
            (isConnected) => { this.setState({ isConnected }); }
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


    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({
            targetDate: date
        })
        this._hideDateTimePicker();
    };

    submitForm = () => {
        const {targetDate, targetGoal} = this.state
        const obj = {
            targetDate,
            targetGoal
        }
        axios.post('http://10.0.2.2:3000/api/cycle/5c9a0cfaa6eebe3c3474480c', obj)
        .then(response => {
            console.warn(response.data)
        })
        .catch( error => {
            console.error(error)
        })


    }
    render() {

        return (
            <View>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                    containerStyle={{ padding: 0, margin: 0 }}
                />
                <Text>Enroll Your Account</Text>
                <Text>Select Your Goal:</Text>
                <FlatList
                    data={this.state.data}
                    horizontal="true"
                    extraData={this.state.targetGoal}
                    renderItem={({ item: rowData }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.setState({ targetGoal: rowData.title})}>
                                <Card
                                    title={null}
                                    image={{ uri: "http://via.placeholder.com/150x150" }}
                                    containerStyle={{ padding: 0, width: 150 }}
                                >
                                    <Text style={{ marginBottom: 10 }}>
                                        {rowData.title}
                                    </Text>
                                </Card>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item, index) => index}
                />

                <Text>Target Date</Text>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                    <Text>{this.state.targetDate.toString()}</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker} />
                <Button title="Enroll" onPress={() => this.submitForm()} />
            </View>
        )
    }
}

export default HomeScreen
