import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import RowViewComponent from 'lib/components/RowViewComponent';
import { Subheading, Button } from 'react-native-paper';
import axios from 'axios';

export default class AgendaComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schedule: {}
      // {
      //   '2019-07-24': [
      //     {
      //       title: <Subheading>Workout</Subheading>,
      //       content: <View>
      //         <RowViewComponent>
      //           <Text>Barbell Squat</Text>
      //           <Text>Sets: 1</Text>
      //         </RowViewComponent>
      //         <RowViewComponent>
      //           <Text>Barbell Bench</Text>
      //           <Text>Sets: 3</Text>
      //         </RowViewComponent>
      //       </View>
      //     }]
    }
  }

  // Get Data Here
  componentDidMount() {
    //const _id = this.props.navigation.getParam('itemId', '');
    axios.get('https://mvfagb.herokuapp.com/api/schedule/5ce9092d50081503e89ae408')
      .then(response => {

        const schedules = response.data.map(schedule => {
          const date = schedule.date.slice(0, 10);
          return {
            key: [date],
            value: [{
              title: <Subheading>Workout</Subheading>,
              content: (<View>
                {schedule.exercises.map(exercise => (
                  <RowViewComponent>
                    <Text>{exercise._id}</Text>
                    <Text>Sets: {exercise.sets}</Text>
                  </RowViewComponent>
                ))
                }
              </View>
              )
            }]
          }
        })

        var scheduleObj = schedules.reduce(function (prev, curr) {
          prev[curr.key] = curr.value;
          return prev;
        }, {});

        this.setState({
          schedule: scheduleObj
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <Agenda // the list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key kas to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={this.state.schedule} // callback that fires when the calendar is opened or closed
          loadItemsForMonth={(month) => {
            console.log('trigger items loading')
          }} onCalendarToggled={(calendarOpened) => {
            console.log(calendarOpened)
          }} // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
            return (
              <View style={[styles.item]}>
                <Text>{item.title}</Text>
                <>{item.content}</>
              </View>
            );
          }} futureScrollRange={50} // specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
            return (
              <View style={[styles.emptyDate]}>
                <Text>No Scheduled Workout</Text>
              </View>
            );
          }} // specify what should be rendered instead of ActivityIndicator
          renderEmptyData={() => {
            return (
              <View
                style={{
                  flex: 1,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Text>Nothing scheduled</Text>
              </View>
            );
          }} // specify how agenda knob should look like
          renderKnob={() => {
            return (
              <Text>Close</Text>
            );
          }} // specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text
          }} // agenda theme
          theme={{}} // agenda container style
          style={{}} />
      </View>
    )
  }
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