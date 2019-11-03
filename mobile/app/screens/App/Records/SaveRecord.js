import React, { useEffect, useState, Component } from "react";
import {
    ScrollView,
    View,
    FlatList,
    Text
} from 'react-native';
import Axios from 'axios';
import { Subheading, Divider, Button, Portal, Dialog, Paragraph } from 'react-native-paper'
import RowViewComponent from 'lib/components/RowViewComponent';


const RecordItem = ({ item }) => {

    return (
        <View style={{ padding: 15 }}>
            <RowViewComponent>
                <Subheading>{item.name}</Subheading>
            </RowViewComponent>
            <Divider />
            <RowViewComponent>
                <View>
                    <Text>One Rep Max</Text>
                    <Text>{item.oneRepMax}</Text>
                </View>
                <View>
                    <Text>Volume</Text>
                    <Text>{item.volume}</Text>
                </View>
            </RowViewComponent>

            {item.sets.map((set, index) => {
                return (
                    <RowViewComponent key={index}>
                        <Text>Set {index + 1}</Text>
                        <Text>Reps:</Text>
                        <Text>{set.rep}</Text>
                        <Text>Weight:</Text>
                        <Text>{set.weight}</Text>

                    </RowViewComponent>
                );
            })}
            <Divider />
        </View>
    )
}

export default class SaveRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPromptVisible: false
        }

        this._hideDialog = this._hideDialog.bind(this);
        this._showDialog = this._showDialog.bind(this);
    }

    saveRecords = (records) => {
        this._hideDialog();
        records.forEach(record => {
            Axios.post('https://mvfagb.herokuapp.com/api/record/5ce9092d50081503e89ae408', record)
        });
        
        Axios.get('https://mvfagb.herokuapp.com/api/schedule/5ce9092d50081503e89ae408/now')
            .then(response => {
                return Axios.put('https://mvfagb.herokuapp.com/api/schedule/' + response.data._id + '/complete')
            })
            .then(() => {
                this.props.navigation.popToTop();
            })
            .catch(err => {
                console.error(err);
            })
    }

    _showDialog = () => this.setState({ isPromptVisible: true });

    _hideDialog = () => this.setState({ isPromptVisible: false });

    render() {
        const { navigation } = this.props;
        const records = navigation.getParam('records', 'NO-RECORDS');
        console.log(records);
        return (
            <ScrollView>
                <View style={{
                    padding: 15
                }} >
                    {records
                        ?
                        <FlatList
                            data={records}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <RecordItem item={item} />}
                        />
                        :
                        <Text>Loading Data...</Text>
                    }
                    <Button onPress={this._showDialog} mode="contained">Finalize Records</Button>
                    <Portal>
                        <Dialog
                            visible={this.state.isPromptVisible}
                            onDismiss={this._hideDialog}>
                            <Dialog.Title>Finalize Data</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>This will save your record for the day. Are you sure you wish to do this?</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={this._hideDialog}>No</Button>
                                <Button onPress={() => {
                                    this.saveRecords(records)
                                }}>Yes, I understand</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>

                </View>
            </ScrollView>
        );
    }

}