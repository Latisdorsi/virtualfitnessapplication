import React, { useState } from "react";
import { View, Text, TouchableHighlight, ScrollView, TextInput } from "react-native"
import { Headline, Subheading, Button, Card } from "react-native-paper";

export default function Exercise() {
    return (
        <View
            style={{ padding: 15 }}>
            <Headline>Thank you for filling up all the forms</Headline>
            <Button mode="contained">Generate Exercises</Button>
        </View>
    )
}