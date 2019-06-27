import React from 'react'
import { Card, Subheading } from 'react-native-paper'
// import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { View, Text, Dimensions, ScrollView } from 'react-native'
import DeviceStorage from 'lib/services/DeviceStorage';
import { parseToken } from 'lib/helpers/utils';
import Axios from 'axios';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'


class UserChart extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            measurement: []
        }
    }


    componentDidMount() {
        DeviceStorage.loadItem('token').then(token => {
            const tokenData = parseToken(token);
            Axios.get('https://mvfagb.herokuapp.com/api/measurement/' + tokenData._id + '/all')
                .then(response => {
                    this.setState({
                        measurement: response.data
                    });
                    console.warn(this.state.measurement);
                })
                .catch(err => {
                    console.warn(err);
                })
        })
    }

    render() {

        // let data = []
        // const date = []
        // const axesSvg = { fontSize: 10, fill: 'grey' };
        // const verticalContentInset = { top: 10, bottom: 10 }
        // const xAxisHeight = 30

        // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
        // All react-native-svg-charts components support full flexbox and therefore all
        // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
        // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
        // and then displace the other axis with just as many pixels. Simple but manual.

        const weight = this.state.measurement.slice(0,7).map(value => {
            return value.weight
        })
        const neck = this.state.measurement.slice(0,7).map(value => {
            return value.neck
        })
        const waist = this.state.measurement.slice(0,7).map(value => {
            return value.waist
        })
        const hips = this.state.measurement.slice(0,7).map(value => {
            return value.hips
        })

        const date = this.state.measurement.slice(0,7).map(value => {
            return value.date.substring(5, 10);
        })

        console.warn(date);

        return (
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <Subheading>
                        Weight
                    </Subheading>
                    <LineChart
                        data={{
                            labels: date,
                            datasets: [{
                                data: weight.length ? weight : [0],
                                // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
                                // strokeWidth: 2 // optional

                            }]
                        }}
                        width={Dimensions.get('window').width - 40} // from react-native
                        height={220}
                        chartConfig={{
                            backgroundColor: '#6a6a6a',
                            backgroundGradientFrom: '#6a6a6a',
                            backgroundGradientTo: '#3a3a3a',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />

                    <Subheading>
                        Neck
                    </Subheading>
                    <LineChart
                        data={{
                            labels: date,
                            datasets: [{
                                data: neck.length ? neck : [0],
                                // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
                                // strokeWidth: 2 // optional

                            }]
                        }}
                        width={Dimensions.get('window').width - 40} // from react-native
                        height={220}
                        chartConfig={{
                            backgroundColor: '#6a6a6a',
                            backgroundGradientFrom: '#6a6a6a',
                            backgroundGradientTo: '#3a3a3a',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />

                    <Subheading>
                        Waist
                    </Subheading>
                    <LineChart
                        data={{
                            labels: date,
                            datasets: [{
                                data: waist.length ? waist : [0],
                                // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
                                // strokeWidth: 2 // optional

                            }]
                        }}
                        width={Dimensions.get('window').width - 40} // from react-native
                        height={220}
                        chartConfig={{
                            backgroundColor: '#6a6a6a',
                            backgroundGradientFrom: '#6a6a6a',
                            backgroundGradientTo: '#3a3a3a',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />

                    <Subheading>
                        Hips
                    </Subheading>
                    <LineChart
                        data={{
                            labels: date,
                            datasets: [{
                                data: hips.length ? hips : [0],
                                // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
                                // strokeWidth: 2 // optional

                            }]
                        }}
                        width={Dimensions.get('window').width - 40} // from react-native
                        height={220}
                        chartConfig={{
                            backgroundColor: '#6a6a6a',
                            backgroundGradientFrom: '#6a6a6a',
                            backgroundGradientTo: '#3a3a3a',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
            </ScrollView>
        )
    }

}

export default UserChart