import React, {
  useState,
  useImperativeHandle,
  useRef,
  RefObject,
  Ref,
} from 'react'
import {View, TextInput, Image, StyleSheet, TextInputProps} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors} from 'utils'
import {BaseInputProps} from 'allTypes'
import {BaseText} from 'components'

// eslint-disable-next-line react/display-name
const BaseInput = React.forwardRef(
  (
    {
      title,
      image,
      imageStyle,
      style,
      secure,
      errorText,
      paddingLeft,
      required,
      ...props
    }: BaseInputProps,
    ref: Ref<TextInputProps>,
  ) => {
    const {t} = useTranslation()
    return (
      <View style={styles.container}>
        <BaseText style={styles.title}>{t(title)}</BaseText>
        <View style={styles.innerContainer}>
          {image && (
            <Image
              source={image}
              style={[styles.inputImage, {...imageStyle}]}
              resizeMode="contain"
            />
          )}
          <TextInput
            placeholderTextColor={Colors.primaryWhite}
            {...props}
            allowFontScaling={false}
            ref={ref}
            secureTextEntry={secure || false}
            autoCorrect={false}
            editable={true}
            autoCapitalize={'none'}
            style={[
              styles.Input,
              style,
              {
                paddingLeft: image ? 50 : paddingLeft || 20,
                borderColor: errorText ? '#FF3B3B' : 'transparent',
              },
            ]}
          />
          {required && <BaseText style={styles.baseText}>*</BaseText>}
        </View>
        <BaseText style={[styles.errorText, {opacity: errorText ? 1 : 0}]}>
          {errorText ? t(errorText) : ' '}
        </BaseText>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginVertical: 16,
    marginBottom: 8,
  },
  innerContainer: {
    width: '100%',
    position: 'relative',
  },
  title: {
    flex: 0,
    width: '100%',
    fontSize: 13,
    color: Colors.primaryGray,
    marginBottom: 8,
  },
  Input: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 6,
    flex: 0,
    flexGrow: 1,
    width: '100%',
    color: Colors.primaryWhite,
    height: 48,
    borderWidth: 0.5,
  },
  inputImage: {
    width: 24,
    flex: -1,
    height: 24,
    position: 'absolute',
    left: 12.5,
    bottom: 12.5,
    zIndex: 22,
    alignSelf: 'center',
  },
  errorText: {
    flex: 0,
    width: '100%',
    fontSize: 13,
    color: '#FF3B3B',
    marginTop: 4,
  },
  baseText: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: 'white',
    fontSize: 18,
  },
})

export default BaseInput
