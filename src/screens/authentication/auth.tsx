import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../../../src/utils';
import { BaseHeader, BaseInput, BaseButton, PhoneNumberInput } from '../../../src/components';
import { useAuthHook } from '../../../src/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppContext } from '../../../App';
import { useSafeArea } from 'react-native-safe-area-context';

const auth = ({navigation} : any) => {

  const {dispatch} =  useContext(AppContext)
  
  const insets = useSafeArea();

  const hook = useAuthHook(navigation, dispatch);

  return (
    <View style={[styles.container,{paddingBottom : insets.bottom + 16}]}>
      <BaseHeader 
        onPressLeft={navigation.navigate.bind(auth,"MainDrawer")}
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
        <PhoneNumberInput 
          onChangeText={hook.phoneTextHandler}
          onSubmit={hook.phoneInputSubmit}
          ref={hook.phoneRef}
          _this={hook._this}
        />

        <BaseInput
          image={require("../../../assets/images/icons/lock.png")}
          onChangeText={hook.passwordTextHandler}
          onSubmit={hook.passwordInputSubmit}
          ref={hook.passwordRef}
          returnKeyType={"send"}
          secure={true}
          testID={"emailInput"}
          title={"authentication.password"}
        />
        <TouchableOpacity onPress={navigation.navigate.bind(auth,"ForgotPassword")}  hitSlop={{top : 10, bottom : 10, left : 15, right :15}}>
          <Text style={{color : Colors.primaryGreen, fontSize:11}}>{hook.t("authentication.forgotPassword")}</Text>
        </TouchableOpacity>
        <View style={{marginVertical:48}}>
          <TouchableOpacity 
            onPress={navigation.navigate.bind(auth,"Registration")}
            style={{width:"100%", }}
            hitSlop={{top : 10, bottom : 10, left : 15, right :15}}
            >
            <Text style={{color : Colors.primaryGreen, fontSize:13, alignSelf:"center"}}>{hook.t("authentication.newRegistration")}</Text>
          </TouchableOpacity>
        </View> 
        
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView behavior={"padding"} style={{}} contentContainerStyle={{flex:1}} keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 41}>
        <BaseButton
          onPress={hook.buttonClickHandler}
          text={"authentication.authentication"} 
          style={{marginTop: 0}}
          
          image={require("../../../assets/images/icons/ic_alert-circle.png")}
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
  }
});

export default auth;
