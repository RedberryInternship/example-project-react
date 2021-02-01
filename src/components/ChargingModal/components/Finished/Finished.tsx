import React from 'react'
import { View, StyleSheet } from 'react-native'
import ModalPopupChargerItem from 'components/ModalPopupChargerItem'
import { Colors } from 'utils'
import { FinishedFC } from './types'

const Finished: FinishedFC = (
  {
    consumedMoney,
    refundMoney,
    price,
  },
) => (
  <>
    <View style={styles.lineView} />
    <View style={{ marginVertical: 12 }}>
      {price !== null && <ModalPopupChargerItem val={price} type={0} />}
      {consumedMoney !== null && (
        <ModalPopupChargerItem val={consumedMoney} type={1} />
      )}
      {refundMoney !== null && (
        <ModalPopupChargerItem val={refundMoney} type={2} />
      )}
      <View style={styles.lineView} />
    </View>
  </>
)

export default Finished

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
  subtype2Touchable: {
    marginVertical: 16,
    alignItems: 'center',
  },
})
