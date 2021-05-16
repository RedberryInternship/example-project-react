import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import ModalPopupChargerItem from 'components/ModalPopupChargerItem'
import PopUpCountDown from 'components/PopUpCountDown'
import BaseText from 'components/BaseText'
import { Colors } from 'utils'
import { BeforeFineLVL2FullChargeFC } from './types'

const BeforeFineLVL2FullCharge: BeforeFineLVL2FullChargeFC = (
  {
    bottomDescription,
    penalty_enabled,
    charging_status,
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
      <BaseText
        testID="lvl2BeforeFineTitle"
        style={styles.bottomContentDescriptionType2}
        numberOfLines={undefined}
      >
        {t(bottomDescription)}
      </BaseText>
      <PopUpCountDown
        startTime={time}
        alarm={!onFine}
        onFinish={onFinish}
        warningLevel={onFine && !penalty_enabled ? 2 : 1}
        penaltyEnabled={penalty_enabled}
        chargingStatus={charging_status}
      />
      <View style={styles.lineView} />
      <View style={{ marginVertical: 12 }}>
        {price !== null && <ModalPopupChargerItem val={price} type={0} />}
        {consumedMoney !== null && (
          <ModalPopupChargerItem
            val={consumedMoney}
            type={1}
            amountTestID="beforeFineConsumedAmountTestID"
          />
        )}
        {refundMoney !== null && (
          <ModalPopupChargerItem
            val={refundMoney}
            type={2}
            amountTestID="beforeFineRefundAmountTestID"
          />
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
