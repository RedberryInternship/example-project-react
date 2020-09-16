import React, {ReactElement} from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'

import {Colors} from 'utils'
import {BaseCheckbox, BaseNativeTouchable, BaseText} from 'components'
import images from 'assets/images'

type ChooseCardOnChargingProps = {
  lastDigits: string
  active: boolean
  onPress: () => void
}
const ChooseCardOnCharging = ({
  lastDigits,
  active,
  onPress,
}: ChooseCardOnChargingProps): ReactElement => {
  return (
    <BaseNativeTouchable onPress={onPress} borderless={false}>
      <View style={styles.container}>
        <Image source={images.creditCard} style={styles.cardImage} />
        <BaseText style={styles.cardLastDigitText}>{lastDigits}</BaseText>
        <BaseCheckbox active={active} />
      </View>
    </BaseNativeTouchable>
  )
}

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
    color: Colors.primaryWhite,
    textTransform: 'uppercase',
  },
})
