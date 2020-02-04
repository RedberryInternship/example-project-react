import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native';
import { BaseHeader, ChargerDetailTopInfo, CurrentTariffs, TitleTopLeftContainer, ChargerTypesItem, BaseButton,  } from '../../../../src/components';
import { useChargerDetails } from '../../../../src/hooks';
import {  Colors } from '../../../../src/utils';
import { getLocaleText } from '../../../../src/utils/localization/localization';



function chargerDetail ({navigation} : any) {
  
  const hook = useChargerDetails(navigation);

  return (
    <View style={styles.container} >
      <BaseHeader 
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal:16,marginTop:8}} contentContainerStyle={{ paddingBottom:32}}>
          <ChargerDetailTopInfo
            chargerLocationDirectionPress={hook.chargerLocationDirectionHandler}
            showChargerLocationPress={hook.showChargerLocationHandler}
            favouritePress={hook.onFavoritePress}
            code={hook._this.current?.charger?.code}
            name={getLocaleText(hook._this.current?.charger?.name)}
            location={getLocaleText(hook._this.current?.charger?.location)}
            distance={hook.getDistance}
          />
          <CurrentTariffs 
            data={ hook._this.current?.charger?.charging_prices ?? [] }
          />
          <TitleTopLeftContainer 
            direction={"column"}
            title={"chargerDetail.connectors"}
            data={ hook._this.current?.charger?.connector_types ?? [] }
            onRenderItem={(val, index) =>(
              <ChargerTypesItem
                key={index}
                index={index+1}
                active={hook.activeChargerType === index}
                onPress={hook.setActiveChargerType.bind(chargerDetail ,index)}
                type={val.name}
                power={"34"}
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
        onPress={hook.mainButtonClickHandler}
        text={"charger.turnOn"} 
        style={{marginTop: 0, marginVertical:16, marginBottom:16}}
        image={require("../../../../assets/images/icons/ic_charge.png")}
        imageStyle={{tintColor:"white"}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground
  },
});

export default chargerDetail;
