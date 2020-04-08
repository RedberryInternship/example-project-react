import React, {ReactElement} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useSafeArea} from 'react-native-safe-area-context'
import {Controller} from 'react-hook-form'

import {ScreenPropsWithNavigation} from 'allTypes'

import {BaseHeader, BaseInput, BaseButton} from 'components'
import {Colors, InputValidationHelpers} from 'utils'
import useSetNewPassword from './useSetNewPassword'
import images from 'assets/images'

const SetNewPasswords = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const {control, onClickSubmitButton, handleSubmit, watch} = useSetNewPassword(
    navigation,
  )

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
        automaticallyAdjustContentInsets={false}
      >
        <Controller
          as={BaseInput}
          name="password"
          rules={{
            validate: InputValidationHelpers.passwordConfirmValidation(
              watch('repeatPassword'),
            ),
          }}
          control={control}
          onChange={(args) => args[0].nativeEvent.text}
          image={images.lock}
          testID={'passwordInput'}
          secure={true}
          title={'authentication.forgotPasswordPage.newPassword'}
        />
        <Controller
          as={BaseInput}
          name="repeatPassword"
          rules={{
            validate: InputValidationHelpers.passwordConfirmValidation(
              watch('password'),
            ),
          }}
          control={control}
          onChange={(args) => args[0].nativeEvent.text}
          image={images.lock}
          returnKeyType={'send'}
          testID={'RepeatpasswordInput'}
          secure={true}
          title={'authentication.forgotPasswordPage.repeatPassword'}
        />
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior={'padding'}
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 41}
      >
        <BaseButton
          onPress={handleSubmit(onClickSubmitButton)}
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
