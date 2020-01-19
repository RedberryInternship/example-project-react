import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { BaseHeader, BaseButton,  } from '../../../../src/components';
import { Const, Colors } from '../../../../src/utils';
import { useTranslation } from 'react-i18next';



const chargerDetail = ({navigation} : any) => {
  
  const {t} = useTranslation() 
  return (
    <View style={styles.container}>
      <BaseHeader 
        onPressLeft={navigation.navigate.bind(chargerDetail,"MainDrawer")}
        title={"chooseChargeMethod.choose"}

      />
      <View style={{justifyContent:"space-between", flex:1}}>
        <Text  style={styles.topInfoText}>{t("chooseChargeMethod.chooseChargeMethod")}</Text>
        
        <View>
          <BaseButton
            onPress={navigation.navigate.bind(chargerDetail,"ChoosingCard",{type : 1})}
            text={"chooseChargeMethod.untilTurnOff"} 
            style={{marginTop: 0, marginVertical:16, marginHorizontal:0, alignSelf:"center", width : Const.Width-88}}
            
          />
          <Text  style={styles.orText}>{t("chooseChargeMethod.or")}</Text>

          <BaseButton
            onPress={navigation.navigate.bind(chargerDetail,"ChoosingCard",{type : 0})}
            text={"chooseChargeMethod.withEnteringPrice"} 
            style={{marginTop: 16, marginVertical:16, marginHorizontal:0, alignSelf:"center", width : Const.Width-88}}
          />
        </View>
        <View/>
       
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
  topInfoText : {
    color: Colors.primaryGray, 
    fontSize:13, 
    lineHeight:18,
    marginHorizontal:64,
    marginTop:16,
    textAlign:"center"
  },
  orText : {
    lineHeight:18,
    fontSize:13, 
    letterSpacing:0.21, 
    color:"white",
    textAlign:"center",
    
    
  }
});

export default chargerDetail;
