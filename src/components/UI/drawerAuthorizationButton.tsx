import React, {useRef} from 'react';
import { StyleSheet, ScrollView,Text,  View, TouchableOpacity, Image, Alert} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Const, Colors } from '../../../src/utils';
import { isIphoneX } from 'react-native-iphone-x-helper';


const styles = StyleSheet.create({
  container : {
    width: Const.Width - 48, 
    height:  44,
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center",
    position: "absolute",
    elevation:1,
    backgroundColor:"#008AEE",
    marginHorizontal:24,
    marginTop : isIphoneX ? 46 : 16
  },
});

const onMapRoundButton = ({onPress, style, image, imageStyle} : any) => {


  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {Alert.alert("sadfasd")}}
        style={{flexDirection : "row", justifyContent:"center", alignItems:"center", flex:1}}
      >
        <Text style={{ color : Colors.primaryWhite, fontSize :15, lineHeight : 24,fontWeight:"bold", marginLeft : 4 }}>{t("home.authorization")}</Text>
        <Image  source={require("../../../assets/images/icons/user.png")}   style={{width:18, height:18, resizeMode:"contain"}}/>
      </TouchableOpacity>
  </View>
  );
};


export default onMapRoundButton;
