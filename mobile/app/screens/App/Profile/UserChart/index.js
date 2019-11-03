import React from 'react'
import { Card, Subheading } from 'react-native-paper'
// import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import {
    ActivityIndicator,
    StatusBar,
    View,
    Text,
    Dimensions,
    ScrollView
} from 'react-native'
import DeviceStorage from 'lib/services/DeviceStorage';
import { parseToken } from 'lib/helpers/utils';
import Axios from 'axios';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';


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

        const weight = this.state.measurement.map(value => {
            return { x: value.date.substring(5, 10), y: value.weight }
        })
        const neck = this.state.measurement.map(value => {
            return { x: value.date.substring(5, 10), y: value.neck }
        })
        const waist = this.state.measurement.map(value => {
            return { x: value.date.substring(5, 10), y: value.waist }
        })
        const hips = this.state.measurement.map(value => {
            return { x: value.date.substring(5, 10), y: value.hips }
        })


        return (
            this.state.measurement.length > 0 ?
                <ScrollView>
                    <View style={{ padding: 20 }} pointerEvents="none">
                        <Subheading>
                            Weight
                    </Subheading>


                        {weight.length > 0 ?
                            < VictoryChart
                                width={Dimensions.get('window').width}
                                theme={VictoryTheme.material}

                            >
                                <VictoryAxis
                                    dependentAxis tickFormat={(tick) => `${tick}kg`} />
                                <VictoryAxis
                                    tickCount={5} />
                                <VictoryLine

                                    domainPadding={{ x: [20, 0] }}
                                    style={{
                                        data: { stroke: "#9400D3" },
                                        parent: { border: "1px solid #ccc" }
                                    }}
                                    data={weight}
                                    text={"Weight"}
                                />
                            </VictoryChart>
                            :
                            <View>
                                <ActivityIndicator />
                                <StatusBar barStyle="default" />
                            </View>
                        }
                        <Subheading>
                            Neck
                    </Subheading>

                        {neck.length > 0 ?
                            < VictoryChart
                                width={Dimensions.get('window').width}
                                theme={VictoryTheme.material}
                            >
                                <VictoryAxis

                                    dependentAxis tickFormat={(tick) => `${tick}cm`} />
                                <VictoryAxis
                                    tickCount={5} />
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#9400D3" },
                                        parent: { border: "1px solid #ccc" }
                                    }}
                                    data={neck}
                                />
                            </VictoryChart>
                            :
                            <View>
                                <ActivityIndicator />
                                <StatusBar barStyle="default" />
                            </View>
                        }

                        <Subheading>
                            Waist
                    </Subheading>


                        {waist.length > 0 ?
                            < VictoryChart
                                width={Dimensions.get('window').width}
                                theme={VictoryTheme.material}
                            >
                                <VictoryAxis
                                    dependentAxis tickFormat={(tick) => `${tick}cm`} />
                                <VictoryAxis
                                    tickCount={5}
                                />
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#9400D3" },
                                        parent: { border: "1px solid #ccc" }
                                    }}
                                    data={waist}
                                />
                            </VictoryChart>
                            :
                            <View>
                                <ActivityIndicator />
                                <StatusBar barStyle="default" />
                            </View>
                        }

                        <Subheading>
                            Hips
                    </Subheading>


                        {hips.length > 0 ?
                            < VictoryChart
                                width={Dimensions.get('window').width}
                                theme={VictoryTheme.material}
                            >
                                <VictoryAxis
                                    dependentAxis tickFormat={(tick) => `${tick}cm`} />
                                <VictoryAxis
                                    tickCount={5} />
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#9400D3" },
                                        parent: { border: "1px solid #ccc" }
                                    }}
                                    data={hips}
                                />
                            </VictoryChart>
                            :
                            <View>
                                <ActivityIndicator />
                                <StatusBar barStyle="default" />
                            </View>
                        }
                    </View>
                </ScrollView >
                :
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text>No Previous Measurement</Text>
                </View>
        )
    }

}

export default UserChart