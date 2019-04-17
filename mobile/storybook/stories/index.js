import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Records from '../components/Records'
import Wizard, { Profile, Assessment, Goal, Exercise, Schedule, MultiStep } from '../components/Wizard'
import Schedules from '../components/Schedules'


import ExerciseHeader from '../decorators/ExerciseHeader'
import ScheduleHeader from '../decorators/ScheduleHeader'
import WizardHeader from '../decorators/WizardHeader'
import ProfileHeader from '../decorators/ProfileHeader'


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
  .addDecorator(story => <WizardHeader>{story()}</WizardHeader>)
  .add('Profile', () => <Wizard>< Profile /></Wizard>)
  .add('Assessment', () => <Wizard><Assessment /></Wizard>)
  .add('Goal', () => <Wizard><Goal /></Wizard>)
  .add('Schedule', () => <Wizard><Schedule /></Wizard>)
  .add('Exercise', () => <Wizard><Exercise /></Wizard>)
  .add('Multi Step', () => <Wizard><MultiStep /></Wizard>)

storiesOf('Calendar', module)
  .addDecorator(story => <ScheduleHeader>{story()}</ScheduleHeader>)
  .add('Main Calendar w/ Agenda', () => <Schedules />)


//Add Decorator with Navbar and Profile Image
storiesOf('Profile', module)
  .addDecorator(story => <ProfileHeader>{story()}</ProfileHeader>)
  .add('User Detail', () => { })
  .add('Records', () => { })