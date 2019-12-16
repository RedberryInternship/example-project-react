import React, {useRef, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView,Text,  View, TouchableOpacity, Image} from 'react-native';
import { Colors, Const } from '../../../../src/utils';
import { PhoneNumberInput, ReceiveCode, BaseInput } from '../../../../src/components';


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

const PasswordView = ({_this} : any) => {
  
  const passwordTextHandler= (text : string) =>{
    _this.current.password = text
  }
  const passwordInputSubmit= () =>{

  }

  const repeatPasswordTextHandler= (text : string) =>{
    _this.current.repeatPassword  = text
  }
  const repeatPasswordInputSubmit= () =>{
    
  }

  return (
    <View style={{width: Const.Width, paddingHorizontal:16}} >
      <BaseInput
        image={require("../../../../assets/images/icons/lock.png")}
        imageStyle={{tintColor :Colors.primaryBlue}}
        keyboardType={"email-address"}
        onChangeText={passwordTextHandler}
        onSubmit={passwordInputSubmit}
        secure={true}
        testID={"nameInput"}
        title={"authentication.registration.password"}
      />
      <BaseInput
        image={require("../../../../assets/images/icons/lock.png")}
        imageStyle={{tintColor :Colors.primaryBlue}}
        keyboardType={"email-address"}
        onChangeText={repeatPasswordTextHandler}
        onSubmit={repeatPasswordInputSubmit}
        testID={"nameInput"}
        secure={true}
        title={"authentication.registration.repeatPassword"}
      /> 
    </View>
  );
};


export default PasswordView;
