/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef, Ref} from 'react'
import {
  StyleSheet,
  View,
  Animated,
  Platform,
  TextInputProps,
  StyleProp,
} from 'react-native'
import {Item} from 'react-native-picker-select'

import {PhoneCountryCode, BaseInputRefProp} from 'allTypes'

import {BaseInput, BasePickerSelect} from 'components'
import images from 'assets/images'
import {Helpers, Colors} from 'utils'
import services from 'services'

type PhoneNumberInputProps = {
  onSubmit: () => void
  onBlur?: () => void
  onFocus?: () => void
  onChangeText: (text: string) => void
  style?: StyleProp<TextInputProps>
  errorText?: string
  codeRef?: any
  value?: string
}

const pickeritems: Item[] = []

const placeholder = {label: '+995', value: '+995'}

// eslint-disable-next-line react/display-name
const PhoneNumberInput = React.forwardRef(
  (
    {
      onSubmit,
      onBlur,
      onFocus,
      style,
      codeRef,
      onChangeText,
      value,
      ...props
    }: PhoneNumberInputProps,
    ref: Ref<TextInputProps & BaseInputRefProp>,
  ) => {
    const [animation] = useState(new Animated.Value(0))
    const pickerRef = useRef(null)
    const [showSelector, setShowSelector] = useState(false)
    const [selectedCountryCode, setSelectedCountryCode] = useState(placeholder)
    const [pickeritemsState, setPickeritemsState] = useState(pickeritems)

    useEffect(() => {
      fetchPhoneCountryCodes()
    }, [])

    const _onChange = (show = true): void => {
      show ? onFocus && onFocus() : onBlur && onBlur()
      if (value !== '' && !show) {
        return
      }

      setShowSelector(show)

      Animated.timing(animation, {
        toValue: show ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }).start()
    }

    const phoneTextHandler = (text: string): void => {
      if (text !== '') {
        codeRef && codeRef.current && codeRef.current.activateButton()
        onChangeText(selectedCountryCode.value + text)
      } else {
        onChangeText('')
        codeRef && codeRef.current && codeRef.current.disableActivateButton()
      }
    }

    const _onSubmit = (): void => {
      // onChangeText(selectedCountryCode.value + value)
      onSubmit()
    }

    const fetchPhoneCountryCodes = async (): Promise<void> => {
      if (pickeritemsState.length === 0) {
        try {
          const {data} = await services.getPhoneCountryCodes()

          data.forEach((val: PhoneCountryCode) => {
            if (val.phone_code)
              pickeritems.push({value: val.phone_code, label: val.phone_code})
          })
          setPickeritemsState(pickeritems)
        } catch (error) {
          Helpers.DisplayDropdownWithError()
        }
      }
    }

    const onPickerDone = (): void => {
      ref.current.focus()
    }

    const onPickerChange = (val: string): void => {
      console.log(value, 'value')

      if (
        value?.slice(0, selectedCountryCode.value.length) ===
        selectedCountryCode.value
      )
        value = value.replace(selectedCountryCode.value, '')

      console.log(value, 'value2')

      onChangeText(val + (value ?? ''))
      setSelectedCountryCode({label: val, value: val})
      if (Platform.OS == 'android') ref.current.focus()
    }

    const imageAnimatedOpacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })

    const inputPlaceholder: string =
      selectedCountryCode.value === '+995' ? '5XX XX XX XX' : ''

    return (
      <View style={styles.container}>
        <View pointerEvents={'none'} style={styles.imageContainer}>
          <Animated.Image
            source={images.phone}
            style={[styles.image, {opacity: imageAnimatedOpacity}]}
            resizeMode="contain"
          />
        </View>

        <BaseInput
          // paddingLeft={showSelector ? 64 : undefined}
          paddingLeft={64}
          style={style}
          keyboardType={'phone-pad'}
          onChangeText={phoneTextHandler}
          onSubmitEditing={_onSubmit}
          onFocus={(): void => _onChange()}
          onBlur={(): void => _onChange(false)}
          ref={ref}
          testID={'loginPhone'}
          title={'authentication.number'}
          returnKeyType={'send'}
          placeholder={inputPlaceholder}
          placeholderTextColor={Colors.primaryGray}
          {...props}
        />
        <Animated.View
          style={[styles.modalSelectorContainer, {opacity: animation}]}
        >
          <View style={styles.touchableStyle}>
            <BasePickerSelect
              onDone={onPickerDone}
              onChange={onPickerChange}
              items={pickeritemsState}
              placeholder={placeholder}
              ref={pickerRef}
            />
          </View>
        </Animated.View>
      </View>
    )
  },
)

export default PhoneNumberInput

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: 'relative',
  },
  modalSelectorContainer: {
    position: 'absolute',
    width: 53,
    height: 48,

    bottom: 28,
  },
  touchableStyle: {
    marginVertical: 4,
    borderRightWidth: 1,
    flex: 1,
    borderRightColor: '#9A99A255',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 24,
    flex: -1,
    height: 24,
    position: 'absolute',
    left: 13,
    top: 52,
    zIndex: 22,
  },
  image: {
    width: 24,
    height: 24,
  },
})
