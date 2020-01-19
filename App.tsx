import React, {useMemo, createContext, useReducer, Dispatch} from 'react';
import {
  SafeAreaView,
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

export const AppContext = createContext();

const App = () => {

  const root = useRoot();
  const [state, dispatch] = useReducer(rootReducer, initialState)
 
  return useMemo (()=>(
    <SafeAreaProvider >
      <AppContext.Provider value={{state, dispatch }} >
        <Navigation
          onNavigationStateChange={() => {}}
          ref={(ref) => root.setNavigationTopLevelElement(ref) }
          screenProps={{
            t : root.t
          }}
        />
      </AppContext.Provider>
      <StatusBar barStyle="light-content" />
      
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

export default App;
