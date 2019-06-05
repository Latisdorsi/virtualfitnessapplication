import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Text } from 'react-native';
import { Subheading, Headline, Button } from "react-native-paper";
import ModalSelector from 'react-native-modal-selector';

import Measurement from 'lib/components/MeasurementModal';
import { CalculateComposition } from 'lib/helpers/utils';
import {
  ageData,
  sexData,
  weightData,
  heightData,
  neckData,
  waistData,
  hipsData
} from 'lib/helpers/data'


import WizardContext from './WizardContext';


class Profile extends React.Component {

  // let [age, setAge] = useState(0)
  // let [sex, setSex] = useState('')
  // let [height, setHeight] = useState(0)
  // let [weight, setWeight] = useState(0)
  // let [neck, setNeck] = useState(0)
  // let [waist, setWaist] = useState(0)
  // let [hips, setHips] = useState(0)

  // let [percentBodyFat, setPercentBodyFat] = useState(0)
  // let [percentLeanMass, setPercentLeanMass] = useState(0)
  // let [category, setCategory] = useState('Undefined')


  // let percentBodyFatValue = 0
  // let percentLeanMassValue = 0

  // let bodyFatMass = 0
  // let leanBodyMass = 0

  render() {

    const { navigate } = this.props.navigation;

    return (

      <WizardContext.Consumer>
        {(context) => (
          <ScrollView >
            <View style={{ padding:15}}>
              {/* {composition = CalculateComposition(age, sex, weight, height, neck, waist, hips)} */}
              <Headline>
                Please enter your body measurements
               </Headline>


              <View
                style={{
                  justifyContent: 'center'
                }}>
                <Measurement name="Age" data={ageData} suffix="" value={context.age} />

                <Measurement name="Sex" data={sexData} suffix="" value={context.sex} />

                <Measurement name="Height" data={heightData} suffix="cm" value={context.height} />

                <Measurement name="Weight" data={weightData} suffix="kg" value={context.weight} />

                <Measurement name="Neck" data={neckData} suffix="cm" value={context.neck} />

                <Measurement name="Waist" data={waistData} suffix="cm" value={context.waist} />

                <Measurement name="Hips" data={hipsData} suffix="cm" value={context.hips} />


                <View style={{
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Subheading>Body Composition</Subheading>
                  <Text>Composition Level: {context.composition.category}</Text>
                  <Text>Body Fat Percentage: {context.composition.percentBodyFat.toString().substr(0, 5)}%</Text>
                  <Text>Lean Body Mass Percentage: {context.composition.percentLeanMass.toString().substr(0, 5)}%</Text>
                </View>
              </View>


              <Button
                mode="contained"
                onPress={() => navigate('Goal')}
              >
                Next
            </Button>
            </View>
          </ScrollView>
        )}
      </WizardContext.Consumer>
    );
  }
}

export default Profile