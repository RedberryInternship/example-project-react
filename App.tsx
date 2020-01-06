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


console.disableYellowBox = true;

const App = () => {

  const root = useRoot();
 
  return useMemo (()=>(
    <View style={{backgroundColor :Colors.primaryBackground, flex:1}}>
      <StatusBar barStyle="light-content" />
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
    </View>
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
