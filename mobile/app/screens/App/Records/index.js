import React, { Component } from "react";
import {
    View,
    Button,
    ScrollView,
} from 'react-native';
import { Divider } from 'react-native-paper'
import update from 'immutability-helper';

import { default as RecordHeader } from './RecordHeader'
import { default as RecordDetails } from './RecordDetails'
import Axios from "axios";

export default class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        }
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

    saveRecords = (records) => {
        records.forEach(record => {
            Axios.post('https://mvfagb.herokuapp.com/api/record/5ce9092d50081503e89ae408', record)
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => {
                    console.error(err);
                })
        });
    }

    render() {
        const { navigation } = this.props;
        const exercises = navigation.getParam('exercises', []);
        return (
            // Load Exercise Data From State
            <ScrollView>
                <View style={{
                    padding: 15
                }}>
                    {exercises.map((exercise, index) => {
                        return (
                            <View key={index}>
                                <RecordHeader exercise={exercise} />
                                <RecordDetails exercise={exercise} index={index} updateRecords={this.updateRecords} addRecords={this.addRecords} records={this.state.records} />
                                <Divider />
                            </View>
                        )
                    })}
                    <Button title="Save Records" onPress={() => {
                        this.saveRecords(this.state.records);
                    }} />
                </View>
            </ScrollView>
        )
    }
}