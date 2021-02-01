import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import MaskedView from '@react-native-community/masked-view'
import { Colors } from 'utils'
import BaseText from 'components/BaseText'
import useReceiveCode from './useReceiveCode'

const receiveConfirmationCode = React.forwardRef(({ receiveCode, ...props }: any, ref: any) => {
  const {
    disabledInput,
    animation,
    disabled,
    inputRef,
    showText,
  } = useReceiveCode(ref)
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <BaseText style={styles.smsCodeText}>
        {t('authentication.forgotPasswordPage.smsCode')}
      </BaseText>
      <View style={styles.receiveCodeBtnContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={receiveCode}
          disabled={disabled}
          style={styles.receiveCodeBtnTouchable}
        >
          <Animated.View style={[styles.codeReceive, { width: animation }]} />
          <MaskedView
            style={styles.maskedView}
            maskElement={(
              <View style={styles.receiveCodeInnerView}>
                <Animated.Text style={[styles.codeReceiveText]}>
                  {t('authentication.forgotPasswordPage.receiveCode')}
                </Animated.Text>
              </View>
            )}
          >
            <Animated.View style={[styles.receiveCodeAnimatedView1, { width: animation }]} />
            <Animated.View style={styles.receiveCodeAnimatedView2} />
          </MaskedView>
        </TouchableOpacity>
        <TextInput
          style={styles.codeTextInput}
          onSubmitEditing={receiveCode}
          placeholderTextColor={Colors.primaryWhite}
          allowFontScaling={false}
          ref={inputRef}
          pointerEvents={disabledInput ? 'none' : 'auto'}
          keyboardType="number-pad"
          {...props}
        />
      </View>
      <Animated.Text style={styles.codeValidityText}>
        {showText && t('authentication.forgotPasswordPage.codeValidity')}
      </Animated.Text>
    </View>
  )
})

export default receiveConfirmationCode

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  codeReceive: {
    width: 128,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#072F46',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  codeReceiveText: {
    fontSize: 13,
    color: '#009AF0',
    letterSpacing: 0.2,
  },
  codeTextInput: {
    flex: 1,
    marginLeft: 12,
    borderRadius: 6,
    backgroundColor: Colors.primaryDark,
    flexGrow: 1,
    paddingHorizontal: 8,
    color: Colors.primaryWhite,
  },
  smsCodeText: {
    flex: 0,
    width: '100%',
    fontSize: 13,
    color: Colors.primaryGray,
    marginBottom: 8,
  },
  receiveCodeBtnContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryBackground,
    marginBottom: 8,
  },
  receiveCodeBtnTouchable: {
    position: 'relative',
    width: 128,
    height: 48,
    backgroundColor: '#879299',
    borderRadius: 6,
  },
  maskedView: {
    flexDirection: 'row',
    height: '100%',
  },
  receiveCodeInnerView: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  receiveCodeAnimatedView1: {
    flex: 0,
    height: '100%',
    backgroundColor: '#009AF0',
  },
  receiveCodeAnimatedView2: {
    flex: 1,
    height: '100%',
    backgroundColor: '#000000',
  },
  codeValidityText: {
    color: Colors.primaryGray,
    fontSize: 11,
  },
})
