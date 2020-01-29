
import React, {useContext} from 'react';
import { withNavigation} from 'react-navigation';
import { OnMapRoundButton, HomeFilterView, BaseButton, HomeMainInputView, MultiChargingTopModal } from '..';
import { Defaults } from '../../../src/utils';
import { HomeContext } from '../../../src/screens/tabNavigation/home';
import {  View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';


const App = ({navigation} :any) => {
  const insets = useSafeArea();

  const context : any = useContext(HomeContext)
  return (
    <View style={{position:"relative", flex:1, paddingTop : insets.top,}} pointerEvents={"box-none"} >
      
        
      {
        Defaults.token ?
          null
        :
        <BaseButton 
          image={require("../../../assets/images/icons/user.png")}
          onPress={navigation.navigate.bind(App, "Auth")}
          text={'home.authorization'}
          style={{marginTop: 12 }}
        />

      }
      <View  style={{zIndex:44, elevation:12,height:100}} pointerEvents={"box-none"}>
        <OnMapRoundButton  
          style={{ backgroundColor:"#FFFFFF", width:38, height:38, borderRadius : 19, position : "absolute", marginTop : 60, right : 24, alignSelf : "flex-end"}} 
          onPress={context.state.LocationRequestFunc} 
          image={context.state.locationImageType}
          imageStyle={{width:24,height:24}}
        />
        <HomeMainInputView/>
      </View>
      
      <View style={{flex:1}} pointerEvents={"box-none"}>
        <OnMapRoundButton  
          style={{right:24, bottom: 138, backgroundColor:"#FFFFFF"}} 
          onPress={Defaults.modal.current && Defaults.modal.current.customUpdate.bind(App, true, {type:2})} 
          image={require('../../../assets/images/icons/ic_alert-circle.png')}
        />
        <HomeFilterView />
      </View>

      <MultiChargingTopModal
      />
    </View>
  );
};


export default withNavigation(App);
