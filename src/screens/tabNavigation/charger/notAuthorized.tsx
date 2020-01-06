import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { BaseHeader,BaseButton,  } from '../../../../src/components';
import { Const, Colors } from '../../../../src/utils';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';



const chargerDetail = ({navigation} : any) => {
  
  const {t} = useTranslation() 
  return (
    <View style={styles.container}>
      <BaseHeader 
        onPressLeft={navigation.navigate.bind(chargerDetail,"MainDrawer")}
        title={"charger.chargeWitchCode"}

      />
      <View style={{justifyContent:"center", flex:1}}>
        <LinearGradient colors={['#009AF033', '#1065E333']} style={styles.infoLinearGradient}>
          <Image  source={require("../../../../assets/images/icons/alert-circle.png")} style={{width:45, height:45, resizeMode:"contain", marginBottom:16}}/>
          <Text style={styles.infoText}>{t("notAuthorized.notAuthorizedText")}</Text>
        </LinearGradient>
        <BaseButton
            onPress={navigation.navigate.bind(chargerDetail,"Auth")}
            text={"home.authorization"} 
            style={{marginTop: 0, marginVertical:16, marginHorizontal:0, alignSelf:"center", width : Const.Width-88}}
            
            image={require("../../../../assets/images/icons/user.png")}
            imageStyle={{tintColor:"white"}}
          />
        <TouchableOpacity   onPress={navigation.navigate.bind(chargerDetail,"")}  style={{alignItems:"center"}}>
          <Text  style={{color: Colors.primaryGreen, fontSize:13}}>{t("charger.allChargerList")}</Text>
        </TouchableOpacity>
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
  infoText : {
    lineHeight:18,
    fontSize:13, 
    letterSpacing:0.21, 
    color:"white",
    textAlign:"center"
  }
});

export default chargerDetail;
