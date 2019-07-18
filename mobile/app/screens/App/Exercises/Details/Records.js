import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Subheading } from 'react-native-paper';
import axios from 'axios';
import RowViewComponent from 'lib/components/RowViewComponent'

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
        .get('http://10.0.2.2:5000/api/records/5cf4b301edd89700176bc18b/5ce9092d50081503e89ae408/record')
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
                <View style={{ padding: 15 }}>
                    <Subheading>Best Set</Subheading>
                    <Text>Charts Go Here</Text>
                    <Subheading>Total Volume</Subheading>
                    <Text>Charts Go Here</Text>
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
                :
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text>No Previous Record</Text>
                </View>
        )
    }
}