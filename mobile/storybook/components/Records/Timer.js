import React, { createContext, useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-vector-icons/Entypo'

function ActivateTimer() {
    return (
        <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 70
        }}>
            <Text>
                <Icon
                    name="stopwatch"
                    size={18}
                    style={{
                        marginRight: 10
                    }} />
                {values.minuteCounter + ':' + values.secondCounter}
            </Text>
            <TouchableOpacity

                onPress={() => this._deactivateTimer()}>
                <Text>Cancel Timer</Text>
            </TouchableOpacity>
        </View>
    )
}
function InactiveTimer() {
    return (
        <TouchableOpacity
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                height: 70
            }}
            onPress={() => this._activateTimer()}>
            <Icon
                name="stopwatch"
                size={18}
                style={{
                    marginRight: 10
                }} />
            <Text>Start 3-Minute Timer</Text>
        </TouchableOpacity>
    )
}
