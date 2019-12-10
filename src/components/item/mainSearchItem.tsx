import React, {useRef, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView,Text,  View, TouchableOpacity, Image} from 'react-native';
import { Colors } from '../../utils';


const styles = StyleSheet.create({
  container : {
    justifyContent:"center",
    alignItems:"center",
    elevation:1,
    paddingHorizontal:16,
    backgroundColor:"transparent",
    padding:16,
    height: 72,
    flexDirection:"row",
    width:"100%"
  },
});

const mainSearchItem = ({mainTitle,text, onPress} : any) => {

  return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={onPress}
      >
          <Image source={require('../../../assets/images/icons/map-pin.png')} style={{width: 23, height:23,  marginRight:16}} />
          <View style={{flex:1}}>
            <Text numberOfLines={1} style={{fontSize:13, fontWeight:"bold",color :"white" , lineHeight : 22}}>{mainTitle}</Text>
            <Text numberOfLines={1} style={{fontSize:13,color : Colors.primaryGray, lineHeight : 22}}>{text}</Text>
          </View>
      </TouchableOpacity>
  );
};


export default mainSearchItem;
