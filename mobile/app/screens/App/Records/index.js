import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text
} from 'react-native';
import { Divider, Button } from 'react-native-paper'
import update from 'immutability-helper';

import { default as RecordHeader } from './RecordHeader'
import { default as RecordDetails } from './RecordDetails'
import Axios from "axios";

export default class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            schedule: {}
        }
    }

    componentDidMount() {
        DeviceStorage.loadItem('token').then(token => {
            const tokenData = parseToken(token)
            Axios.get('https://mvfagb.herokuapp.com/api/schedule/' + tokenData._id + '/now')
                .then(response => {
                    this.setState({
                        schedule: response.data
                    });
                })
                .catch(error => {
                    console.error(error);
                })
        });
}

    addRecords = (record) => {
        this.setState(prevState => ({
            records: [
                ...prevState.records,
                record
            ]
        }))
    }

    updateRecords = (index, record) => {
        this.setState({
            records: update(this.state.records, {
                [index]: { $set: record }
            })
        })
    }



    render() {
        const { navigation } = this.props;
        
        return (
            <ScrollView>
                <View style={{
                    padding: 15
                }}>
                    {this.state.schedule.exercises ? this.state.schedule.exercises.map((exercise, index) => {
                        return (
                            <View key={index}>
                                <RecordHeader exercise={exercise} />
                                <RecordDetails exercise={exercise} index={index} updateRecords={this.updateRecords} addRecords={this.addRecords} records={this.state.records} />
                                <Divider />
                            </View>
                        )
                    }) :
                        <Text>No Data Found</Text>
                    }
                    <Button
                        mode="contained"
                        onPress={() => {
                            navigation.navigate('SaveRecord', {
                                records: this.state.records
                            })

                        }}>
                        Save Records
                    </Button>
                </View>
            </ScrollView>
        )
    }
}