import React from 'react'
import {Text, View, Image} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Colors, GNOME} from 'utils'

const modalPopupChargerItemTypes = [
  {
    image: require('../../../assets/images/icons/credit-card.png'),
    text: 'popup.chargeOff',
  },
  {
    image: require('../../../assets/images/icons/zap.png'),
    text: 'charging.charge',
  },
  {
    image: require('../../../assets/images/icons/corner-up-left.png'),
    text: 'popup.returned',
  },
]

const modalPopupChargerItem = ({type, val}: any) => {
  const {t} = useTranslation()

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 12,
        maxWidth: '100%',
        flexWrap: 'wrap',
      }}>
      <Image
        source={modalPopupChargerItemTypes[type].image}
        style={{width: 20, height: 20, resizeMode: 'contain'}}
      />
      <Text
        style={{
          color: '#436880',
          fontSize: 13,
          marginLeft: 12,
          marginRight: 4,
          fontFamily: GNOME.HELV_EX,
          fontVariant: ['tabular-nums'],
        }}>
        {t(modalPopupChargerItemTypes[type].text)}
      </Text>
      <Text
        style={{
          color: type === 2 ? Colors.primaryBlue : Colors.primaryBackground,
          fontSize: 13,
          fontWeight: 'bold',
          letterSpacing: 0.5,
          textAlign: 'center',
          lineHeight: 18,
        }}>
        {val} {t('gel')}
      </Text>
    </View>
  )
}

export default modalPopupChargerItem
