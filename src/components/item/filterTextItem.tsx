import React, {useRef, useEffect} from 'react';
import { StyleSheet, ScrollView,Text,  View, TouchableOpacity, Image} from 'react-native';
import { useMap } from '../../hooks';
import { Colors } from '../../../src/utils'; // todo Vobi: use absolute imports  https://hackernoon.com/react-pro-tip-use-absolute-imports-for-better-readability-and-easy-refactoring-2ad5c7f2f957


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

const filterTextItem = ({text, onPress, active} : any) => {

  return (
      <TouchableOpacity
        style={[styles.container, {backgroundColor :  active ? "#008AEE" : "white" }]}
        onPress={onPress}
      >
        <Text style={{fontSize:11,color : active ? "white" :  Colors.primaryDark , lineHeight : 22}}>{text}</Text>
      </TouchableOpacity>
  );
};


export default filterTextItem;
