/* eslint-disable react/display-name */
import React from 'react';
import {Text,  View, TouchableOpacity,StyleSheet, Image} from 'react-native';
import { Colors } from '../../../../src/utils';
import { useTranslation } from 'react-i18next';
import { PopUpCountDown, ModalPopupChargerItem } from '../../../../src/components';



export default ({ onPress, sybType, data : {title, description, bottomDescription}} : any) => {

  const {t} = useTranslation()
  
  return (
      <>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={onPress}
        > 
          <Image  source={require("../../../../assets/images/icons/close.png")} style={{width:28, height:28, resizeMode:"contain",alignSelf:"center", tintColor: Colors.primaryBlue}}/>
        </TouchableOpacity>
        <View style={{flex:0, marginHorizontal:16}}>
          <Image  source={require("../../../../assets/images/icons/check-circle.png")} style={{width:32, height:32, resizeMode:"contain",alignSelf:"center"}}/>
          <Text style={styles.mainTitleStyle}>{t(title)}</Text>
          <Text style={styles.mainDescriptionStyle}>{t(description)}</Text>
        </View>
        <View style={styles.bottomContentContainer}>
          {
            true ? 
              <>
                <Text style={styles.bottomContentDescription}>{t(bottomDescription)}</Text>
                <PopUpCountDown 
                  up={true}
                  warningLevel={1}
                />
              </>
            :
              <Text style={styles.bottomContentDescriptionType2}>{t(bottomDescription)}</Text>
          }
          <View  style={{backgroundColor : Colors.primaryBackground, opacity:0.1, height:1, width:"100%", justifyContent:"center"}}/>
            {
              !true ? 
                <View style={{marginVertical:32}}>
                  <Text style={styles.bottomContentDescriptionType2}>{t("ანგარიშიდან ჩამოგეჭრათ")}</Text>
                  <Text style={styles.boldNumberBig}>{23} {t("gel")}</Text>
                </View>
              :
              <View style={{marginVertical:12}}>
              {
                [{val : 3, type : 0},{val : 3, type : 1}, {val : 33, type : 2}].map((val, ind) => (
                  <ModalPopupChargerItem 
                    key={ind}
                    {...val}
                  />
                ))
              }
              </View>
            }

            {
              true && 
              <>
                <View  style={{backgroundColor : Colors.primaryBackground, opacity:0.1, height:1, width:"100%", justifyContent:"center"}}/>
                <TouchableOpacity   onPress={() => {}}  style={{marginVertical: 16, alignItems:"center"}}>
                  <Text  style={{color: Colors.primaryGreen, fontSize:13}}>{t("charger.allChargerList")}</Text>
                </TouchableOpacity>
              </>
              
            }
        </View>
        
          
      </>
  );
};



const styles= StyleSheet.create({
  touchableStyle : {
    borderRadius:25, 
    width:50, 
    height:50, 
    backgroundColor:"#0199F011", 
    alignSelf:"flex-end", 
    justifyContent:"center", 
    marginRight:16
  },
  mainTitleStyle : {
    fontSize:16, 
    lineHeight:18, 
    fontWeight:"bold",
    color: Colors.primaryBackground, 
    alignSelf:"center",
    textAlign:"center",
    marginHorizontal:32,
    marginTop:8
  },
  mainDescriptionStyle : {
    fontSize:11, 
    lineHeight:14, 
    color: Colors.primaryGray, 
    alignSelf:"center",
    textAlign:"center",
    marginHorizontal:32,
    marginTop:8,
    marginBottom:24,
  },
  bottomContentContainer : {
    flex:0, 
    marginHorizontal:16, 
    backgroundColor:"#90A3AD24",
    borderRadius : 8,
    padding : 16
  },
  bottomContentDescription : {
    fontSize:11, 
    lineHeight:16, 
    color: "#436880", 
    alignSelf:"center",
    textAlign:"center",
    marginHorizontal:32,
    marginTop:8,
  },
  bottomContentDescriptionType2 : {
    fontSize:13, 
    lineHeight:16, 
    color: "#436880", 
    alignSelf:"center",
    textAlign:"center",
    marginHorizontal:32,
    marginTop : 16,
  },
  boldNumberBig : {
    fontSize:17, 
    lineHeight:16, 
    color: Colors.primaryBackground, 
    alignSelf:"center",
    textAlign:"center",
    marginHorizontal:32,
    marginTop : 8,
    fontWeight:"bold"
  }
})