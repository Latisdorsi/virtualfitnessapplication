import React, { Component } from 'react'
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { Subheading } from 'react-native-paper';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RowViewComponent from 'lib/components/RowViewComponent';
import DeviceStorage from 'lib/services/DeviceStorage';
import { parseToken } from 'lib/helpers/utils';

export default class Charts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            records: [],
            totalRecords: {
                reps: 0,
                weight: 0
            },
            hasRecord: false
        }
    }

    componentDidMount() {
        const _id = this.props.navigation.getParam('itemId', '');

        DeviceStorage.loadItem('token').then(token => {
            const tokenData = parseToken(token);
            axios
                .get('https://mvfagb.herokuapp.com/api/records/' + _id + '/' + tokenData._id + '/record')
                .then(response => {
                    this.setState({
                        oneRepMax: response.data.oneRepMax,
                        volume: response.data.volume
                    })
                })
            axios
                .get('https://mvfagb.herokuapp.com/api/records/' + _id + '/' + tokenData._id + '/record/all')
                .then(response => {
                    if (response.data.length > 0) {
                        // console.warn(response.data);
                        this.setState({
                            records: response.data,
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
        const oneRepMax = this.state.records.map(record => {
            return { x: record.date.substring(5, 10), y: record.oneRepMax }
        })
        const volume = this.state.records.map(record => {
            return { x: record.date.substring(5, 10), y: record.volume }
        })

        return (

            this.state.hasRecord ?
                <ScrollView>

                    <View style={{ padding: 20 }} pointerEvents="none">
                        <Subheading>Personal Records</Subheading>
                        <RowViewComponent>
                            <Text>Esimated 1RM Record</Text>
                            <Text>{this.state.oneRepMax}kg</Text>
                        </RowViewComponent>
                        <RowViewComponent>
                            <Text>Max Volume</Text>
                            <Text>{this.state.volume}kg</Text>
                        </RowViewComponent>
                        <Subheading>Best Set</Subheading>
                        {
                            oneRepMax.length > 0 ?
                                < VictoryChart
                                    width={Dimensions.get('window').width}
                                    theme={VictoryTheme.material}
                                    padding={50}
                                >
                                    <VictoryAxis

                                        dependentAxis tickFormat={(tick) => `${tick.toFixed(2)}kg`} />
                                    <VictoryAxis />
                                    <VictoryLine
                                        style={{
                                            data: { stroke: "#9400D3" },
                                            parent: { border: "1px solid #ccc" }
                                        }}
                                        data={oneRepMax}
                                    />
                                </VictoryChart>
                                :
                                <Text>Loading...</Text>
                        }
                        <Subheading>Total Volume</Subheading>
                        {
                            volume.length > 0 ?
                                < VictoryChart
                                    width={Dimensions.get('window').width}
                                    theme={VictoryTheme.material}
                                    padding={50}
                                >
                                    <VictoryAxis
                                        dependentAxis tickFormat={(tick) => `${tick.toFixed(2)}kg`} />
                                    <VictoryAxis />
                                    <VictoryLine
                                        style={{
                                            data: { stroke: "#9400D3" },
                                            parent: { border: "1px solid #ccc" }
                                        }}
                                        data={volume}
                                    />
                                </VictoryChart>
                                :
                                <Text>Loading...</Text>
                        }

                    </View>
                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text>No Previous Record</Text>
                </View>

        )
    }
}