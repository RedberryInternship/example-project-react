import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import ModalPopupChargerItem from 'components/item/ModalPopupChargerItem'
import BaseText from 'components/baseUI/BaseText'
import { Colors } from 'utils'

type BankruptProps = {
  bottomDescription: string
  price: number
}
const Bankrupt = ({
  bottomDescription,
  price,
}: BankruptProps): ReactElement => {
  const { t } = useTranslation()

  return (
    <>
      <BaseText style={styles.bottomContentDescriptionType2}>
        {t(bottomDescription)}
      </BaseText>
      <View style={styles.lineView} />
      <View style={{ marginVertical: 12 }}>
        {price !== null && <ModalPopupChargerItem val={price} type={0} />}
        <View style={styles.lineView} />
      </View>
    </>
  )
}

export default Bankrupt

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
