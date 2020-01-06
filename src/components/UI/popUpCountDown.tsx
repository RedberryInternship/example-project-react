import React, {useRef, useEffect} from 'react';
import {SafeAreaView, StyleSheet,View} from 'react-native';
import { Colors } from '../../../src/utils';
import {CountDown} from "../"

const styles = StyleSheet.create({
  mainContainer : {
    flex:0,
    width: 78, 
    height : 78, 
    borderRadius : 39, 
    borderWidth:1, 
    borderColor:"#FF000F54",
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
    marginVertical:24
  },
  innerContainer : {
    width: 72, 
    height : 72, 
    borderRadius : 36, 
    borderWidth:3, 
    backgroundColor:"rgba(255, 0, 15, 0.15)", 
    borderColor:"#FF000F",
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center"
  }
});

const popUpCountDown = ({text, onPress, active} : any) => {

  return (
      <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <CountDown 
              duration={120000}
              up={false}
              alarm={true}
              popup={true}
            />
        </View>
          
      </View>
  );
};


export default popUpCountDown;
