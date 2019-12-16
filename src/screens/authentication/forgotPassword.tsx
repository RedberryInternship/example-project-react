import React from 'react';
import {
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
  TextInput,
  Animated
} from 'react-native';
import { Colors } from '../../../src/utils';
import { BaseHeader, BaseInput, BaseButton, PhoneNumberInput } from '../../../src/components';
import { useForgotPassword } from '../../../src/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {SafeAreaView} from "react-navigation"

const forgotPassword = ({navigation} : any) => {
  
  const hook = useForgotPassword();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <BaseHeader 
        onPressLeft={navigation.navigate.bind(forgotPassword, "Auth")}
        title={"authentication.forgotPasswordPage.recoverPassword"}
      />
      <KeyboardAwareScrollView
        style={{flex:1,paddingHorizontal:16, marginVertical:16}}
        contentContainerStyle={{justifyContent:"flex-start",flex:1}}
        keyboardShouldPersistTaps={"handled"}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        // enableResetScrollToCoords={true}
        // resetScrollToCoords={{x:0,y:0}}
      >
        <PhoneNumberInput 
          onChangeText={hook.phoneTextHandler}
          onSubmit={hook.phoneInputSubmit}
          value={hook._this.current.text}
          onFocus={hook.onFocus}
          ref={hook.phoneRef}
        />
        <View style={{flexDirection:"row", }}>
          <Animated.View style={{}}>
              <Text></Text>
          </Animated.View>
          <TextInput 
            
          
          />
        </View>
        <BaseInput
          image={require("../../../assets/images/icons/lock.png")}
          keyboardType={"email-address"}
          onChangeText={hook.newPasswordTextHandler}
          onSubmit={hook.newPasswordInputSubmit}
          value={hook._this.current.text}
          onFocus={hook.onFocus}
          ref={hook.phoneRef}
          secure={true}
          testID={"emailInput"}
          title={"authentication.forgotPasswordPage.newPassword"}
        />
        <BaseInput
          image={require("../../../assets/images/icons/lock.png")}
          keyboardType={"email-address"}
          onChangeText={hook.repeatPasswordTextHandler}
          onSubmit={hook.repeatPasswordInputSubmit}
          value={hook._this.current.text}
          onFocus={hook.onFocus}
          ref={hook.phoneRef}
          secure={true}
          testID={"emailInput"}
          title={"authentication.forgotPasswordPage.repeatPassword"}
        />
        
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView behavior={"padding"} style={{}} contentContainerStyle={{flex:1,}} keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 41}>
        <BaseButton
          onPress={()=>{Alert.alert("asdf")}}
          text={"authentication.authentication"} 
          image={require("../../../assets/images/icons/ic_alert-circle.png")}
          style={{marginTop: 0}}
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

export default forgotPassword;
