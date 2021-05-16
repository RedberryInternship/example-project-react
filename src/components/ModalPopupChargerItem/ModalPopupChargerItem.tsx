import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors } from 'utils'
import BaseText from 'components/BaseText'
import { ModalPopupChargerItemFC } from './types'
import { modalPopupChargerItemTypes } from './config'

const ModalPopupChargerItem: ModalPopupChargerItemFC = (
  {
    amountTestID,
    type,
    val,
  },
) => {
  const { t } = useTranslation()

  const popupItemPriceColorStyle = {
    color: type === 2
      ? Colors.primaryBlue
      : Colors.primaryBackground,
  }

  return (
    <View style={styles.container}>
      <Image
        source={modalPopupChargerItemTypes[type].image}
        style={styles.popUpItemImg}
      />
      <BaseText style={styles.popUpItemText}>
        {t(modalPopupChargerItemTypes[type].text)}
      </BaseText>
      <BaseText style={[styles.popUpItemPriceText, popupItemPriceColorStyle]} testID={amountTestID}>
        {val}
        {' '}
        {t('gel')}
      </BaseText>
    </View>
  )
}

export default ModalPopupChargerItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '3%',
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  popUpItemImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  popUpItemText: {
    color: '#436880',
    fontSize: 13,
    marginLeft: '4%',
    marginRight: '4%',
  },
  popUpItemPriceText: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    lineHeight: 18,
  },
})
