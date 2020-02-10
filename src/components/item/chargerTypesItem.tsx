import React, {useRef, useEffect} from 'react';
import { StyleSheet, ScrollView,Text,  View, TouchableOpacity, Image} from 'react-native';
import { useMap } from '../../hooks';
import { Colors } from '../../../src/utils';
import { useTranslation } from 'react-i18next';


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

const filterTextItem = ({index,type, power, active, onPress} : any) => {

  const {t} = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={{flexDirection:"row",alignItems:"center", borderRadius:8, backgroundColor:"#08141B", height:55, marginBottom:8,}}>
        <View style={{width:48,height:"100%", backgroundColor:"#4CD96433", borderTopLeftRadius:8, borderBottomLeftRadius : 8, justifyContent:"center", alignItems:"center"}}>
          <Text style={{fontSize:17, color:Colors.primaryGreen, fontWeight:"bold"}}>{index}</Text>
        </View>
        <View  style={{justifyContent:"space-between", marginLeft:12, height:"100%", paddingVertical:8}}>
          <Text style={{fontSize:13, color:Colors.primaryWhite,}}>{type}</Text>
          <Text style={{fontSize:11, color:Colors.primaryGray}}>{t("chargerDetail.powerOfChargerType", {power})}</Text>
        </View>
        <View style={{ alignItems:"flex-end", alignSelf:"center",flex:1, justifyContent:"center", marginRight:12}}>
          <Image  
            source={active ? require("../../../assets/images/icons/green_checkmark.png") : require("../../../assets/images/icons/cicle.png") }  
            style={{width:28, height:28, resizeMode:"contain"}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default filterTextItem;
