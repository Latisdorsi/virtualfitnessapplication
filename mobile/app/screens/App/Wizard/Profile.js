import React from "react";
import { View, ScrollView, Text } from 'react-native';
import { Headline, Button, Subheading } from "react-native-paper";

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

  constructor(props) {
    super(props);

    this.state = {
      isEnabled: false,
      age: 0,
      sex: '',
      height: 0,
      weight: 0,
      neck: 0,
      waist: 0,
      hips: 0,
      composition: {
        category: 'Unknown',
        percentBodyFat: 0,
        percentLeanMass: 0
      }
    }
  }

  _checkComposition = (composition) => {
    if(composition.category == null || composition.category == 'Unacceptable' || composition.category == ''){
        return false;
    } else {
        return true;
    }
}
  _checkFields = () => {
    return this.state.age > 0 && this.state.sex.length > 0 && this.state.height > 0 && this.state.weight > 0 && this.state.neck > 0 && this.state.waist > 0 && this.state.hips > 0;
  }
  render() {
    const { navigate } = this.props.navigation;
    
    const composition = CalculateComposition(this.state.age, this.state.sex, this.state.weight, this.state.height, this.state.neck, this.state.waist, this.state.hips)
  

    return (

      <WizardContext.Consumer>
        {({ context, setAge, setSex, setHeight, setWeight, setNeck, setWaist, setHips, setComposition }) => (
          <ScrollView >

            <View style={{ padding: 15 }}>
              <Headline>
                Please enter your body measurements
               </Headline>

              {/* {composition = CalculateComposition(age, sex, weight, height, neck, waist, hips)} */}


              <View
                style={{
                  justifyContent: 'center'
                }}>
                <View stlye={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                  <Subheading>Body Composition</Subheading>
                  <Text>Composition Level: {composition.category}</Text>
                  <Text>Body Fat Percentage: {composition.percentBodyFat.toString().substr(0, 5)}%</Text>
                  <Text>Lean Body Mass Percentage: {composition.percentLeanMass.toString().substr(0, 5)}%</Text>
                </View>
                <Measurement name="Age" data={ageData} suffix="" value={this.state.age} setValue={(age) => this.setState({ age })} />

                <Measurement name="Sex" data={sexData} suffix="" value={this.state.sex} setValue={(sex) => this.setState({ sex })} />

                <Measurement name="Height" data={heightData} suffix="cm" value={this.state.height} setValue={(height) => this.setState({ height })} />

                <Measurement name="Weight" data={weightData} suffix="kg" value={this.state.weight} setValue={(weight) => this.setState({ weight })} />

                <Measurement name="Neck" data={neckData} suffix="cm" value={this.state.neck} setValue={(neck) => this.setState({ neck })} />

                <Measurement name="Waist" data={waistData} suffix="cm" value={this.state.waist} setValue={(waist) => this.setState({ waist })} />

                <Measurement name="Hips" data={hipsData} suffix="cm" value={this.state.hips} setValue={(hips) => this.setState({ hips })} />
              </View>

              <Button
                disabled={
                  !(this._checkFields() && this._checkComposition(composition))
                }
                mode="contained"
                onPress={() => {
                  setAge(this.state.age);
                  setSex(this.state.sex);
                  setHeight(this.state.height);
                  setWeight(this.state.weight);
                  setNeck(this.state.neck);
                  setWaist(this.state.waist);
                  setHips(this.state.hips);
                  setComposition(composition);
                  navigate('Assessment');
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