/* eslint-disable react/display-name */
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Pulse, BaseButton, CountDown } from "..";
import { Const, Colors } from "../../../src/utils";

const CicleDiameter = Const.Width-150


// eslint-disable-next-line react/jsx-no-undef
export default ({hook} : any) =>{
  

  return (
    <View style={{flex:1}}>
    <View style={styles.MainChargerCicleContainer}>
        <Pulse
          color='transparent' 
          numPulses={3} 
          diameter={Const.Width-40} 
          initialDiameter={CicleDiameter} 
          speed={20} 
          duration={1200} 
          pulseStyle={{borderColor : "#18a0fb",borderWidth : 2, }}
        />
        <View style={styles.MainChargerCicle}>
            <Image  
              source={require("../../../assets/images/icons/charger_with_gradient.png")} 
              style={{width:55, height:55, resizeMode:"contain", tintColor : Colors.primaryBlue}} 
            /> 
            <CountDown 
              duration={12000000}
              up={false}
              alarm={false}
            />
        </View>
      </View>
      <View style={{flex:1, justifyContent : "center", alignItems:"center", flexDirection:"row",}}>
        <Text  style={{color: Colors.primaryWhite, fontSize:22, lineHeight:36}}>5.30 / </Text>
        <Text  style={{color: Colors.primaryBlue, fontSize:16}}>20 {hook.t("gel")}</Text>
      </View>

      <View style={{flex:0,justifyContent:"flex-end"}}>
        <TouchableOpacity   onPress={() => hook.navigation.navigate("MainDrawer")}  style={{marginVertical: 16, alignItems:"center"}}>
          <Text  style={{color: Colors.primaryGreen, fontSize:13}}>{hook.t("charging.chargeAnotherCar")}</Text>
        </TouchableOpacity>
        <BaseButton
          onPress={hook.onFinish}
          text={"charging.finish"}
          style={{marginTop: 16, marginVertical:16, marginHorizontal:0, alignSelf:"center", width : Const.Width-88}}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground
  },
  infoLinearGradient : {
    paddingHorizontal:48,
    paddingVertical:48,
    marginHorizontal:44,
    borderRadius:10,
    marginBottom:24,
    justifyContent:"center",
    alignItems:"center"
  },
  MainChargerCicleContainer : {
    position:"relative", 
    flex:2, 
    alignItems:"center", 
    justifyContent:"center",
    marginVertical:32
  },
  MainChargerCicle : {
    position:"absolute", 
    alignSelf:"center",
    width:CicleDiameter, 
    height: CicleDiameter, 
    minHeight:CicleDiameter,
    borderRadius : CicleDiameter/2,
    backgroundColor: Colors.primaryBackground,
    borderWidth:4,
    borderColor:"#18a0fb",
    justifyContent:"center",
    alignItems:"center"
  },
  infoText : {
    lineHeight:18,
    fontSize:13, 
    letterSpacing:0.21, 
    color:"white",
    textAlign:"center"
  }
});
