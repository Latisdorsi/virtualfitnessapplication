import React from 'react'
import { Card, Subheading } from 'react-native-paper'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { View, Text } from 'react-native'

class UserChart extends React.PureComponent {

    render() {

        const data = [23, 25, 30, 35]
        const date = [{ date: Date.now, value: 5 }, { date: Date.now, value: 10 }]
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
        // All react-native-svg-charts components support full flexbox and therefore all
        // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
        // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
        // and then displace the other axis with just as many pixels. Simple but manual.

        return (
            <View style={{ padding: 10 }}>
                <Card style={{padding: 20}}>
                <Subheading>Weight</Subheading>
                    <View style={{ height: 200, flexDirection: 'row' }}>
                        <YAxis
                            data={[1, 2, 3]}
                            style={{ marginBottom: xAxisHeight }}
                            contentInset={verticalContentInset}
                            numberOfTicks={5}
                            svg={axesSvg}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <LineChart
                                style={{ flex: 1 }}
                                data={data}
                                contentInset={verticalContentInset}
                                svg={{ stroke: 'rgb(134, 65, 244)' }}
                            >
                                <Grid />
                            </LineChart>
                            <XAxis
                                style={{ marginHorizontal: -10, height: xAxisHeight }}
                                data={date}
                                xAccessor={({ item }) => item.value}
                                formatLabel={(value) => value}
                                contentInset={{ left: 10, right: 25 }}
                                svg={axesSvg}
                                numberOfTicks={6}
                            />
                        </View>
                    </View>
                </Card>
            </View>
        )
    }

}

export default UserChart