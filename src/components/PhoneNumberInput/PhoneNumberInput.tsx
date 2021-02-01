import React from 'react'
import {
  StyleSheet,
  Animated,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import SelectPhoneCode from 'components/SelectPhoneCode'
import BaseInput from 'components/BaseInput'
import images from 'assets/images'
import { Colors } from 'utils'
import {
  PhoneNumberInputProps,
  Reference,
} from './types'
import usePhoneNumberInput from './usePhoneNumberInput'

const PhoneNumberInput = React.forwardRef(
  (
    props: PhoneNumberInputProps,
    ref: Reference,
  ) => {
    const {
      imageAnimatedOpacity,
      selectedCountryCode,
      pickerItemsState,
      pickerItemsLabel,
      inputPlaceholder,
      phoneTextHandler,
      onPickerChange,
      animation,
      onSubmit,
      onChange,
      style,
    } = usePhoneNumberInput(props)
    const { t } = useTranslation()
    return (
      <View style={styles.container}>
        <View pointerEvents="none" style={styles.imageContainer}>
          <Animated.Image
            source={images.phone}
            style={[styles.image, { opacity: imageAnimatedOpacity }]}
            resizeMode="contain"
          />
        </View>
        <BaseInput
          paddingLeft={64}
          style={style}
          keyboardType="phone-pad"
          onChangeText={phoneTextHandler}
          onSubmitEditing={onSubmit}
          onFocus={(): void => onChange()}
          onBlur={(): void => onChange(false)}
          ref={ref}
          testID="loginPhone"
          title="authentication.number"
          returnKeyType="send"
          placeholder={inputPlaceholder}
          placeholderTextColor={Colors.primaryGray}
        />
        <Animated.View style={[styles.modalSelectorContainer, { opacity: animation }]}>
          <View style={styles.touchableStyle}>
            <SelectPhoneCode
              data={pickerItemsState}
              onChange={onPickerChange}
              title={t('phoneCodes')}
              selectedValue={selectedCountryCode.value}
              labels={pickerItemsLabel}
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
