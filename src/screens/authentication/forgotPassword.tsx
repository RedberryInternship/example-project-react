import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
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
import { BaseHeader, BaseInput, BaseButton, PhoneNumberInput, ReceiveCode } from '../../../src/components';
import { useForgotPassword } from '../../../src/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {} from "react-navigation"
import colors from '../../../src/utils/colors';
import MaskedView from '@react-native-community/masked-view';

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
        style={{flex:0,paddingHorizontal:16, marginVertical:16}}
        contentContainerStyle={{justifyContent:"flex-start",flex:0}}
        keyboardShouldPersistTaps={"handled"}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        // enableResetScrollToCoords={true}
        // resetScrollToCoords={{x:0,y:0}}
      >
        <PhoneNumberInput 
          onChangeText={hook.phoneTextHandler}
          onSubmit={hook.phoneInputSubmit}
          value={hook._this.current.phone}
          onFocus={hook.onFocusPhone}
          ref={hook.phoneRef}
        />
        <ReceiveCode
          ref={hook.codeRef}
          onChangeText={hook.codeTextHandler}
          onSubmit={hook.codeInputSubmit}
        />
        
        <BaseInput
          image={require("../../../assets/images/icons/lock.png")}
          keyboardType={"email-address"}
          onChangeText={hook.newPasswordTextHandler}
          onSubmit={hook.newPasswordInputSubmit}
          value={hook._this.current.newPassword}
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
          value={hook._this.current.repeatPassword}
          ref={hook.phoneRef}
          secure={true}
          testID={"emailInput"}
          title={"authentication.forgotPasswordPage.repeatPassword"}
        />
        
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView behavior={"padding"} style={{}} contentContainerStyle={{flex:1,}} keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 41}>
        <BaseButton
          onPress={()=>{Alert.alert("asdf")}}
          text={"enter"} 
          image={require("../../../assets/images/icons/arrow_right.png")}
          style={{marginTop: 0}}
          imageStyle={{width:21, height:21}}
        />
      </KeyboardAvoidingView>
      <SafeAreaView style={{marginBottom:32}}/>
      
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
