import React, {useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux';
import { Navigation } from './src';
import { useRoot } from './src/hooks';

console.disableYellowBox = true;

const App = () => {

  const root = useRoot();


  return useMemo (()=>(
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
          <Navigation 
            onNavigationStateChange={() => {}}
            ref={(ref) => root.setNavigationTopLevelElement(ref) }
          />
      </Provider>
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
