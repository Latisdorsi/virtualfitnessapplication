import React from "react";
import { View, ScrollView } from 'react-native';
import { Headline, Button } from "react-native-paper";

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

  render() {

    const { navigate } = this.props.navigation;

    return (

      <WizardContext.Consumer>
        {({ context, setAge, setSex, setHeight, setWeight, setNeck, setWaist, setHips, setComposition }) => (
          <ScrollView >
            <View style={{ padding: 15 }}>
              {/* {composition = CalculateComposition(age, sex, weight, height, neck, waist, hips)} */}
              <Headline>
                Please enter your body measurements
               </Headline>

              <View
                style={{
                  justifyContent: 'center'
                }}>
                <Measurement name="Age" data={ageData} suffix="" value={context.age} setValue={setAge} />

                <Measurement name="Sex" data={sexData} suffix="" value={context.sex} setValue={setSex} />

                <Measurement name="Height" data={heightData} suffix="cm" value={context.height} setValue={setHeight} />

                <Measurement name="Weight" data={weightData} suffix="kg" value={context.weight} setValue={setWeight} />

                <Measurement name="Neck" data={neckData} suffix="cm" value={context.neck} setValue={setNeck} />

                <Measurement name="Waist" data={waistData} suffix="cm" value={context.waist} setValue={setWaist} />

                <Measurement name="Hips" data={hipsData} suffix="cm" value={context.hips} setValue={setHips} />


                {/* <View style={{
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Subheading>Body Composition</Subheading>
                  <Text>Composition Level: {context.composition.category}</Text>
                  <Text>Body Fat Percentage: {context.composition.percentBodyFat.toString().substr(0, 5)}%</Text>
                  <Text>Lean Body Mass Percentage: {context.composition.percentLeanMass.toString().substr(0, 5)}%</Text>
                </View> */}
              </View>


              <Button
                mode="contained"
                onPress={() => {
                  setComposition(CalculateComposition(context.age, context.sex, context.weight, context.height, context.neck, context.waist, context.hips))
                  navigate('Assessment')
                }}
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