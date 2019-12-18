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
import { Colors, Const } from '../../../src/utils';
import { BaseHeader, BaseInput, BaseButton, RegistrationPagination, PhoneNumberView, UserInfoView, PasswordView, CardAddView } from '../../../src/components';
import { useRegistrationHook } from '../../../src/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';


const registration = ({navigation} : any) => {
  
  const hook = useRegistrationHook();
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <BaseHeader 
        onPressLeft={navigation.navigate.bind(registration, "Auth")}
        title={"authentication.authentication"}
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
      >
        <FlatList
          pagingEnabled={true}  
          style={{flex:0,flexGrow:1}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow:1, flex:0}}
          ref={hook.flatListRef}
          scrollEnabled={false}
          data=
            {[<PhoneNumberView 
                _this={hook._this}
              />,
              <UserInfoView 
                _this={hook._this}
              />,
              <PasswordView
              _this={hook._this}
              />,
              <CardAddView
              _this={hook._this}
              />
          ]}
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

export default registration;
