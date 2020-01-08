import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { BaseInput, BaseHeader, BaseButton, ChargerItem, TitleTopLeftContainer } from '../../../components';
import { useCharger } from '../../../hooks';
import { Const, Colors } from '../../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ChargerWithCode = ({navigation} : any) => {
  
  const hook = useCharger();

  return (
    <View style={styles.container}>
      <BaseHeader 
        title={"charger.chargeWitchCode"}
      />
      <ScrollView style={{marginHorizontal:16,marginTop:8}}>
        <BaseInput
          image={require("../../../../assets/images/icons/lock.png")}
          keyboardType={"email-address"}
          onChangeText={hook.codeTextHandler}
          onSubmit={hook.codeInputSubmit}
          ref={hook.chargeWitchCode}
          testID={"codeSumit"}
          title={"charger.enterCode"}
        />
        <BaseButton
          onPress={navigation.navigate.bind(ChargerWithCode,"ChargerDetail")}
          text={"next"} 
          style={{marginTop: 24, marginHorizontal:0, alignSelf:"center", width: Const.Width - 32}}
          imageStyle={{tintColor:"white"}}
          image={require("../../../../assets/images/icons/arrow_right.png")}
        />

        <TouchableOpacity   onPress={navigation.navigate.bind(ChargerWithCode,"")}  style={{marginVertical: 16, alignItems:"center"}}>
          <Text  style={{color: Colors.primaryGreen, fontSize:13}}>{hook.t("charger.allChargerList")}</Text>
        </TouchableOpacity>
        <View style={{height:32}}/>

        <TitleTopLeftContainer
          title={"charger.lastUsed"}
          direction={"column"}
          data={hook.lastUsed()}
          onRenderItem={(val, ind) => (
            <ChargerItem 
              key={ind}
              onPress={() =>{}}
              address={val.address}
              code={val.code}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground
  },
});

export default ChargerWithCode;
