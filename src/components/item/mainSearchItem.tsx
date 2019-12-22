import React, {useRef, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView,Text,  View, TouchableOpacity,TouchableWithoutFeedback, Image} from 'react-native';
import { Colors } from '../../utils';


const styles = StyleSheet.create({
  container : {
    justifyContent:"center",
    alignItems:"center",
    elevation:1,
    backgroundColor:"transparent",
    margin:16,
    height: 40,
    flexDirection:"row",
    width:"100%"
  },
});

const mainSearchItem = ({mainTitle,text, onPress} : any) => {

  return (
      <TouchableWithoutFeedback
        style={[styles.container]}
        onPress={onPress}
        
      >
        <View style={styles.container}>
          <Image source={require('../../../assets/images/icons/map-pin.png')} style={{width: 23, height:23,  marginRight:16}} />
          <View style={{flex:1}}>
            <Text numberOfLines={1} style={{fontSize:13, fontWeight:"bold",color :"white" , lineHeight : 22}}>{mainTitle}</Text>
            <Text numberOfLines={1} style={{fontSize:13,color : Colors.primaryGray, lineHeight : 22}}>{text}</Text>
          </View>
          </View>
      </TouchableWithoutFeedback>
  );
};


export default mainSearchItem;
