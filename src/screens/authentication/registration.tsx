import React, { useContext  } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { Colors } from '../../../src/utils';
import { BaseHeader,  BaseButton, RegistrationPagination, PhoneNumberView, UserInfoView, PasswordView, CardAddView } from '../../../src/components';
import { useRegistrationHook } from '../../../src/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppContext } from '../../../App';
import { useSafeArea } from 'react-native-safe-area-context';


const registration = ({navigation} : any) => {
  
  const {dispatch} = useContext(AppContext)
  const insets = useSafeArea();

  const hook = useRegistrationHook(navigation, dispatch);
  
  const pages = [
    <PhoneNumberView 
      _this={hook.regStep1._this}
      startCodeAnimation={hook.startCodeAnimation}
      phoneInputSubmit={hook.regStep1.phoneInputSubmit}
      codeRef={hook.regStep1.codeRef}
      hook={hook.regStep1}
      key={1}
      activePage={hook.activePage}
    />,
    <UserInfoView 
      _this={hook.regStep2._this}
      hook={hook.regStep2}
      key={2}
      activePage={hook.activePage}
    />,
    <PasswordView
      _this={hook.regStep3._this}
      hook={hook.regStep3}
      key={3}
      activePage={hook.activePage}
    />,
    <CardAddView
      _this={hook._this}
      key={4}
      activePage={hook.activePage}
    />
  ]
  return (
    <View style={[styles.container,{paddingBottom : insets.bottom}]}>
      <BaseHeader 
        onPressLeft={navigation.navigate.bind(registration, "Auth")}
        title={"authentication.registration.registration"}
        titleRight={"authentication.registration.skip"}
        onPressRight={hook.activePage === 3 ? hook.headerRightClick : undefined }
      />
      <RegistrationPagination
        paginationClickHandler={hook.paginationClickHandler}
        activePage={hook.activePage}
      />
      <KeyboardAwareScrollView
        style={{flex:0, marginVertical:16}}
        contentContainerStyle={{justifyContent:"flex-start",flex:0}}
        keyboardShouldPersistTaps={"handled"}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={true}
        resetScrollToCoords={{x:0,y:0}}
        extraHeight={Platform.select({ios : -500, android:0})}
        ref={hook.KeyboardAwareScrollViewRef}
      >
        <FlatList
          pagingEnabled={true}  
          style={{flex:0,flexGrow:1}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow:1, flex:0}}
          ref={hook.flatListRef}
          keyboardShouldPersistTaps={"handled"}
          scrollEnabled={false}
          data={pages}
          renderItem={({item})=>item}
        />
          
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView behavior={"padding"} style={{}} contentContainerStyle={{flex:1, }} keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 41}>
        <BaseButton
          onPress={hook.registrationStepHandler}
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

export default registration;
