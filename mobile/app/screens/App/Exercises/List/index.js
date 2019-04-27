import React, { Component } from 'react'
import { View, ScrollView, FlatList, Text } from 'react-native'
import { List } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const exerciseData = [
    { id: 1, name: 'Barbell Squat' },
    { id: 2, name: 'Bench Press' }
]
export default class Exercises extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (<FlatList
            data={exerciseData}
            renderItem={({ item }) =>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Details', {
                        itemId: item.id,
                        itemName: item.name
                    });
                }}>
                    <List.Item
                        title={item.name}
                        left={props => <List.Icon {...props} icon="folder" />}

                    />
                </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()}
        />)
    }
}