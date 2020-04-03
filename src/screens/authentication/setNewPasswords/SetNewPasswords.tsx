import React, {ReactElement} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useSafeArea} from 'react-native-safe-area-context'

import {ScreenPropsWithNavigation} from 'allTypes'

import {BaseHeader, BaseInput, BaseButton} from 'components'
import {Colors} from 'utils'
import useSetNewPassword from './useSetNewPassword'
import images from 'assets/images'

const SetNewPasswords = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const hook = useSetNewPassword(navigation)
  const insets = useSafeArea()

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom + 16}]}>
      <BaseHeader
        onPressLeft={navigation.goBack}
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
        <BaseInput
          image={images.lock}
          onChangeText={hook.newPassword.textHandler}
          onSubmit={hook.newPassword.onSubmit}
          ref={hook.newPasswordRef}
          secure={true}
          testID={'emailInput'}
          title={'authentication.forgotPasswordPage.newPassword'}
        />
        <BaseInput
          image={images.lock}
          onChangeText={hook.repeatPassword.textHandler}
          onSubmit={hook.repeatPassword.onSubmit}
          ref={hook.repeatPasswordRef}
          secure={true}
          testID={'emailInput'}
          title={'authentication.forgotPasswordPage.repeatPassword'}
        />
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior={'padding'}
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 41}>
        <BaseButton
          onPress={hook.onClickSubmitButton}
          text={'enter'}
          image={images.lock}
          style={styles.baseButton}
          imageStyle={styles.baseButtonImageStyle}
        />
      </KeyboardAvoidingView>
    </View>
  )
}

export default SetNewPasswords

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
