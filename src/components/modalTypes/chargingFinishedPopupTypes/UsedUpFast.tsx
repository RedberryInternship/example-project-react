import React, { ReactElement } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'

import { Navigation , HomeNavigateModes} from '../../../../@types/allTypes.d'


import { ModalPopupChargerItem, BaseText } from 'components'
import { Colors } from 'utils'
type UsedUpFastProps = {
  bottomDescription: string
  price: number,
  navigation: Navigation
}
const UsedUpFast = ({
  bottomDescription,
  price,
  navigation
}: UsedUpFastProps): ReactElement => {
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
        <TouchableOpacity
          onPress={(): void => {
            navigation.navigate('Home', { mode: HomeNavigateModes.showAllChargers })
          }}
          style={styles.subtype2Touchable}
        >
          <BaseText style={{ color: Colors.primaryGreen }}>
            {t('charger.allChargerList')}
          </BaseText>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default UsedUpFast

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
