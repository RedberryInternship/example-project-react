import React, {} from 'react';
import {  Text,  View, Image} from 'react-native';
import { useTranslation } from 'react-i18next';


const mainSearchItem = ({text, image} : any) => {

  const {t} = useTranslation();
  
  return (
      <View style={{flexDirection:"row", marginHorizontal:32, justifyContent:"space-between", alignItems:"center", marginVertical:8}}>
        <Text style={{color:"#436880", fontSize:13,}}>{t(text)}</Text>
        <Image  source={image} style={{width:23, height:23, resizeMode:"contain"}}/>
      </View>
  );
};


export default mainSearchItem;
