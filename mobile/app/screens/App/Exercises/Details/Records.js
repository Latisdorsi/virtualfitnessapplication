import React, { Component } from 'react'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory-native';
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { Subheading } from 'react-native-paper';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RowViewComponent from 'lib/components/RowViewComponent'; 

export default class Charts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            records: [],
            totalRecords: {
                reps: 0,
                weight: 0
            },
            hasRecord: true
        }
    }

    componentDidMount() {
        axios
            .get('https://mvfagb.herokuapp.com/api/records/5cf4b301edd89700176bc18b/5ce9092d50081503e89ae408/record')
            .then(response => {
                this.setState({
                    oneRepMax: response.data.oneRepMax,
                    volume: response.data.volume
                })
            })

        const _id = this.props.navigation.getParam('itemId', '');

        // console.log('https://mvgab.herokuapp.com/api/records/' + _id + '/5ce9092d50081503e89ae408');
        axios
            .get('https://mvfagb.herokuapp.com/api/records/' + _id + '/5ce9092d50081503e89ae408')
            .then(response => {
                // console.warn(response.data)
                this.setState({
                    records: response.data
                    //     hasRecord: true
                })

                console.log(this.state.recordDetails);
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    render() {
        return (

            this.state.hasRecord ?
                <ScrollView>
                    <View style={{ padding: 15 }} pointerEvents="none">
                        <Subheading>Best Set</Subheading>
                        < VictoryChart
                        width={Dimensions.get('window').width} 
                        theme={VictoryTheme.material}
                        >
                            <VictoryLine
                                style={{
                                    data: { stroke: "#9400D3" },
                                    parent: { border: "1px solid #ccc" }
                                }}
                                data={[
                                    { x: 1, y: 2 },
                                    { x: 2, y: 3 },
                                    { x: 3, y: 5 },
                                    { x: 4, y: 4 },
                                    { x: 5, y: 7 }
                                ]}
                            />
                        </VictoryChart>
                        <Subheading>Total Volume</Subheading>
                        < VictoryChart
                        width={Dimensions.get('window').width} 
                        theme={VictoryTheme.material}
                        >
                            <VictoryLine
                                style={{
                                    data: { stroke: "#9400D3" },
                                    parent: { border: "1px solid #ccc" }
                                }}
                                data={[
                                    { x: 1, y: 2 },
                                    { x: 2, y: 3 },
                                    { x: 3, y: 5 },
                                    { x: 4, y: 4 },
                                    { x: 5, y: 7 }
                                ]}
                            />
                        </VictoryChart>
                        <Subheading>Personal Records</Subheading>
                        <RowViewComponent>
                            <Text>Esimated 1RM Record</Text>
                            <Text>{this.state.oneRepMax}kg</Text>
                        </RowViewComponent>
                        <RowViewComponent>
                            <Text>Max Volume</Text>
                            <Text>{this.state.volume}kg</Text>
                        </RowViewComponent>
                    </View>
                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text>No Previous Record</Text>
                </View>

        )
    }
}