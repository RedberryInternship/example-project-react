import React from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Controller } from 'react-hook-form'
import images from 'assets/images'
import { Colors } from 'utils'
import BaseHeader from 'components/BaseHeader'
import BaseInput from 'components/BaseInput'
import BaseButton from 'components/BaseButton'
import PhoneNumberInput from 'components/PhoneNumberInput'
import BaseText from 'components/BaseText'
import { FCWithNavigation } from 'types'
import useAuthHook from './useAuthHook'

const Auth: FCWithNavigation = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const {
    buttonClickHandler,
    handleSubmit,
    setValue,
    phoneRef,
    control,
    watch,
  } = useAuthHook(navigation)
  const { t } = useTranslation()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      <BaseHeader
        onPressLeft={() => navigation.navigate('MainDrawer')}
        title="authentication.authentication"
      />
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView}
        contentContainerStyle={styles.keyboardAwareScrollViewContentContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <PhoneNumberInput
          onChangeText={(text) => setValue('phone', text, true)}
          ref={phoneRef}
          value={watch('phone')}
        />
        <Controller
          as={BaseInput}
          name="password"
          rules={{ required: true }}
          control={control}
          onChange={(args) => args[0].nativeEvent.text}
          title="authentication.password"
          image={images.password}
          returnKeyType="send"
          secure
          testID="PasswordInput"
        />
        <TouchableOpacity
          onPress={navigation.navigate.bind(Auth, 'ForgotPassword')}
          hitSlop={styles.forgotPasswordTextContainer}
        >
          <BaseText style={styles.forgotPasswordText}>
            {t('authentication.forgotPassword')}
          </BaseText>
        </TouchableOpacity>
        <View style={styles.registrationView}>
          <BaseText style={styles.registrationQuestionText}>
            {t('authentication.newRegistration')}
          </BaseText>
          <TouchableOpacity
            onPress={navigation.navigate.bind(Auth, 'Registration')}
            style={styles.registrationTextContainer}
            hitSlop={styles.registrationTextContainerHitSlop}
            testID="RegisterButton"
          >
            <BaseText style={styles.registrationText}>
              {t('authentication.registration.registration')}
            </BaseText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? 16 : StatusBar.currentHeight
        }
      >
        <BaseButton
          onPress={handleSubmit(buttonClickHandler)}
          text="authentication.authentication"
          style={styles.baseButton}
          testID="AuthButton"
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
  keyboardAwareScrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  keyboardAwareScrollViewContentContainer: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  forgotPasswordTextContainer: {
    top: 10,
    bottom: 10,
    left: 15,
    right: 15,
  },
  forgotPasswordText: {
    color: Colors.primaryGreen,
    fontSize: 11,
  },
  registrationView: {
    marginVertical: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registrationTextContainer: {
    width: '100%',
    marginLeft: 5,
  },
  registrationTextContainerHitSlop: {
    top: 10,
    bottom: 10,
    left: 15,
    right: 15,
  },
  registrationQuestionText: {
    color: Colors.primaryGray,
    fontSize: 13,
    alignSelf: 'center',
  },
  registrationText: {
    color: Colors.primaryGreen,
    fontSize: 13,
    alignSelf: 'center',
  },
  keyboardAvoidingViewContentContainer: {
    flex: 1,
  },
  baseButton: {
    marginTop: 0,
    marginBottom: 0,
  },
})

export default Auth
