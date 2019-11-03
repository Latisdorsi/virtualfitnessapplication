import React, { useEffect, useState, Component } from "react";
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import axios from 'axios';
import { Subheading, Divider, IconButton } from 'react-native-paper'


export default class RecordHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exercise: {
                name: props.exercise.name || ''
            }
        }
    }

    render() {
        return (
            <View>
                <View
                    style={styles.headerContainer}>
                    <Subheading
                        style={{
                            fontSize: 20
                        }}>{this.state.exercise.name}</Subheading>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}>
                        <IconButton name="insert-chart" size={18} color="#2a2a2a" />
                        <IconButton name="info-outline" color="#2a2a2a" size={18} />
                    </View>
                </View>

                <Divider />
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
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'

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
