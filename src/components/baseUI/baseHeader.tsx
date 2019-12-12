import React, {useRef, useEffect} from 'react';
import { StyleSheet,Text,Platform,  View, Image, TouchableOpacity} from 'react-native';
import { Colors } from '../../utils';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from "react-navigation"
// import {TouchableOpacity} from 'react-native-gesture-handler'

const styles = StyleSheet.create({
  mainContainer:{
    flex:0,
    backgroundColor:Colors.primaryBackground,
    width:"100%"

  },
  container : {
    justifyContent:"center",
    alignItems:"stretch",
    height: Platform.OS ==="ios" ?44 : 60,
    flexDirection:"row",
    width:"100%",
    position:"relative"
  },
  imageStyle: {
    width:21, 
    height:21,
    marginHorizontal:4,
    resizeMode:"contain"
  }
});


const baseHeader = ({ onPressLeft, title, onPressRight} : any) => {

  const { t, i18n } = useTranslation();

  const renderLeft = () => {
    return onPressLeft && (
      <View style={{justifyContent:"center", height:"100%", position:"absolute",left:0,top:0}}>
        <TouchableOpacity
          onPress={onPressLeft}
          style={{ flex:1, justifyContent:"center",alignItems:"center",flexDirection:"row", marginLeft:4,}}
          hitSlop={{top : 15, bottom : 15, left : 15, right :15}}
        >
          {
            Platform.OS ==="ios" ? 
              <>
                <Image  source={require("../../../assets/images/icons/ios_back.png")} style={styles.imageStyle}/>
                <Text style={{color: "#D1CFD7", fontSize:15}}>{t("back")}</Text>
              </>
            :
              <>
                <Image  source={require("../../../assets/images/icons/ios_back.png")} style={styles.imageStyle}/>
                {/* <Text>{t("back")}</Text> */}
              </>
          }
        </TouchableOpacity>
      </View>
    )
  }

  const renderMiddle = () => {
    return title && (
      <View style={{ flex:1, height:"100%",justifyContent:"center", alignItems:"center"}}>
        <Text style={{color:Colors.primaryWhite, fontSize:18}}>{t(title)}</Text>
      </View>
    )
  }

  const renderRight = () => {
    return onPressRight && (
      <View style={{ height:"100%", flex:0, position:"absolute",right:0,top:0}}>
                
      </View>
    )
  }
  return (
      <SafeAreaView style={styles.mainContainer}>
          <View style={[styles.container]}>
              {renderMiddle()}
              {renderLeft()}
              {renderRight()}
              
          </View>
      </SafeAreaView>
  );
};


export default baseHeader;
