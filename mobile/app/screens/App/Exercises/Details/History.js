import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Subheading, Divider } from 'react-native-paper';
import axios from 'axios';
import RowViewComponent from 'lib/components/RowViewComponent'
import DeviceStorage from 'lib/services/DeviceStorage';
import { parseToken } from 'lib/helpers/utils';

const HistoryItem = ({ item }) => {
    return (
        <View style={{ padding: 15 }}>
            <RowViewComponent>
                <Subheading>Date: {item.date.slice(0, 10)}</Subheading>
                <Subheading>1RM</Subheading>
            </RowViewComponent>
            {item.sets.map((value, key) => {
                return (
                    <RowViewComponent
                        key={key}
                    >
                        <Text>Set {key + 1}</Text>
                        <Text>{value.weight || 0}kg x {value.rep || 0}</Text>
                        <Text>{(value.weight * (1 + ((value.rep || 0) / 30))).toFixed(2)}</Text>
                    </RowViewComponent>
                )
            })}
            <Divider />
            <RowViewComponent>
                <Text>Total Volume:</Text>
                <Text>{item.volume}</Text>
                <Text>Highest 1RM:</Text>
                <Text>{item.oneRepMax}</Text>
            </RowViewComponent>
            <Divider />
        </View>
    )
}

export default class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recordDetails: [],
            hasRecord: false
        }
    }


    componentDidMount() {
        const _id = this.props.navigation.getParam('itemId', '');
        DeviceStorage.loadItem('token').then(token => {
            const tokenData = parseToken(token)
            axios
                .get('https://mvfagb.herokuapp.com/api/records/' + _id + '/' + tokenData._id)
                .then(response => {
                    if (response.data.length > 0) {
                        this.setState({
                            recordDetails: response.data,
                            hasRecord: true
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        });
    }
    render() {
        return (
            this.state.hasRecord ?
                <FlatList
                    data={this.state.recordDetails}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <HistoryItem item={item} />}
                />
                :
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text>No Previous Record</Text>
                </View>
        )
    }
}
