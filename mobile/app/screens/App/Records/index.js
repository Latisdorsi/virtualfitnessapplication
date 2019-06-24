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
                        console.warn(this.state.records);
                    }} />
                </View>
            </ScrollView>
        )
    }
}