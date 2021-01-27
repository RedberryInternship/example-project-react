import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { BaseHeader, BaseButton, BaseText } from 'components'
import { Const, Colors } from 'utils'
import {
  FCWithNavigation,
  ChargingTypes,
} from 'types'

const ChargerDetail: FCWithNavigation = ({ navigation }) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <BaseHeader
        onPressLeft={navigation.goBack}
        title="chooseChargeMethod.choose"
      />
      <View style={styles.innerContainer}>
        <BaseText style={styles.topInfoText} numberOfLines={undefined}>
          {t('chooseChargeMethod.chooseChargeMethod')}
        </BaseText>

        <View>
          <BaseButton
            onPress={navigation.navigate.bind(ChargerDetail, 'ChoosingCard', {
              type: ChargingTypes.fullCharge,
              connectorTypeId: navigation.getParam(
                'connectorTypeId',
                undefined,
              ),
            })}
            text="chooseChargeMethod.untilTurnOff"
            style={styles.untilTurnOffBtn}
          />
          <BaseText style={styles.orText}>
            {t('chooseChargeMethod.or')}
          </BaseText>
          <BaseButton
            onPress={navigation.navigate.bind(ChargerDetail, 'ChoosingCard', {
              type: ChargingTypes.byAmount,
              connectorTypeId: navigation.getParam(
                'connectorTypeId',
                undefined,
              ),
            })}
            text="chooseChargeMethod.withEnteringPrice"
            style={styles.withEnteringPriceBtn}
          />
        </View>
        <View />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground,
  },
  innerContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  topInfoText: {
    color: Colors.primaryGray,
    fontSize: 13,
    lineHeight: 18,
    marginHorizontal: 64,
    marginTop: 16,
    textAlign: 'center',
  },
  orText: {
    lineHeight: 18,
    fontSize: 13,
    letterSpacing: 0.21,
    color: 'white',
    textAlign: 'center',
  },
  untilTurnOffBtn: {
    marginTop: 0,
    marginVertical: 16,
    marginHorizontal: 0,
    alignSelf: 'center',
    width: Const.Width - 88,
  },
  withEnteringPriceBtn: {
    marginTop: 16,
    marginVertical: 16,
    marginHorizontal: 0,
    alignSelf: 'center',
    width: Const.Width - 88,
  },
})

export default ChargerDetail
