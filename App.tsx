import React, {useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux';
import { Navigation } from './src';
import { useRoot } from './src/hooks';
import { Defaults } from './src/utils';
import './src/utils/style';
import { CustomModal } from './src/components';


console.disableYellowBox = true;

const App = () => {

  const root = useRoot();
 
  return useMemo (()=>(
    <>
      <StatusBar barStyle="dark-content" />
      <Navigation
        onNavigationStateChange={() => {}}
        ref={(ref) => root.setNavigationTopLevelElement(ref) }
        screenProps={{
          t : root.t
        }}
      />

      <CustomModal 
        ref={Defaults.modal}
      />
    </>
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
