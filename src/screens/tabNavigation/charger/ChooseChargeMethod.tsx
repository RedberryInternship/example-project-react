import React, {ReactElement} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {BaseHeader, BaseButton} from 'components'
import {Const, Colors} from 'utils'
import {useTranslation} from 'react-i18next'
import {ScreenPropsWithNavigation} from 'allTypes'

const ChargerDetail = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <BaseHeader
        onPressLeft={navigation.navigate.bind(ChargerDetail, 'MainDrawer')}
        title={'chooseChargeMethod.choose'}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.topInfoText}>
          {t('chooseChargeMethod.chooseChargeMethod')}
        </Text>

        <View>
          <BaseButton
            onPress={navigation.navigate.bind(ChargerDetail, 'ChoosingCard', {
              type: 1,
            })}
            text={'chooseChargeMethod.untilTurnOff'}
            style={styles.untilTurnOffBtn}
          />
          <Text style={styles.orText}>{t('chooseChargeMethod.or')}</Text>

          <BaseButton
            onPress={navigation.navigate.bind(ChargerDetail, 'ChoosingCard', {
              type: 0,
            })}
            text={'chooseChargeMethod.withEnteringPrice'}
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
