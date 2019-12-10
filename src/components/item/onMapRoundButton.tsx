import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, ScrollView,Text,  View, TouchableOpacity, Image} from 'react-native';
import { useMap } from '../../hooks';


const styles = StyleSheet.create({
  container : {
    width:50, 
    height:50,
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center",
    position: "absolute",
    elevation:1,
    backgroundColor:"#008AEE"
  },
});

const onMapRoundButton = ({onPress, style, image, imageStyle} : any) => {

  return (
    <TouchableOpacity
      style={[styles.container,style]}
      onPress={onPress}
      hitSlop={{
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }}
    >
      <Image  source={image} style={[{width:18, height: 18, alignSelf : "center",resizeMode:"contain", },imageStyle]}/>
    </TouchableOpacity>
  );
};


export default onMapRoundButton;
