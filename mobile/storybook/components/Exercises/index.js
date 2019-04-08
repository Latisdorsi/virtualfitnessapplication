import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Text,
    Button,
    StyleSheet,
    TextInput
} from 'react-native';
import { Formik, FieldArray } from 'formik';
import { Appbar, Subheading, Divider, IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Entypo';
import { Exercise } from './Exercise'



export class Exercises extends Component {

    constructor(props) {
        super(props)
        this.state = {
            RepMax: 0,
            Volume: 0,
            data: this.props.data,
        }
    }


    render() {
        //Load Exercise Data From State
        let { data } = this.state

        return (
            <View >

                <Text>{this.props.item}</Text>
                <ScrollView style={styles.container}>
                    {data.map((exercise, index) => {
                        return (
                           <Exercise exercise={exercise} index={index} />
                        )
                    })}

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    header: {
        fontSize: 12,
        fontFamily: 'Cochin'
    },
    recordsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    recordsInput: {
        marginHorizontal: 10,
        height: 60,
        paddingLeft: 6,
        fontSize: 25
    },
    accentedText: {
        fontSize: 15,
        color: '#000000'
    },
    textBlack: {
        color: '#000000'
    }
})

export default Exercises
