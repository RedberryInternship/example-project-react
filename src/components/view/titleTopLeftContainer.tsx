import React, {useRef, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView,Text,  View, TouchableOpacity, Image} from 'react-native';
import { useMap } from '../../hooks';
import { Colors } from '../../utils';
import { useTranslation } from 'react-i18next';


type TitleTopLeftContainer = {
  title : string,
  data : Array<any>,
  onRenderItem : (value: any, index: number,)=> {} | null | undefined,
  direction : "row" | "column"
}
const titleTopLeftContainer = ({title, data, onRenderItem, direction} : TitleTopLeftContainer) => {
  const {t} = useTranslation();
  return (
    <View>
      <Text style={{color:"white", fontSize:13, fontWeight:"bold", marginVertical:16}}>{t(title)}</Text>
      <View style={{flexDirection: direction }} >
        {data.map(onRenderItem)}
      </View>
    </View>
  );
};


export default titleTopLeftContainer;

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
