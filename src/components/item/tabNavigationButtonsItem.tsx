import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';

const App = (props : any) => {
  return (
    <TouchableOpacity
        activeOpacity={0.6}
        hitSlop={{
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        }}
        onPress={props.navigate}>
          <Image  source = {props.image} style={{width:25,height:25, resizeMode:"contain", marginTop:10, tintColor : props.active ? "#008AEE" : "#9A99A2"}}/>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});

export default App;