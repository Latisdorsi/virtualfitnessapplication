import React, { Component } from 'react'
import { View, ScrollView, FlatList, Text } from 'react-native'
import { List } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

export default class Exercises extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exercises: []
        }
    }

    componentDidMount() {
        axios.get('http://10.0.2.2:3000/exercise/names')
            .then(response => {
                this.setState({
                    exercises: response.data
                });
                console.log(this.state.exercises)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (<FlatList
            data={this.state.exercises}
            renderItem={({ item }) =>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Details', {
                            itemId: item._id,
                            itemName: item.name
                        });
                    }}
                >
                    <List.Item
                        title={item.name}
                        left={props => <List.Icon {...props} icon="fitness-center" />}
                    />
                </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()}
        />)
    }
}