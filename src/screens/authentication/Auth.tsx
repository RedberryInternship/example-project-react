import React, {useContext, ReactElement} from 'react'
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Colors} from 'utils'
import {BaseHeader, BaseInput, BaseButton, PhoneNumberInput} from 'components'
import {useAuthHook} from 'hooks'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useSafeArea} from 'react-native-safe-area-context'
import {AppContext} from '../../../App'
import {ScreenPropsWithNavigation} from 'allTypes'
import Imgs from '../../../assets/images'

const Auth = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const {dispatch} = useContext(AppContext)

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
        <PhoneNumberInput
          onChangeText={hook.phoneNumber.textHandler}
          onSubmit={hook.phoneNumber.inputSubmit}
          ref={hook.phoneRef}
          _this={hook.This}
        />

        <BaseInput
          image={Imgs.lock}
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
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 41}>
        <BaseButton
          onPress={hook.buttonClickHandler}
          text={'authentication.authentication'}
          style={styles.baseButton}
          image={Imgs.alertCircle2}
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
    marginVertical: 16,
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
  },
})

export default Auth
