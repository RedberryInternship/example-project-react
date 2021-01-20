import React from 'react'
import {
  StyleSheet,
  Image,
  View,
} from 'react-native'
import colors from 'utils/colors'
import {
  BaseNativeTouchable,
  BaseCheckbox,
  BaseText,
} from 'components'
import images from 'assets/images'
import { ChooseCardOnChargingFC } from 'screens/tabNavigation/charger/choosingCard/types'
import { formatCreditCardDigits } from './helper'

const ChooseCardOnCharging: ChooseCardOnChargingFC = (
  {
    lastDigits,
    active,
    onPress,
  },
) => (
  <BaseNativeTouchable onPress={onPress} borderless={false}>
    <View style={styles.container}>
      <Image source={images.creditCard} style={styles.cardImage} />
      <BaseText style={styles.cardLastDigitText}>{formatCreditCardDigits(lastDigits)}</BaseText>
      <BaseCheckbox active={active} />
    </View>
  </BaseNativeTouchable>
)

export default ChooseCardOnCharging

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    marginVertical: 8,
    marginHorizontal: 32,
    marginRight: 20,
  },
  cardImage: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
    marginRight: 8,
  },
  cardLastDigitText: {
    fontSize: 13,
    color: colors.primaryWhite,
    textTransform: 'uppercase',
  },
})
