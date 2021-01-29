import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  ModalPopupChargerItem,
  PopUpCountDown,
  BaseText,
} from 'components'
import { Colors } from 'utils'
import { BeforeFineLVL2FullChargeFC } from './types'

const BeforeFineLVL2FullCharge: BeforeFineLVL2FullChargeFC = (
  {
    bottomDescription,
    penalty_enabled,
    consumedMoney,
    refundMoney,
    onFinish,
    onFine,
    price,
    time,
  },
) => {
  const { t } = useTranslation()

  return (
    <>
      <BaseText style={styles.bottomContentDescriptionType2} numberOfLines={undefined}>
        {t(bottomDescription)}
      </BaseText>
      <PopUpCountDown
        startTime={time}
        alarm={!onFine}
        onFinish={onFinish}
        warningLevel={onFine && !penalty_enabled ? 2 : 1}
        penaltyEnabled={penalty_enabled}
      />
      <View style={styles.lineView} />
      <View style={{ marginVertical: 12 }}>
        {price !== null && <ModalPopupChargerItem val={price} type={0} />}
        {consumedMoney !== null && (
          <ModalPopupChargerItem val={consumedMoney} type={1} />
        )}
        {refundMoney !== null && (
          <ModalPopupChargerItem val={refundMoney} type={2} />
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
    marginHorizontal: '4%',
    marginVertical: '3%',
    marginBottom: '3%',
  },
  lineView: {
    backgroundColor: Colors.primaryBackground,
    opacity: 0.1,
    height: 1,
    width: '100%',
    justifyContent: 'center',
  },
})
