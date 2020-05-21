import React, {ReactElement} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {PopUpCountDown, ModalPopupChargerItem, BaseText} from 'components'
import {Colors} from 'utils'
type BeforeFineLVL2FullChargeProps = {
  time: string
  bottomDescription: string
  fastCharger?: boolean
  price: number
  consumedMoney: number
  refundMoney: number
  onFine: boolean
  onFinish: () => void
}
const BeforeFineLVL2FullCharge = ({
  time,
  bottomDescription,
  price,
  consumedMoney,
  refundMoney,
  onFine,
  onFinish,
}: BeforeFineLVL2FullChargeProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <>
      <BaseText style={styles.bottomContentDescriptionType2}>
        {t(bottomDescription)}
      </BaseText>
      <PopUpCountDown
        startTime={time}
        up={onFine}
        alarm={!onFine}
        onFinish={onFinish}
        warningLevel={onFine ? 2 : 1}
      />
      <View style={styles.lineView} />
      <View style={{marginVertical: 12}}>
        {price !== null && <ModalPopupChargerItem val={price} type={0} />}
        {consumedMoney !== null && (
          <ModalPopupChargerItem val={consumedMoney} type={0} />
        )}
        {refundMoney !== null && (
          <ModalPopupChargerItem val={refundMoney} type={0} />
        )}
      </View>
    </>
  )
}

export default BeforeFineLVL2FullCharge

const styles = StyleSheet.create({
  bottomContentDescriptionType2: {
    fontSize: 13,
    lineHeight: 16,
    color: '#436880',
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 32,
    marginVertical: 16,
    marginBottom: 8,
  },
  lineView: {
    backgroundColor: Colors.primaryBackground,
    opacity: 0.1,
    height: 1,
    width: '100%',
    justifyContent: 'center',
  },
})
