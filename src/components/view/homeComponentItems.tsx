
import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, ScrollView,Text,  View, TouchableOpacity, Alert} from 'react-native';
import { useMap } from '../../hooks';
import { OnMapRoundButton, HomeFilterView, HomeAuthorizationButton, HomeMainInput } from '..';
import { Defaults } from '../../../src/utils';
import { useTranslation } from 'react-i18next';


const styles = StyleSheet.create({
  container : {
    width:"100%", 
    height:"100%",
    position: "absolute",
    bottom:0,
    left:0,
    paddingHorizontal:8,
    elevation:0,
    backgroundColor:"transparent"
  },
  authorization : {
    bottom:20,
    right: 0,
    position:"absolute",
  },

});

const App = ({}) => {
  const { t, i18n } = useTranslation();
  

  return (
      <>
        <OnMapRoundButton  
          style={{right:24, bottom: 138, backgroundColor:"#FFFFFF"}} 
          onPress={()=>{Alert.alert("asdf")}} 
          image={require('../../../assets/images/icons/ic_alert-circle.png')}
          imageStyle={{width:30,height:30}}
        />
        <HomeFilterView />
        {
          Defaults.token ?
            null
          :
          <HomeAuthorizationButton/>

        }
        <HomeMainInput
          
        />

      </>
  );
};


export default App;
