import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Subheading } from 'react-native-paper';

import RowViewComponent from 'lib/components/RowViewComponent'

export default class Charts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topRecordDetails: {
                _id: '0',
                oneRepMax: 0,
                volume: 0,
            },
            totalRecords: {
                reps: 0,
                weight: 0
            },
            hasRecord: true
        }
    }

    render() {
        return (
            this.state.hasRecord ?
                <View style={{ padding: 15 }}>
                    <Subheading>Best Set</Subheading>
                    <Text>Charts Go Here</Text>
                    <Subheading>Total Volume</Subheading>
                    <Text>Charts Go Here</Text>
                    <Subheading>Personal Records</Subheading>
                    <RowViewComponent>
                        <Text>Esimated 1RM Record</Text>
                        <Text>{this.state.topRecordDetails.oneRepMax}kg</Text>
                    </RowViewComponent>
                    <RowViewComponent>
                        <Text>Max Volume</Text>
                        <Text>{this.state.topRecordDetails.volume}kg</Text>
                    </RowViewComponent>
                    <Subheading>Lifetime Stats</Subheading>
                    <RowViewComponent>
                        <Text>Total Reps</Text>
                        <Text>{this.state.totalRecords.reps}</Text>
                    </RowViewComponent>
                    <RowViewComponent>
                        <Text>Total Weight</Text>
                        <Text>{this.state.totalRecords.weight}kg</Text>
                    </RowViewComponent>
                </View>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text>No Previous Record</Text>
                </View>
        )
    }
}