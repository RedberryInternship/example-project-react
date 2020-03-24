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
import {Ajax, Defaults} from 'utils'
import {useTranslation} from 'react-i18next'
import {
  PhoneCountryCodesData,
  PhoneCountryCode,
  BaseInputRefProp,
} from 'allTypes'
import {Item} from 'react-native-picker-select'
import {BaseInput, BasePickerSelect} from 'components'
import Imgs from '../../../assets/images'

const pickeritems: Item[] = []

const placeholder = {label: '+995', value: '+995'}
type PhoneNumberInputProps = {
  _this: any
  onSubmit: () => void
  onBlur: () => void
  onFocus: () => void
  style: StyleProp<TextInputProps>
  errorText: string
  codeRef: any
}
// eslint-disable-next-line react/display-name
const PhoneNumberInput = React.forwardRef(
  (
    {
      _this,
      onSubmit,
      onBlur,
      onFocus,
      style,
      errorText,
      codeRef,
    }: PhoneNumberInputProps,
    ref: Ref<TextInputProps & BaseInputRefProp>,
  ) => {
    const [animation] = useState(new Animated.Value(0))
    const pickerRef = useRef(null)
    const [showSelector, setShowSelector] = useState(false)
    const [selectedCountryCode, setSelectedCountryCode] = useState(placeholder)
    const [pickeritemsState, setPickeritemsState] = useState(pickeritems)
    const {t} = useTranslation()

    useEffect(() => {
      fetchPhoneCountryCodes()
    }, [])

    const _onChange = (show = true): void => {
      show ? onFocus && onFocus() : onBlur && onBlur()

      if (_this.current && _this.current.phone !== '' && !show) {
        return
      }

      setShowSelector(show)

      Animated.timing(animation, {
        toValue: show ? 1 : 0,
        duration: 500,
      }).start()
    }

    const phoneTextHandler = (text: string): void => {
      if (text !== '') {
        codeRef && codeRef.current && codeRef.current.activateButton()
        _this.current.phone = selectedCountryCode.value + text
      } else {
        _this.current.phone = ''
        codeRef && codeRef.current && codeRef.current.disableActivateButton()
      }
    }

    const _onSubmit = (): void => {
      _this.current.phone = selectedCountryCode.value + _this.current.phone
      onSubmit()
    }

    const fetchPhoneCountryCodes = (): void => {
      if (pickeritemsState.length === 0) {
        Ajax.get('/phone-codes')
          .then(({data}: PhoneCountryCodesData) => {
            data.forEach((val: PhoneCountryCode) => {
              if (val.phone_code)
                pickeritems.push({value: val.phone_code, label: val.phone_code})
            })
            setPickeritemsState(pickeritems)
          })
          .catch(error => {
            Defaults.dropdown?.alertWithType(
              'success',
              t('dropDownAlert.registration.codeSentSuccessfully'),
            )
          })
      }
    }

    const onPickerDone = (): void => {
      ref.current.focus()
    }

    const onPickerChange = (val: string): void => {
      setSelectedCountryCode({label: val, value: val})
      // phoneTextHandler.bind(phoneNumberInput,'')
      if (Platform.OS == 'android') ref.current.focus()
    }

    const imageAnimatedOpacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })

    return (
      <View style={styles.container}>
        <View pointerEvents={'none'} style={styles.imageContainer}>
          <Animated.Image
            source={Imgs.phone}
            style={[styles.image, {opacity: imageAnimatedOpacity}]}
            resizeMode="contain"
          />
        </View>

        <BaseInput
          paddingLeft={showSelector ? 64 : undefined}
          style={style}
          keyboardType={'phone-pad'}
          onChangeText={phoneTextHandler}
          onSubmit={_onSubmit}
          onFocus={(): void => _onChange()}
          onBlur={(): void => _onChange(false)}
          ref={ref}
          testID={'loginPhone'}
          title={'authentication.number'}
          returnKeyType={'send'}
          errorText={errorText}
        />
        <Animated.View
          style={[styles.modalSelectorContainer, {opacity: animation}]}>
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
