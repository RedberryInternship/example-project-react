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

const filterTextItem = ({_this} : any) => {
  
  const nameTextHandler= (text : string) =>{
    _this.current.name = text
  }
  const nameInputSubmit= () =>{
    // hook.current.code = text
  }
  const surNameTextHandler= (text : string) =>{
    _this.current.surnName  = text
  }
  const surNameInputSubmit= () =>{
    
  }

  const emailTextHandler= (text : string) =>{
    _this.current.email  = text
  }
  const emailInputSubmit= () =>{
    
  }

  return (
    <View style={{width: Const.Width, paddingHorizontal:16}} >
      <BaseInput
        image={require("../../../../assets/images/icons/user.png")}
        imageStyle={{tintColor :Colors.primaryBlue}}
        keyboardType={"email-address"}
        onChangeText={nameTextHandler}
        onSubmit={nameInputSubmit}
        testID={"nameInput"}
        title={"authentication.registration.name"}
      />
      <BaseInput
        image={require("../../../../assets/images/icons/user.png")}
        imageStyle={{tintColor :Colors.primaryBlue}}
        keyboardType={"email-address"}
        onChangeText={surNameTextHandler}
        onSubmit={surNameInputSubmit}
        testID={"nameInput"}
        title={"authentication.registration.surname"}
      /> 
      <BaseInput
        image={require("../../../../assets/images/icons/mail.png")}
        imageStyle={{tintColor :Colors.primaryBlue}}
        keyboardType={"email-address"}
        onChangeText={emailTextHandler}
        onSubmit={emailInputSubmit}
        testID={"nameInput"}
        title={"authentication.registration.email"}
      />
    </View>
  );
};


export default filterTextItem;
