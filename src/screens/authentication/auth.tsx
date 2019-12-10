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

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>authentication</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});

export default App;
