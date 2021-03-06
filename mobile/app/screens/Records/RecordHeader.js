import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Subheading, Divider, IconButton } from 'react-native-paper'


export default function RecordHeader({ exercise }) {
    return (
        <View>
            <View
                style={styles.headerContainer}>
                <Subheading
                    style={{
                        fontSize: 20
                    }}>{exercise.name}</Subheading>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                    <IconButton name="insert-chart" size={18} color="#2a2a2a" />
                    <IconButton name="info-outline" color="#2a2a2a" size={18} />
                </View>
            </View>

            <Divider />
            <View
                style={styles.headerContainer}>

                <View>
                    <Text style={styles.textBlack}>Previous</Text>
                    <Text>{exercise.previous.date}</Text>
                </View>
                <View>
                    <Text style={styles.textBlack}>1RM</Text>
                    <Text>{exercise.previous.oneRepMax}lbs</Text>
                </View>
                <View>
                    <Text style={styles.textBlack}>Volume</Text>
                    <Text>{exercise.previous.volume}lbs</Text>
                </View>

            </View>

            <Divider />
        </View>
    )
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
