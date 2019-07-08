import React, { Component } from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import { Subheading } from 'react-native-paper';
import axios from 'axios'

export default class Instruction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageName: '',
            imageUrl: '',
            name: '',
            instruction: ''
        }
    }

    componentDidMount() {
        const _id = this.props.navigation.getParam('itemId', '');
        axios
            .get('http://10.0.2.2:3000/exercise/detail/' + _id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    imageName: response.data.imageName,
                    imageUrl: response.data.imageUrl,
                    name: response.data.name,
                    instruction: response.data.instruction
                });
                console.log(this.state)
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
        return (
            <ScrollView>

                <View style={{ padding: 15 }}>
                    <Image
                        resizeMode={"contain"}
                        style={{ height: 250 }}
                        source={{ uri: this.state.imageUrl || 'https://mvfagb.herokuapp.com/static/media/no-img.8526acd6.jpg' }}
                    />
                    <Subheading>Instruction</Subheading>
                    <Text>{this.state.instruction}</Text>
                </View>
            </ScrollView>
        )
    }
}