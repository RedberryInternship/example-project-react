import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import ModalPopupChargerItem from 'components/ModalPopupChargerItem'
import BaseText from 'components/BaseText'
import { Colors } from 'utils'
import { HomeNavigateModes } from 'types'
import { UsedUpFastFC } from './types'
import { useNavigation } from '@react-navigation/native'

const UsedUpFast: UsedUpFastFC = (
  {
    bottomDescription,
    price,
  },
) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation();

  return (
    <>
      <BaseText
        testID="usedUpFastModalTitle"
        style={styles.bottomContentDescriptionType2}
        numberOfLines={undefined}
      >
        {t(bottomDescription)}
      </BaseText>
      <View style={styles.lineView} />
      <View style={{ marginVertical: 12 }}>
        {price !== null && <ModalPopupChargerItem val={price} type={0} />}
        <View style={styles.lineView} />
        <TouchableOpacity
          onPress={() => navigate('Home', { mode: HomeNavigateModes.showAllChargers })}
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
