import React, {ReactElement} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import {BaseHeader, BaseButton} from 'components'
import {Const, Colors} from 'utils'
import LinearGradient from 'react-native-linear-gradient'
import {useTranslation} from 'react-i18next'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Imgs from '../../../../assets/images'
import {ScreenPropsWithNavigation} from 'allTypes'

const ChargerDetail = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <BaseHeader title={'charger.chargeWitchCode'} />
      <View style={styles.innerContainer}>
        <LinearGradient
          colors={['#009AF033', '#1065E333']}
          style={styles.infoLinearGradient}>
          <Image source={Imgs.alertCircle} style={styles.alertCircle} />
          <Text style={styles.infoText}>
            {t('notAuthorized.notAuthorizedText')}
          </Text>
        </LinearGradient>
        <BaseButton
          onPress={navigation.navigate.bind(ChargerDetail, 'Auth')}
          text={'home.authorization'}
          style={styles.authBtn}
          image={Imgs.user}
          imageStyle={styles.authBtnImg}
        />
        <TouchableOpacity
          onPress={navigation.navigate.bind(ChargerDetail, '')}
          style={styles.allChargersTextWrapper}>
          <Text style={styles.allChargersText}>
            {t('charger.allChargerList')}
          </Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    flex: 1,
  },
  infoLinearGradient: {
    paddingHorizontal: 48,
    paddingVertical: 48,
    marginHorizontal: 44,
    borderRadius: 10,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    lineHeight: 18,
    fontSize: 13,
    letterSpacing: 0.21,
    color: 'white',
    textAlign: 'center',
  },
  alertCircle: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  authBtn: {
    marginTop: 0,
    marginVertical: 16,
    marginHorizontal: 0,
    alignSelf: 'center',
    width: Const.Width - 88,
  },
  authBtnImg: {
    tintColor: 'white',
  },
  allChargersTextWrapper: {
    alignItems: 'center',
  },
  allChargersText: {
    color: Colors.primaryGreen,
    fontSize: 13,
  },
})

export default ChargerDetail
