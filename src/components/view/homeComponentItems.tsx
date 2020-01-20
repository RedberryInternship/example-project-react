
import React, {useContext} from 'react';
import { withNavigation, SafeAreaView} from 'react-navigation';
import { OnMapRoundButton, HomeFilterView, BaseButton, HomeMainInputView } from '..';
import { Defaults, Const } from '../../../src/utils';
import { HomeContext } from '../../../src/screens/tabNavigation/home';
import { Platform, View, StatusBar } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';


const App = ({navigation} :any) => {
  const insets = useSafeArea();

  const context : any = useContext(HomeContext)
  return (
    <View style={{position:"relative", flex:1, paddingTop : insets.top,}} pointerEvents={"box-none"} >
        {/* <View style={{position : "absolute", top : 0,width: "100%", height:"100%", }} pointerEvents={"box-none"}> */}

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

          <HomeMainInputView
          />
          <View style={{flex:1}} pointerEvents={"box-none"}>
            <OnMapRoundButton  
              style={{ backgroundColor:"#FFFFFF", width:38, height:38, borderRadius : 19, position : "relative", marginTop : 12, right : 24, alignSelf : "flex-end"}} 
              onPress={context.state.LocationRequestFunc} 
              image={context.state.locationImageType}
              imageStyle={{width:24,height:24}}
            />

            <OnMapRoundButton  
              style={{right:24, bottom: 138, backgroundColor:"#FFFFFF"}} 
              onPress={Defaults.modal.current && Defaults.modal.current.customUpdate.bind(App, true, {type:2})} 
              image={require('../../../assets/images/icons/ic_alert-circle.png')}
            />
            <HomeFilterView />
          </View>

        {/* </View> */}
      </View>
  );
};


export default withNavigation(App);
