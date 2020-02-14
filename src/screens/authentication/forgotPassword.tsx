import React from 'react'
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native'
import {Colors} from 'utils'
import {BaseHeader, BaseButton, PhoneNumberInput, ReceiveCode} from 'components'
import {useForgotPassword} from 'hooks'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useSafeArea} from 'react-native-safe-area-context'

const forgotPassword = ({navigation}: any) => {
  const hook = useForgotPassword(navigation)
  const insets = useSafeArea()

  
  return (
    <View style={[styles.container, {paddingBottom: insets.bottom + 16}]}>
      <BaseHeader
        onPressLeft={navigation.navigate.bind(forgotPassword, 'Auth')}
        title={'authentication.forgotPasswordPage.recoverPassword'}
      />
      <KeyboardAwareScrollView
        style={{flex: 0, paddingHorizontal: 16, marginVertical: 16}}
        contentContainerStyle={{justifyContent: 'flex-start', flex: 0}}
        keyboardShouldPersistTaps={'handled'}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}>
        <PhoneNumberInput
          onSubmit={hook.phoneInputSubmit}
          ref={hook.phoneRef}
          _this={hook._this}
          codeRef={hook.codeRef}
        />
        <ReceiveCode
          ref={hook.codeRef}
          onChangeText={hook.codeTextHandler}
          onSubmit={hook.codeReceiveHandler}
          startCodeAnimation={hook.startCodeAnimation}
          recieveCode={hook.codeReceiveHandler}
        />
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior={'padding'}
        style={{}}
        contentContainerStyle={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 41}>
        <BaseButton
          onPress={hook.onButtonClick}
          text={'enter'}
          image={require('../../../assets/images/icons/arrow_right.png')}
          style={{marginTop: 0}}
          imageStyle={{width: 21, height: 21}}
        />
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Colors.primaryBackground,
  },
})

export default forgotPassword
