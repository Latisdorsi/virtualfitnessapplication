import React from 'react'
import { Text, View } from 'react-native'
import { Subheading } from 'react-native-paper';

const Charts = () => {
    return (
        <View style={{padding:15}}>
            <Subheading>Best Set</Subheading>
            <Subheading>Total Volume</Subheading>
            <Subheading>Personal Records</Subheading>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Esimated 1RM Record</Text>
                <Text>60kg</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Max Volume</Text>
                <Text>300kg</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Heaviest Weight</Text>
                <Text>55kg</Text>
            </View>
            <Subheading>Lifetime Stats</Subheading>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Total Reps</Text>
                <Text>300</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Total Weight</Text>
                <Text>1500kg</Text>
            </View>
        </View>
    )
}

export default Charts