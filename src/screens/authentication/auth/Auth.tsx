import React, {useContext, ReactElement} from 'react'
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useSafeArea} from 'react-native-safe-area-context'
import {useForm, Controller} from 'react-hook-form'

import {ScreenPropsWithNavigation} from 'allTypes'

import {AppContext} from '../../../../App'
import images from 'assets/images'
import {Colors} from 'utils'
import {BaseHeader, BaseInput, BaseButton, PhoneNumberInput} from 'components'
import useAuthHook from './useAuthHook'

const Auth = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const {dispatch} = useContext(AppContext)
  const {control, register, setValue, handleSubmit, errors} = useForm()

  const insets = useSafeArea()
  const hook = useAuthHook(navigation, dispatch)
  const {t} = useTranslation()

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom + 16}]}>
      <BaseHeader
        onPressLeft={navigation.navigate.bind(Auth, 'MainDrawer')}
        title={'authentication.authentication'}
      />
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView}
        contentContainerStyle={styles.keyboardAwareScrollViewContentContainer}
        keyboardShouldPersistTaps={'handled'}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={true}
        resetScrollToCoords={{x: 0, y: 0}}>
        {/* <Controller
          as={PhoneNumberInput}
          control={control}
          name="phone"
          onChange={args => args[0].nativeEvent.text}
          rules={{required: true}}
          defaultValue=""
          onSubmit={hook.phoneNumber.inputSubmit}
          _this={hook._this}
        /> */}
        <PhoneNumberInput
          onChangeText={hook.phoneNumber.textHandler}
          onSubmit={hook.phoneNumber.inputSubmit}
          ref={hook.phoneRef}
          _this={hook._this}
        />

        <BaseInput
          image={images.lock}
          onChangeText={hook.password.textHandler}
          onSubmit={hook.password.inputSubmit}
          ref={hook.passwordRef}
          returnKeyType={'send'}
          secure={true}
          testID={'emailInput'}
          title={'authentication.password'}
        />
        <TouchableOpacity
          onPress={navigation.navigate.bind(Auth, 'ForgotPassword')}
          hitSlop={styles.forgotPasswordTextContainer}>
          <Text style={styles.forgotPasswordText}>
            {t('authentication.forgotPassword')}
          </Text>
        </TouchableOpacity>
        <View style={styles.registrationView}>
          <TouchableOpacity
            onPress={navigation.navigate.bind(Auth, 'Registration')}
            style={styles.registrationTextContainer}
            hitSlop={styles.registrationTextContainerHitSlop}>
            <Text style={styles.registrationText}>
              {t('authentication.newRegistration')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior={'padding'}
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? 16 : StatusBar.currentHeight
        }>
        <BaseButton
          onPress={hook.buttonClickHandler}
          text={'authentication.authentication'}
          style={styles.baseButton}
          image={images.alertCircle2}
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
  },
  registrationTextContainer: {
    width: '100%',
  },
  registrationTextContainerHitSlop: {
    top: 10,
    bottom: 10,
    left: 15,
    right: 15,
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
