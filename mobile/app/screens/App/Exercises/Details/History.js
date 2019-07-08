import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Subheading, Divider } from 'react-native-paper';

import RowViewComponent from 'lib/components/RowViewComponent'

const HistoryItem = ({ item }) => {
    return (
        <View style={{ padding: 15 }}>
            <RowViewComponent>
                <Subheading>Date: {item.date}</Subheading>
                <Subheading>1RM</Subheading>
            </RowViewComponent>
            {item.sets.map((value, key) => {
                return (
                    <RowViewComponent
                        key={key}
                    >
                        <Text>Set {key + 1}</Text>
                        <Text>{value.weight}kg x {value.reps}</Text>
                        <Text>{value.oneRepMax}</Text>
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
            recordDetails: [{
                _id: '0',
                date: '1/12/19',
                oneRepMax: 0,
                volume: 0,
                sets: [
                    {
                        reps: 0,
                        weight: 0,
                        oneRepMax: 0
                    }
                ]
            }],
            hasRecord: true
        }
    }


    componentDidMount() {
        const _id = this.props.navigation.getParam('itemId', '');
        axios
            .get('https://mvgab.herokuapp.com/api/record/' + _id)
            .then(response => {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
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
