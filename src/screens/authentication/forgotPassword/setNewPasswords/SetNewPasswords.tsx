import React from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  PasswordConfirmationView,
  BaseHeader,
  BaseButton,
} from 'components'
import { Colors } from 'utils'
import images from 'assets/images'
import { useNavigation } from '@react-navigation/native'
import useSetNewPassword from './useSetNewPassword'

const SetNewPasswords = () => {
  const { goBack } = useNavigation()
  const {
    control,
    onClickSubmitButton,
    handleSubmit,
    watch,
    errors,
  } = useSetNewPassword()

  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      <BaseHeader
        onPressLeft={goBack}
        title="authentication.forgotPasswordPage.recoverPassword"
      />
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView}
        contentContainerStyle={styles.keyboardAwareScrollViewContentContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
      >
        <PasswordConfirmationView
          errors={errors}
          watch={watch}
          control={control}
        />
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 41}
      >
        <BaseButton
          onPress={handleSubmit(onClickSubmitButton)}
          text="enter"
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
