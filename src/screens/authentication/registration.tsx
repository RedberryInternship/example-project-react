import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from 'react-native';
import { Colors } from '../../../src/utils';
import { BaseHeader, BaseInput, BaseButton } from '../../../src/components';
import { useAuthHook } from '../../../src/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';


const registration = ({navigation} : any) => {
  
  const hook = useAuthHook();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <BaseHeader 
        onPressLeft={navigation.navigate.bind(registration, "Auth")}
        title={"authentication.authentication"}
      />
      <KeyboardAwareScrollView
        style={{flex:1, marginVertical:16}}
        contentContainerStyle={{justifyContent:"flex-start",flex:1}}
        keyboardShouldPersistTaps={"handled"}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={true}
        resetScrollToCoords={{x:0,y:0}}
      >
        <FlatList
          pagingEnabled={true}  
          style={{flex:0,flexGrow:1}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow:1, flex:0}}
          data={["blue","red","blue"]}
          renderItem={({item})=>(
            <View style={{width:"100%", backgroundColor:item}}>
            </View>
          )}
        />
          

      </KeyboardAwareScrollView>
      <KeyboardAvoidingView behavior={"padding"} style={{}} contentContainerStyle={{flex:1, }} keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 41}>
        <BaseButton
          onPress={()=>{Alert.alert("asdf")}}
          text={"authentication.authentication"} 
          image={require("../../../assets/images/icons/ic_alert-circle.png")}
          style={{marginTop:0}}
        />
      </KeyboardAvoidingView>
      <SafeAreaView/>

      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Colors.primaryBackground  
  },
});

export default registration;
