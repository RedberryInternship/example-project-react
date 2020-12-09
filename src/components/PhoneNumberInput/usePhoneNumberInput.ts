import {
  useEffect,
  useState,
  useRef,
} from 'react'
import { Platform, Animated } from 'react-native'
import { Item } from 'react-native-picker-select'
import { DisplayDropdownWithError, remoteLogger } from 'helpers/inform'
import services from 'services'
import { phoneNumberPlaceHolder } from 'utils/const'
import { PhoneCountryCode } from 'allTypes'
import {
  PhoneNumberInputProps,
  Reference,
} from './types'

const usePhoneNumberInput = (
  {
    onChangeText,
    onSubmit,
    codeRef,
    onBlur,
    onFocus,
    style,
    value,
  }: PhoneNumberInputProps,
  ref: Reference,
) => {
  const [animation] = useState(new Animated.Value(0))
  const pickerRef = useRef(null)
  const [selectedCountryCode, setSelectedCountryCode] = useState(phoneNumberPlaceHolder)
  const [pickerItemsState, setPickerItemsState] = useState<Item[]>([])

  useEffect(() => {
    fetchPhoneCountryCodes()
  }, [])

  const onChange = (show = true): void => {
    show ? onFocus && onFocus() : onBlur && onBlur()
    if (value !== '' && !show) {
      return
    }

    Animated.timing(animation, {
      toValue: show ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }

  const phoneTextHandler = (text: string): void => {
    if (text !== '') {
      console.log(['selectedCountryCode.value', selectedCountryCode.value])
      codeRef && codeRef.current && codeRef.current.activateButton()
      onChangeText(selectedCountryCode.value + text)
    } else {
      onChangeText('')
      codeRef && codeRef.current && codeRef.current.disableActivateButton()
    }
  }

  const fetchPhoneCountryCodes = async (): Promise<void> => {
    if (pickerItemsState.length === 0) {
      try {
        const { data } = await services.getPhoneCountryCodes()
        const pickerItems = data
          .filter((value: PhoneCountryCode) => !!value.phone_code)
          .map((value: PhoneCountryCode) => ({ value: value.phone_code, label: value.phone_code }))

        setPickerItemsState(pickerItems)
      } catch (error) {
        remoteLogger(error)
        DisplayDropdownWithError()
      }
    }
  }

  const onPickerDone = (): void => {
    ref?.current?.focus()
  }

  const onPickerChange = (val: string): void => {
    if (value?.slice(0, selectedCountryCode.value.length) === selectedCountryCode.value) {
      value = value.replace(selectedCountryCode.value, '')
    }

    onChangeText(val + (value ?? ''))
    setSelectedCountryCode({ label: val, value: val })
    if (Platform.OS === 'android') {
      ref?.current.focus()
    }
  }

  const imageAnimatedOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  const inputPlaceholder: string = selectedCountryCode.value === '+995' ? '5XX XX XX XX' : ''

  return {
    inputPlaceholder,
    imageAnimatedOpacity,
    pickerItemsState,
    phoneTextHandler,
    onPickerChange,
    onPickerDone,
    animation,
    onChange,
    onSubmit,
    pickerRef,
    style,
  }
}

export default usePhoneNumberInput
