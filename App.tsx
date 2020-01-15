import React, {useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Navigation } from './src';
import { useRoot } from './src/hooks';
import { Defaults, Colors } from './src/utils';
import './src/utils/style';
import { CustomModal } from './src/components';
import DropdownAlert from 'react-native-dropdownalert';
import {SafeAreaProvider} from "react-native-safe-area-context"

console.disableYellowBox = true;

const App = () => {

  const root = useRoot();
 
  return useMemo (()=>(
    <SafeAreaProvider style={{backgroundColor :Colors.primaryBackground, flex:1}}>
      <StatusBar barStyle="light-content" />
      <Navigation
        onNavigationStateChange={() => {}}
        ref={(ref) => root.setNavigationTopLevelElement(ref) }
        screenProps={{
          t : root.t
        }}
      />
      <DropdownAlert
        // errorColor={Colors.errorColor}
        // infoColor={Colors.infoColor}
        // inactiveStatusBarBackgroundColor={"#fb634f"}
        ref={(ref)=> Defaults.dropdown= ref}
        testID={"dropdownAlert"}
        titleStyle={{fontSize:14, color : "white"}}
        imageStyle={{marginHorizontal: 8, alignSelf: "center", resizeMode:"contain"}}
      />    
      <CustomModal 
        ref={Defaults.modal}
      />
    </SafeAreaProvider>
  ),[root.appReady, root.locale]);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default App;
