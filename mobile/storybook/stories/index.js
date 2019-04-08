import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Exercises from '../components/Exercises'
import ExerciseHeader from '../decorators/ExerciseHeader'
const currentDate = new Date(Date.now())

const ExerciseData = [
  {
    name: 'Barbel Squat',
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
  .add('Blank Data', () => (<Exercises />))
  .add('1 Exercise', () => <Exercises data={ExerciseData} />);

