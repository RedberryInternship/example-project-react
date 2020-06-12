import React, {ReactElement} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {ScreenPropsWithNavigation} from 'allTypes'

import {BaseHeader, BaseButton, PhoneVerificationView} from 'components'
import {Colors} from 'utils'
import images from 'assets/images'
import useForgotPassword from './useForgotPassword'

const ForgotPassword = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const {handleSubmit, onButtonClick, ...hook} = useForgotPassword(navigation)
  const insets = useSafeAreaInsets()

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
        automaticallyAdjustContentInsets={false}
      >
        <PhoneVerificationView {...hook} />
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior={'padding'}
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 41}
      >
        <BaseButton
          onPress={handleSubmit(onButtonClick)}
          text={'enter'}
          image={images.arrowRight}
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
