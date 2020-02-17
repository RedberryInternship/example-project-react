import React, {ReactElement} from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import {Colors} from 'utils'
import {BaseCheckbox, BaseNativeTouchable} from 'components'

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
        <Image
          source={require('../../../assets/images/icons/credit-card.png')}
          style={styles.cardImage}
        />
        <Text style={styles.cardLastDigitText}>XXXXXXXXXX {lastDigits}</Text>
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
    marginHorizontal: 16,
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
  },
})
