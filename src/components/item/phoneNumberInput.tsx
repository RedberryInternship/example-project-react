import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, ScrollView,Text,  View, TouchableOpacity, Image} from 'react-native';
import { useMap } from '../../hooks';
import {BaseInput} from "../" 

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

const phoneNumberInput = ({phoneTextHandler, phoneInputSubmit, text, onFocus, phoneRef} : any) => {

  return (
    <View style={{flex:0, position:"relative"}}>
      <Image source={require("../../../assets/images/icons/phone.png")}  style={{width: 24,flex:-1, height: 24,position: 'absolute',left: 13,bottom: 30,zIndex:22,alignSelf:"center"}} resizeMode="contain"/>
      <BaseInput
        paddingLeft={50}
        keyboardType={"numeric"}
        onChangeText={phoneTextHandler}
        onSubmit={phoneInputSubmit}
        value={text}
        onFocus={onFocus}
        ref={phoneRef}
        testID={"loginPhone"}
        title={"authentication.number"}
      />
    </View>
  );
};


export default phoneNumberInput;
