import React, {ReactElement} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native'
import {Colors} from 'utils'
import {BaseHeader, BaseButton, PhoneNumberInput, ReceiveCode} from 'components'
import {useForgotPassword} from 'hooks'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useSafeArea} from 'react-native-safe-area-context'
import {ScreenPropsWithNavigation} from 'allTypes'
import Imgs from '../../../assets/images'

const ForgotPassword = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const hook = useForgotPassword(navigation)
  const insets = useSafeArea()

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom + 16}]}>
      <BaseHeader
        onPressLeft={navigation.navigate.bind(ForgotPassword, 'Auth')}
        title={'authentication.forgotPasswordPage.recoverPassword'}
      />
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView}
        contentContainerStyle={styles.keyboardAwareScrollViewContentContainer}
        keyboardShouldPersistTaps={'handled'}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}>
        <PhoneNumberInput
          onSubmit={hook.phoneNumber.inputSubmit}
          ref={hook.phoneRef}
          _this={hook._this}
          codeRef={hook.codeRef}
        />
        <ReceiveCode
          ref={hook.codeRef}
          onChangeText={hook.receiveCode.textHandler}
          onSubmit={hook.receiveCode.receiveHandler}
          receiveCode={hook.receiveCode.receiveHandler}
        />
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior={'padding'}
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 41}>
        <BaseButton
          onPress={hook.onButtonClick}
          text={'enter'}
          image={Imgs.arrowRight}
          style={styles.baseButton}
          imageStyle={styles.baseButtonImageStyle}
        />
      </KeyboardAvoidingView>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Colors.primaryBackground,
  },
  keyboardAwareScrollView: {
    flex: 0,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  keyboardAwareScrollViewContentContainer: {
    justifyContent: 'flex-start',
    flex: 0,
  },
  keyboardAvoidingViewContentContainer: {
    flex: 1,
  },
  baseButton: {
    marginTop: 0,
  },
  baseButtonImageStyle: {
    width: 21,
    height: 21,
  },
})
