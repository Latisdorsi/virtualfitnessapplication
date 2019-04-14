import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Records from '../components/Records'
import Wizard, { Profile, Assessment, Goal, Exercise, Schedule } from '../components/Wizard'
import Schedules from '../components/Schedules'


import ExerciseHeader from '../decorators/ExerciseHeader'
import ScheduleHeader from '../decorators/ScheduleHeader'

const currentDate = new Date(Date.now())

const ExerciseData = [
  {
    name: 'Barbell Squat',
    oneRepMax: 0,
    volume: 0,
    sets: [
      {
        reps: 0,
        weight: 0
      },
      {
        reps: 0,
        weight: 0
      }

    ],
    previous: {
      date: currentDate.getMonth() + '/' + currentDate.getDay() + '/' + currentDate.getFullYear(),
      oneRepMax: 190,
      volume: 300
    }
  }
]

storiesOf('Exercise', module)
  .addDecorator(story => <ExerciseHeader>{story()}</ExerciseHeader>)
  .add('1 Exercise', () => <Records ExerciseData={ExerciseData} />);

storiesOf('Wizard', module)
  .add('profile', () => <Wizard>< Profile /></Wizard>)
  .add('assessment', () => <Wizard><Assessment /></Wizard>)
  .add('goal', () => <Wizard><Goal /></Wizard>)
  .add('schedule', () => <Wizard><Schedule /></Wizard>)
  .add('exercise', () => <Wizard><Exercise /></Wizard>)


storiesOf('Calendar', module)
  .addDecorator(story => <ScheduleHeader>{story()}</ScheduleHeader>)
  .add('Empty Calendar', () => <Schedules />)