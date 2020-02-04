/* eslint-disable react/display-name */
import React from 'react';
import {Text,  View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { Colors } from '../../../src/utils';
import { LegendItem, LegendColorItem } from '../';
import { useTranslation } from 'react-i18next';


type Props = {
  onPress : (index : number) => void,
  data : Data,
  addresses :Addresses
}
type Data= {
  title : string,
  address : string,
}

type Addresses = {
  freeToUse : boolean,
  code : string,


}
export default ({ onPress , data} : Props) => {

  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(data.title)}</Text>
      <View style={styles.addressContainer}>
        <Image  source={require("../../../assets/images/icons/ic_map_pin.png")} style={{width:21, height:21, resizeMode:"contain"}}/>
        <Text style={styles.addressText}>{t(data.address)}</Text>
      </View>
      
    </View>
          
  );
};



const styles = StyleSheet.create({
  container: {
    marginHorizontal:24,
    marginVertical:8,
  },
  title : {
    fontSize:17, 
    lineHeight:22, 
    color: Colors.primaryDark,
    textTransform: 'uppercase'

  },
  addressContainer : {
    flexDirection:"row", 
    justifyContent:"flex-start", 
    alignItems:"center", 
    paddingVertical:8,
    borderBottomColor :Colors.primaryBackground.concat("33"),
    borderBottomWidth:1,
    paddingBottom: 16
  },
  addressText : {
    color:"#436880", 
    fontSize:13,
    marginLeft:12
  }

});