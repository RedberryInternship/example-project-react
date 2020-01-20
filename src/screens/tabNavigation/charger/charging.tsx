import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { BaseHeader,BaseButton, Pulse, CountDown  } from '../../../../src/components';
import { Const, Colors, Defaults } from '../../../../src/utils';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeArea } from 'react-native-safe-area-context';

const CicleDiameter = Const.Width-150

const charging = ({navigation} : any) => {
  
  const {t} = useTranslation() 
  const insets = useSafeArea();


  const onFinish= () =>{
    Defaults.modal.current?.customUpdate(
      true, 
      {type:3, subType : 1, data : 
        {
          title : "popup.thankYou",
          description : "popup.automobileChargingFinished",
          bottomDescription : "popup.finishedChargingOfAutomobile",
          price: 22
        },
        onCloseClick : navigation.navigate.bind(charging,"MainDrawer")
      }
    )

  }
  return (
    <View style={[styles.container, {paddingBottom : insets.bottom + 16}]} >
      <BaseHeader 
        onPressLeft={navigation.navigate.bind(charging,"MainDrawer")}
        title={"charging.charge"}
      />
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
              source={require("../../../../assets/images/icons/charger_with_gradient.png")} 
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
        <Text  style={{color: Colors.primaryBlue, fontSize:16}}>20 {t("gel")}</Text>
      </View>

      <View style={{flex:0,justifyContent:"flex-end"}}>
        <TouchableOpacity   onPress={navigation.navigate.bind(charging,"")}  style={{marginVertical: 16, alignItems:"center"}}>
          <Text  style={{color: Colors.primaryGreen, fontSize:13}}>{t("charging.chargeAnotherCar")}</Text>
        </TouchableOpacity>
        <BaseButton
          onPress={onFinish.bind(charging)}
          text={"charging.finish"}
          style={{marginTop: 16, marginVertical:16, marginHorizontal:0, alignSelf:"center", width : Const.Width-88}}
        />
      </View>

      
    </View>
  );
};

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
    borderWidth:3,
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

export default charging;
