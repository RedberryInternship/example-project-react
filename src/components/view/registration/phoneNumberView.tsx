import React, {useRef, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView,Text,  View, TouchableOpacity, Image} from 'react-native';
import { Colors, Const } from '../../../../src/utils';
import { PhoneNumberInput, ReceiveCode } from '../../../../src/components';


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
  
  const codeTextHandler= (text : string) =>{
    _this.current.code = text
  }
  const codeInputSubmit= () =>{
    // hook.current.code = text
  }
  const phoneTextHandler= (text : string) =>{
    _this.current.phone  = text
  }
  const phoneInputSubmit= () =>{
    
  }

  return (
    <View style={{width: Const.Width, paddingHorizontal:16}} >
      <PhoneNumberInput
          onChangeText={phoneTextHandler}
          onSubmit={phoneInputSubmit}
          // value={hook._this.current.phone}
          // onFocus={hook.onFocusPhone}
          // ref={hook.phoneRef}
        />
        <ReceiveCode
          // ref={hook.codeRef}
          onChangeText={codeTextHandler}
          onSubmit={codeInputSubmit}
        />
    </View>
  );
};


export default filterTextItem;
