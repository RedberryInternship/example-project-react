import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../../../src/utils';
import { BaseHeader, BaseInput, BaseButton, } from '../../../src/components';
import { useSetNewPasswords } from '../../../src/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeArea } from 'react-native-safe-area-context';

const forgotPassword = ({navigation} : any) => {
  
  const hook = useSetNewPasswords();
  const insets = useSafeArea();
 
  return (
    <View style={[styles.container,{paddingBottom : insets.bottom + 16}]}>
      <BaseHeader 
        onPressLeft={()=> navigation.goBack()}
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
      >
        <BaseInput
          image={require("../../../assets/images/icons/lock.png")}
          keyboardType={"email-address"}
          onChangeText={hook.newPasswordTextHandler}
          onSubmit={hook.newPasswordInputSubmit}
          value={hook._this.current.newPassword}
          ref={hook.newPasswordRef}
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
          ref={hook.repeatPasswordRef}
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
