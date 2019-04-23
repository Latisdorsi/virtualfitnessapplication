import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { Subheading, Button } from 'react-native-paper'
import RowViewComponent from '../../components/RowViewComponent'

const RecordItem = ({ item }) => {
    return (
        <View style={{ padding: 15 }}>
        <RowViewComponent>
            <Subheading>Total Time</Subheading>
            <Text>0:00</Text>
        </RowViewComponent>
            <RowViewComponent>
                <Subheading>Barbel Squat</Subheading>
                <Text>Volume</Text>
                <Text>1RM</Text>
            </RowViewComponent>
            <RowViewComponent>
                <Subheading>Set</Subheading>
                <Subheading>Weight x Reps</Subheading>
                <Subheading>1RM</Subheading>
            </RowViewComponent>
            <RowViewComponent>
                <Text>Set 1</Text>
                <Text>20kg x 5</Text>
                <Text>23</Text>
            </RowViewComponent>
        </View>
    )
}

export default function FinishedRecord() {
    return <View><FlatList
        data={[{ key: 'a' }, { key: 'b' }]}
        renderItem={({ item }) => <RecordItem item={item} />}
    />
        <Button>Finish</Button>
        <Button>Go Back</Button>
    </View>
}

