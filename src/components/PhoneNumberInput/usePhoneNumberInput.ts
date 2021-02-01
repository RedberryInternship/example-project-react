import {
  useEffect,
  useState,
  useCallback,
} from 'react'
import { Animated } from 'react-native'
import { remoteLogger } from 'utils/inform'
import services from 'services'
import { phoneNumberPlaceHolder } from 'utils/const'
import { PhoneCountryCode } from 'types'
import {
  PhoneNumberInputProps,
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
) => {
  const [animation] = useState(new Animated.Value(0))
  const [selectedCountryCode, setSelectedCountryCode] = useState(phoneNumberPlaceHolder)
  const [pickerItemsState, setPickerItemsState] = useState<string[]>([])
  const [pickerItemsLabel, setPickerItemsLabel] = useState<string[]>([])

  const fetchPhoneCountryCodes = useCallback(async (): Promise<void> => {
    if (pickerItemsState.length === 0) {
      try {
        const { data } = await services.getPhoneCountryCodes()
        const pickerItems = data
          .filter((value: PhoneCountryCode) => !!value.phone_code.trim())
          .map(({ phone_code, country_code }: PhoneCountryCode) => {
            const code = phone_code.charAt(0) !== '+'
              ? `+${phone_code}`
              : phone_code

            return {
              code,
              label: country_code,
            }
          })
          .filter((value, index, self) => self.findIndex((el) => el.code === value.code) === index)

        const values = pickerItems.map(({ code }) => code)
        const labels = pickerItems.map(({ label }) => label)

        const georgianAtTopPickerItems = ['+995', ...values.filter((el) => el !== '+995')]
        const georgianAtTopPickerLabels = ['GE', ...labels.filter((el) => el !== 'GE')]
        setPickerItemsState(georgianAtTopPickerItems)
        setPickerItemsLabel(georgianAtTopPickerLabels)
      } catch (error) {
        remoteLogger(error)
      }
    }
  }, [pickerItemsState.length])

  useEffect(() => {
    fetchPhoneCountryCodes()
  }, [fetchPhoneCountryCodes])

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
      codeRef && codeRef.current && codeRef.current.activateButton()
      onChangeText(selectedCountryCode.value + text)
    } else {
      onChangeText('')
      codeRef && codeRef.current && codeRef.current.disableActivateButton()
    }
  }

  const onPickerChange = (val: string): void => {
    if (value?.slice(0, selectedCountryCode.value.length) === selectedCountryCode.value) {
      value = value.replace(selectedCountryCode.value, '')
    }

    onChangeText(val + (value ?? ''))
    setSelectedCountryCode({ label: val, value: val })
  }

  const imageAnimatedOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  const inputPlaceholder: string = selectedCountryCode.value === '+995' ? '5XX XX XX XX' : ''

  return {
    imageAnimatedOpacity,
    selectedCountryCode,
    inputPlaceholder,
    pickerItemsState,
    pickerItemsLabel,
    phoneTextHandler,
    onPickerChange,
    animation,
    onChange,
    onSubmit,
    style,
  }
}

export default usePhoneNumberInput
