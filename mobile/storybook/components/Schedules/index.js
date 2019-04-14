import React, {Component} from 'react'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default function Schedules() {
    return (
        <Calendar
        // Collection of dates that have to be colored in a special way. Default = {}
         markedDates={
          {'2012-05-20': {textColor: 'green'},
           '2012-05-22': {startingDay: true, color: 'green'},
           '2012-05-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
           '2012-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
          }}
        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
        markingType={'period'}
      />
    )
}