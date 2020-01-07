import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native';
import { BaseHeader, ChargerDetailTopInfo, CurrentTariffs, TitleTopLeftContainer, ChargerTypesItem, BaseButton,  } from '../../../../src/components';
import { useCharger } from '../../../../src/hooks';
import {  Colors } from '../../../../src/utils';
import { SafeAreaView} from "react-navigation"


const Tarifs = [
  { address : "ადფასდფას ადფ  ად ასდფასდ ას დფ ასდფ ასდფ ასდფ ასდ ", code : "23423"},
  { address : "ადფასდფას ადფ  ად ასდფასდ ას დფ ასდფ ასდფ ასდფ ასდ ", code : "23423"},
  { address : "ადფასდფას ადფ  ად ასდფასდ ას დფ ასდფ ასდფ ასდფ ასდ ", code : "23423"},
  { address : "ადფასდფას ადფ  ად ასდფასდ ას დფ ასდფ ასდფ ასდფ ასდ ", code : "23423"},
  { address : "ადფასდფას ადფ  ად ასდფასდ ას დფ ასდფ ასდფ ასდფ ასდ ", code : "23423"},
]


const chargerDetail = ({navigation} : any) => {
  
  const hook = useCharger();

  return (
    <SafeAreaView style={styles.container} forceInset={{top:"never", bottom:"always"}}>
      <BaseHeader 
        onPressLeft={navigation.navigate.bind(chargerDetail,"MainDrawer")}
      />
      <ScrollView style={{paddingHorizontal:16,marginTop:8}} contentContainerStyle={{ paddingBottom:32}}>
          <ChargerDetailTopInfo
          
          />
          <CurrentTariffs 
            data={Tarifs}
          />
          <TitleTopLeftContainer 
            direction={"column"}
            title={"chargerDetail.connectors"}
            data={hook.chargerTypes()}
            onRenderItem={(val, index) =>(
              <ChargerTypesItem
                key={index}
                index={index+1}
                active={hook.activeChargerType === index}
                onPress={hook.setActiveChargerType.bind(chargerDetail ,index)}
                {...val}
              />
            )}
          />
          <TitleTopLeftContainer 
            direction={"row"}
            title={"chargerDetail.additionalServices"}
            data={hook.services}
            onRenderItem={(val, index) =>(
              <View key={index} style={{width:50, height:50, borderRadius:25, backgroundColor:"#4CD96433", alignItems:"center",justifyContent:"center",marginRight:8}}>
                <Image
                  source={val}  
                  style={{width:28, height:28, resizeMode:"contain", tintColor : Colors.primaryGreen}}
                />
              </View>
            )}
          />
      </ScrollView>
      <BaseButton
          onPress={navigation.navigate.bind(chargerDetail,"Charging")}
          text={"charger.turnOn"} 
          style={{marginTop: 0, marginVertical:16}}
          
          image={require("../../../../assets/images/icons/ic_charge.png")}
          imageStyle={{tintColor:"white"}}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground
  },
});

export default chargerDetail;
