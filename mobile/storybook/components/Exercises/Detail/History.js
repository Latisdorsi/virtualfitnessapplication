import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Subheading } from 'react-native-paper';

const HistoryItem = ({ item }) => {
    return (
        <View style={{ padding: 15 }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Subheading>Date: 4/17/19</Subheading>
                <Subheading>1RM</Subheading>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text>Set 1</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text>20kg x 5</Text>
                </View>
                <Text>23</Text>
            </View>
        </View>
    )
}

const History = () => {


    return <FlatList
        data={[{ key: 'a' }, { key: 'b' }]}
        renderItem={({ item }) => <HistoryItem item={item} />}
    />
}

export default History