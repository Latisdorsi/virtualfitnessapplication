import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function AgendaComponent() {

  return (
    <View style={{ height: 600 }}>
      <Agenda
        // the list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key kas to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={
          {
            '2019-04-14': [
              { title: 'Workout', content: 'item 3 - any js object' },
              { title: 'Records', content: 'item 3 - any js object' },
              { title: 'Updated Measurements', content: 'item 3 - any js object' },
            ],
            '2019-04-16': [{ title: 'List of Workouts', content: 'item 1 - any js object' }],
            '2019-04-22': [{ content: 'item 1 - any js object' }],
            '2019-04-23': [{ content: 'item 2 - any js object' }],
            '2019-04-24': [{ content: 'item 2 - any js object' }],
          }}

        // callback that fires when the calendar is opened or closed
        loadItemsForMonth={(month) => { console.log('trigger items loading') }}

        onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}

        // specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return (
            <View style={[styles.item]}>
              <Text>{item.title}</Text>
              <Text>{item.content}</Text>
            </View>);
        }}
        futureScrollRange={50}
        // specify how empty date content with no items should be rendered
        renderEmptyDate={() => { return (<View style={[styles.emptyDate]}><Text>This is empty date!</Text></View>); }}

        // specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => { return (<View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}><Text>Nothing scheduled</Text></View>); }}

        // specify how agenda knob should look like
        renderKnob={() => { return (<Text>Close</Text>); }}

        // specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}

        // agenda theme
        theme={{
        }}

        // agenda container style
        style={{}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});