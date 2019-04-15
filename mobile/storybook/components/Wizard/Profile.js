import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Text } from 'react-native'
import { Subheading, Headline, Button } from "react-native-paper";

import ModalSelector from 'react-native-modal-selector'


import WizardContext from './StepContext'

let index = 0;


const ageData =

  [
    { key: index++, label: '16' },
    { key: index++, label: '17' },
    { key: index++, label: '18' },
    { key: index++, label: '19' },
    { key: index++, label: '20' },
    { key: index++, label: '21' },
    { key: index++, label: '22' },
    { key: index++, label: '23' },
    { key: index++, label: '24' },
  ]

const sexData = [
  { key: index++, label: 'Male' },
  { key: index++, label: 'Female' },
]


const weightData = [
  { key: index++, label: '59' },
  { key: index++, label: '59' },
  { key: index++, label: '60' },
  { key: index++, label: '61' },
  { key: index++, label: '62' },
  { key: index++, label: '63' },
  { key: index++, label: '64' },
  { key: index++, label: '65' },
  { key: index++, label: '66' },
  { key: index++, label: '63' },
]

const heightData = [
  { key: index++, label: '168' },
  { key: index++, label: '169' },
  { key: index++, label: '170' },
  { key: index++, label: '171' },
  { key: index++, label: '172' },
  { key: index++, label: '173' },
  { key: index++, label: '174' }
]

const neckData = [
  { key: index++, label: '29' },
  { key: index++, label: '30' },
  { key: index++, label: '31' },
  { key: index++, label: '32' },
  { key: index++, label: '33' },
  { key: index++, label: '34' },
  { key: index++, label: '35' },
  { key: index++, label: '36' },
  { key: index++, label: '37' },
  { key: index++, label: '38' },
  { key: index++, label: '39' },
  { key: index++, label: '40' },
  { key: index++, label: '41' },
]

const waistData = [
  { key: index++, label: '69' },
  { key: index++, label: '70' },
  { key: index++, label: '71' },
  { key: index++, label: '72' },
  { key: index++, label: '73' },
  { key: index++, label: '74' },
  { key: index++, label: '75' },
  { key: index++, label: '76' },
  { key: index++, label: '77' },
  { key: index++, label: '78' },
  { key: index++, label: '79' },
  { key: index++, label: '80' },
  { key: index++, label: '81' },
]

const hipsData = [
  { key: index++, label: '69' },
  { key: index++, label: '70' },
  { key: index++, label: '71' },
  { key: index++, label: '72' },
  { key: index++, label: '73' },
  { key: index++, label: '74' },
  { key: index++, label: '75' },
  { key: index++, label: '76' },
  { key: index++, label: '77' },
  { key: index++, label: '78' },
  { key: index++, label: '79' },
  { key: index++, label: '80' },
  { key: index++, label: '81' },
]


function Measurement({ name, suffix, data, value, setValue }) {



  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        marginVertical: 15
      }}>

      <Text
        style={{ fontSize: 16 }}>
        {name}
      </Text>
      <ModalSelector
        data={data}
        initValue="Enter"
        onChange={(option) => { setValue(option.label) }}>
        <Text style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          height: 40
        }}>
          {(value > 0 || (value != '' && value != null)) ? value + ' ' + suffix : 'Enter'}
        </Text>
      </ModalSelector>
    </View>
  )
}

const percentageGroup = (sex, bodyFatPercent) => {
  if (sex == 'Male') {
    switch (true) {
      case (bodyFatPercent < 2):
        return 'Unacceptable'
      case (bodyFatPercent >= 2 && bodyFatPercent <= 4):
        return 'Essentail Fat';
      case (bodyFatPercent >= 6 && bodyFatPercent <= 13):
        return 'Athletes';
      case (bodyFatPercent >= 14 && bodyFatPercent <= 17):
        return 'Fitness';
      case (bodyFatPercent >= 17 && bodyFatPercent <= 25):
        return 'Acceptable';
      case (bodyFatPercent > 25):
        return 'Obese';
    }
  }
  else if (sex == 'Female') {
    switch (true) {
      case (bodyFatPercent < 10):
        return 'Unacceptable'
      case (bodyFatPercent >= 10 && bodyFatPercent <= 12):
        return 'Essentail Fat';
      case (bodyFatPercent >= 14 && bodyFatPercent <= 20):
        return 'Athletes';
      case (bodyFatPercent >= 21 && bodyFatPercent <= 24):
        return 'Fitness';
      case (bodyFatPercent >= 25 && bodyFatPercent <= 31):
        return 'Acceptable';
      case (bodyFatPercent > 31):
        return 'Obese';
    }

  }
  else {
    return 'Undefined'
  }
}

const Profile = () => {

  let [age, setAge] = useState(0)
  let [sex, setSex] = useState('')
  let [height, setHeight] = useState(0)
  let [weight, setWeight] = useState(0)
  let [neck, setNeck] = useState(0)
  let [waist, setWaist] = useState(0)
  let [hips, setHips] = useState(0)



  let [percentBodyFat, setPercentBodyFat] = useState(0)
  let [percentLeanMass, setPercentLeanMass] = useState(0)

  let percentBodyFatValue = 0
  let percentLeanMassValue = 0

  let bodyFatMass = 0
  let leanBodyMass = 0

  let [category, setCategory] = useState('Undefined')
  let [step, setStep] = useContext(WizardContext)

  useEffect(() => {
    if (weight > 0 && height > 0 && neck > 0 && waist > 0 && hips > 0) {
      if (sex == 'Male') {
        percentBodyFatValue = 495 / (1.0324 - 0.19077 * Math.log10(+waist - +neck) + 0.15456 * Math.log10(height)) - 450
        setPercentBodyFat(percentBodyFatValue)
      }
      else if (sex == 'Female') {
        console.log((waist + hips) - neck)
        percentBodyFatValue = 495 / (1.29579 - 0.35004 * Math.log10(+waist + +hips - +neck) + 0.22100 * Math.log10(height)) - 450

        setPercentBodyFat(percentBodyFatValue)
      }
    }

    if (percentBodyFat > 0) {
      bodyFatMass = ((weight * percentBodyFat) / 100)
      leanBodyMass = weight - bodyFatMass
      percentLeanMassValue = (leanBodyMass / weight) * 100
      setPercentLeanMass(percentLeanMassValue)
      setCategory(percentageGroup(sex, percentBodyFat))

    }

  })
  
  return (
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 15,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Headline>
          Please enter your body measurements
      </Headline>

        <View
          style={{
            justifyContent: 'center'
          }}>
          <Measurement name="Age" data={ageData} suffix="" value={age} setValue={setAge} />

          <Measurement name="Sex" data={sexData} suffix="" value={sex} setValue={setSex} />

          <Measurement name="Height" data={heightData} suffix="cm" value={height} setValue={setHeight} />

          <Measurement name="Weight" data={weightData} suffix="kg" value={weight} setValue={setWeight} />

          <Measurement name="Neck" data={neckData} suffix="cm" value={neck} setValue={setNeck} />

          <Measurement name="Waist" data={waistData} suffix="cm" value={waist} setValue={setWaist} />

          <Measurement name="Hips" data={hipsData} suffix="cm" value={hips} setValue={setHips} />

          <View style={{

          }}>
            <View style={{

              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Subheading>Body Composition</Subheading>
              <Text>Composition Level: {category}</Text>
              <Text>Body Fat Percentage: {percentBodyFat.toString().substr(0, 5)}%</Text>
              <Text>Lean Body Mass Percentage: {percentLeanMass.toString().substr(0, 5)}%</Text>
            </View>
          </View>
        </View>
        <Button onPress={() => {
          setStep(2)
        }}>
          Next
        </Button>
      </View >
    </ScrollView>

  );
}

export default Profile