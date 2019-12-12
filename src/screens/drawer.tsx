import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import Btn from '../components/UI/homeAuthorizationButton';

const App = () => {


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Btn />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11222D',
  },
});

export default App;
