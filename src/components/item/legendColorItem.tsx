import React, {} from 'react';
import {  Text,  View, Image} from 'react-native';
import { Colors } from '../../utils';
import { useTranslation } from 'react-i18next';


const mainSearchItem = ({text, color} : any) => {

  const {t} = useTranslation();
  
  return (
      <View style={{flexDirection:"row",justifyContent:"flex-start", alignItems:"center", marginVertical:8, marginLeft:32}}>
        <Text style={{color:"#436880", fontSize:13,}}>{t(text)}</Text>
        <View style={{width:12, height:12, backgroundColor: color, marginLeft:8, borderRadius:6}}/>
      </View>
  );
};


export default mainSearchItem;
