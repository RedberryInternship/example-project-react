import React, {ReactElement} from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors, GNOME} from 'utils'
import images from 'assets/images'

const modalPopupChargerItemTypes = [
  {
    image: images.creditCard,
    text: 'popup.chargeOff',
  },
  {
    image: images.zap,
    text: 'charging.charge',
  },
  {
    image: images.cornerUpLeft,
    text: 'popup.returned',
  },
]
type ModalPopupChargerItemProps = {
  type: number
  val: string
}

const ModalPopupChargerItem = ({
  type,
  val,
}: ModalPopupChargerItemProps): ReactElement => {
  const {t} = useTranslation()

  const popupItemPriceColorStyle = {
    color: type === 2 ? Colors.primaryBlue : Colors.primaryBackground,
  }

  return (
    <View style={styles.container}>
      <Image
        source={modalPopupChargerItemTypes[type].image}
        style={styles.popUpItemImg}
      />
      <Text style={styles.popUpItemText}>
        {t(modalPopupChargerItemTypes[type].text)}
      </Text>
      <Text style={[styles.popUpItemPriceText, popupItemPriceColorStyle]}>
        {val} {t('gel')}
      </Text>
    </View>
  )
}

export default ModalPopupChargerItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 12,
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
    marginLeft: 12,
    marginRight: 4,
    fontFamily: GNOME.HELV_EX,
    fontVariant: ['tabular-nums'],
  },
  popUpItemPriceText: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    lineHeight: 18,
  },
})
