import React, { useEffect, useState, Component } from "react";
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Axios from 'axios';
import { Subheading, Divider, IconButton, Button } from 'react-native-paper'


export default class SaveRecord extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    saveRecords = (records) => {
        records.forEach(record => {
            Axios.post('https://mvfagb.herokuapp.com/api/record/5ce9092d50081503e89ae408', record)
                .then(response => {
                    this.props.navigation.popToTop()
                })
                .catch(err => {
                    console.error(err);
                })
        });
    }

    render() {
        const { navigation } = this.props;
        const records = navigation.getParam('records', 'NO-RECORDS');
        console.log(records);
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            }} >
                <Subheading>Saved Data</Subheading>

                {records
                    ?
                    records.map(function (record, index) {
                        return (
                            <View key="index">
                                <Text>Exercise ID</Text>
                                <Text>{record.id}</Text>
                                <Text>One Rep Max</Text>
                                <Text>{record.oneRepMax}</Text>
                                <Text>Volume</Text>
                                <Text>{record.volume}</Text>
                                <Text>Sets</Text>
                                {record.sets.map((set, index) => {
                                    return (
                                        <View>
                                            <Text>Sets</Text>
                                            <Text>{set.rep}</Text>
                                            <Text>Weight</Text>
                                            <Text>{set.weight}</Text>
                                        </View>

                                    );
                                })}
                            </View>);
                    })
                    :
                    <Text>Loading Data...</Text>
                }
                <Button onPress={()=> this.saveRecords(records)}>Finalize Records</Button>
            </View>
        );
    }

}