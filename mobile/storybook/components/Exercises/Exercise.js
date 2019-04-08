import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Text,
    Button,
    StyleSheet,
    TextInput
} from 'react-native';

export class Exercise extends Component {
    constructor(props) {
        super(props)
        let {exercise, index} = this.props
        this.state = {
            exercise,
            index
            
        }
    }

    onUpdateComments = (id, e) => {
        let exercise = Object.assign({}, this.state.exercise);
        exercise.sets[id].reps = 1;
        this.setState({exercise});
    }

    render() {
        let { exercise, index } = this.state
        console.warn(exercise.sets)
        return (
            <View
                style={{
                    marginBottom: 10
                }}>
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <Subheading
                        style={{
                            fontSize: 20
                        }}>{exercise.name}</Subheading>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}>
                        <IconButton
                            name="insert-chart"
                            size={18}
                            color="#2a2a2a"
                            style={{
                                paddingRight: 10
                            }} />
                        <IconButton name="info-outline" color="#2a2a2a" size={18} />
                    </View>

                </View>
                <Divider />
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 50,
                        paddingVertical: 20
                    }}>
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

                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 80
                    }}>
                    <View >
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#000000',
                                alignSelf: 'center'
                            }}>{this.state.RepMax}</Text>
                        <Text>1-Rep Max</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#000000',
                                alignSelf: 'center'
                            }}>{this.state.Volume}</Text>
                        <Text>Volume</Text>
                    </View>
                </View>

                <Formik
                    initialValues={{
                        sets: exercise.sets
                    }}
                    render={({ values }) =>
                        <FieldArray
                            name="records"
                            render={arrayHelpers =>
                                <View>
                                    {values.sets
                                        .map((set, index) => (
                                            <View>
                                                <View
                                                    key={index}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-evenly',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        height: 70
                                                    }}>
                                                    <View style={styles.recordsContainer}>
                                                        <Text
                                                            style={{
                                                                paddingHorizontal: 10,
                                                                fontSize: 25,
                                                                color: '#000000'
                                                            }}>{index}</Text>
                                                        <Text style={styles.accentedText}>Set</Text>
                                                    </View>
                                                    <Text>/</Text>
                                                    <View style={styles.recordsContainer}>
                                                        <TextInput
                                                            style={styles.recordsInput}
                                                            placeholder="0"
                                                            onChange={values.handleChange}
                                                            onBlur={values.handleBlur}
                                                            value={set.reps}
                                                            underlineColorAndroid="#666666"
                                                            keyboardType='numeric' />
                                                        <Text style={styles.accentedText}>Reps</Text>
                                                    </View>
                                                    <Text>/</Text>
                                                    <View style={styles.recordsContainer}>
                                                        <TextInput
                                                            style={styles.recordsInput}
                                                            placeholder="0"
                                                            underlineColorAndroid="#666666"
                                                            keyboardType='numeric' />
                                                        <Text style={styles.accentedText}>KG</Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        height: 70
                                                    }}>
                                                    <Icon
                                                        name="stopwatch"
                                                        size={18}
                                                        style={{
                                                            marginRight: 10
                                                        }} />
                                                    <Text>Start 3-Minute Timer</Text>
                                                </View>
                                            </View>
                                        ))}
                                </View>

                            }
                        />
                    }
                />

                <Text
                    style={{
                        alignSelf: 'center',
                        color: '#ef6c57',
                        height: 50
                    }}>Add Set</Text>
                <Divider />
            </View>
            )
    }
}

import { Formik, FieldArray } from 'formik';
import { Appbar, Subheading, Divider, IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Entypo';



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
