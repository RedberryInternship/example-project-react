import React, {useRef, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView,Text,  View, TouchableOpacity,TouchableWithoutFeedback, Image} from 'react-native';
import { useMap } from '../../hooks';
import { Colors } from '../../../src/utils';


const styles = StyleSheet.create({
  container : {
    height:30,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    elevation:1,
    paddingHorizontal:16,
    paddingVertical:4,
    backgroundColor:"white",
    marginHorizontal:8
  },
});

const chooseCardOnCharging = ({lastDigits, active, onPress} : any) => {

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View style={{flexDirection:"row",alignItems:"center", height:40, marginVertical:8,marginHorizontal:16}}>
      <Image  
          source={require("../../../assets/images/icons/credit-card.png") }  
          style={{width:21, height:21, resizeMode:"contain", marginRight:8}}
        />
        <Text style={{fontSize:13, color:Colors.primaryWhite}}>XXXXXXXXXX {lastDigits}</Text>
        <View style={{ alignItems:"flex-end", alignSelf:"center",flex:1, justifyContent:"center", marginRight:12}}>
          <Image  
            source={active ? require("../../../assets/images/icons/green_checkmark.png") : require("../../../assets/images/icons/cicle.png") }  
            style={{width:28, height:28, resizeMode:"contain"}}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};


export default chooseCardOnCharging;
