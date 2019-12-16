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
  Platform
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
        style={{flex:1,paddingHorizontal:16, marginVertical:16}}
        contentContainerStyle={{justifyContent:"flex-start",flex:1}}
        keyboardShouldPersistTaps={"handled"}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={true}
        resetScrollToCoords={{x:0,y:0}}
      >
        <View style={{flex:0, position:"relative"}}>
          <Image source={require("../../../assets/images/icons/phone.png")}  style={{width: 24,flex:-1, height: 24,position: 'absolute',left: 13,bottom: 30,zIndex:22,alignSelf:"center"}} resizeMode="contain"/>
          <BaseInput
            paddingLeft={50}
            keyboardType={"numeric"}
            onChangeText={hook.phoneTextHandler}
            onSubmit={hook.phoneInputSubmit}
            value={hook._this.current.text}
            onFocus={hook.onFocus}
            ref={hook.phoneRef}
            testID={"emailInput"}
            title={"authentication.number"}
          />
        </View>
        <BaseInput
          image={require("../../../assets/images/icons/lock.png")}
          keyboardType={"email-address"}
          onChangeText={hook.passwordTextHandler}
          onSubmit={hook.passwordInputSubmit}
          value={hook._this.current.text}
          onFocus={hook.onFocus}
          ref={hook.phoneRef}
          secure={true}
          testID={"emailInput"}
          title={"authentication.password"}
        />
        <TouchableOpacity onPress={()=>{}}>
          <Text style={{color : Colors.primaryGreen, fontSize:11}}>{hook.t("authentication.forgotPassword")}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>{}}
          style={{width:"100%", marginVertical:32, }}
        >
          <Text style={{color : Colors.primaryGreen, fontSize:13, alignSelf:"center"}}>{hook.t("authentication.newRegistration")}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView behavior={"padding"} style={{}} contentContainerStyle={{flex:1}} keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 41}>
        <SafeAreaView>
        <BaseButton
          onPress={()=>{Alert.alert("asdf")}}
          text={"authentication.authentication"} 
          image={require("../../../assets/images/icons/ic_alert-circle.png")}
        />
        </SafeAreaView>
        
      </KeyboardAvoidingView>
      
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
