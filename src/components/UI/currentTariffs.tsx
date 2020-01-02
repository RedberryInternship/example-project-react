import React, {} from 'react';
import {  Text,  View, Image, StyleSheet} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../src/utils';


const CurrentTariffs = ({data} : any) => {

  const {t} = useTranslation();
  
  return (
      <View style={styles.container}>
        <View style={styles.tableHeader}>
          <Text style={{letterSpacing:-0.41,  color : "white"}}>{t("chargerDetail.currentPrices")}</Text>
          <Text style={{letterSpacing:-0.41, fontSize:11, color : "#A1A8AB"}}>{t("chargerDetail.currentPrices")}</Text>
        </View>
          {
            data.map((val , ind : Number)=>(
              <Row 
                key={ind}
                {...val}
              />
            ))
          }
      </View>
  );
};


const styles = StyleSheet.create({
  container : {
    justifyContent:"space-between", 
    alignItems:"stretch", 
    backgroundColor: "#08141B", 
    borderRadius:8,
    marginVertical : 16,
    padding : 12,
  },
  tableHeader : {
    height:55,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:'center',
  }

})

export default CurrentTariffs;


const Row = () => {

  return (
      <View style={{flexDirection:"row", alignItems:"center", height:44, borderTopColor:"#11222D", borderTopWidth:1}}>
          <Text style={{flex:1,alignSelf:"center", color : Colors.primaryWhite, fontSize:11, }}>asdf</Text>
          <Text style={{flex:1,alignSelf:"center", color : Colors.primaryWhite, fontSize:11, }}>asdf</Text>
          <Text style={{flex:1.5,alignSelf:"center", color : Colors.primaryWhite, fontSize:11, textAlign:"center"}}>asdf</Text>
      </View>
  );
};