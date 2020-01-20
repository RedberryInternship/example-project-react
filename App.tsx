import React, {useMemo, createContext, useReducer, Dispatch} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { Navigation } from './src';
import { useRoot, initialState, rootReducer } from './src/hooks';
import { Defaults, Colors } from './src/utils';
import './src/utils/style';
import { CustomModal } from './src/components';
import DropdownAlert from 'react-native-dropdownalert';
import {SafeAreaProvider} from "react-native-safe-area-context"


console.disableYellowBox = true;

if(__DEV__){

}
else {
  console.log = () =>{}
}
export const AppContext = createContext();

const App = () => {
  const hook = useRoot();
  StatusBar.setBackgroundColor( "transparent", true)
  StatusBar.setTranslucent( true)
  return useMemo (()=>(
    <SafeAreaProvider >
      <AppContext.Provider value={{state :  hook.state, dispatch : hook.dispatch }} >
        <Navigation
          onNavigationStateChange={() => {}}
          ref={(ref) => hook.setNavigationTopLevelElement(ref) }
          screenProps={{
            t : hook.t
          }}
        />
      </AppContext.Provider>
      <StatusBar barStyle="light-content"  />
      
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
  ),[hook.appReady, hook.locale]);
};

export default App;
