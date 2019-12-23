import React, { useState} from 'react';
import { StyleSheet,Text,  View, TouchableOpacity,Animated, Alert} from 'react-native';
import {BaseInput} from "../" 
import { Colors } from '../../../src/utils';

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
  touchableStyle: {
    marginVertical:4,
    borderRightWidth:1,
    flex:1, 
    borderRightColor:"#9A99A255",
    alignItems:"center",
    justifyContent:"center"
  }
});

// eslint-disable-next-line react/display-name
const phoneNumberInput = React.forwardRef( ({phoneTextHandler, phoneInputSubmit, text, onFocus} : any, ref : any) => {
  const [animation] = useState(new Animated.Value(0))

  const _onFocus = (e : any) =>{
    
    onFocus && onFocus(e);

    Animated.timing(animation, {
      toValue:1,
      duration:500,
    }).start()
  }
  return (
    <View style={{flex:0, position:"relative"}}>
      <Animated.Image source={require("../../../assets/images/icons/phone.png")}  style={{width: 24,flex:-1, height: 24,position: 'absolute',left: 13,bottom: 30,zIndex:22,alignSelf:"center", opacity:  animation.interpolate({inputRange:[0,1],outputRange : [1,0] }) }} resizeMode="contain"/>
      <BaseInput
        paddingLeft={64}
        keyboardType={"numeric"}
        onChangeText={phoneTextHandler}
        onSubmit={phoneInputSubmit}
        value={text}
        onFocus={_onFocus}
        ref={ref}
        testID={"loginPhone"}
        title={"authentication.number"}
      />
      <Animated.View style={{position:"absolute", width:53,height:48, opacity: animation, bottom:16}}>
        <TouchableOpacity 
          onPress={()=>Alert.alert("sf")}
          style={styles.touchableStyle}
          hitSlop={{top : 10, bottom : 10, left : 15, right :15}}

        >
          <Text style={{color:Colors.primaryGray, fontSize:13}}>+995</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
});


export default phoneNumberInput;
