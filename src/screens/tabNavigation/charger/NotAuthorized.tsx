import React from 'react'
import {
  StyleSheet,
  View,
  Image,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'
import images from 'assets/images'
import * as Const from 'utils/const'
import colors from 'utils/colors'
import {
  BaseHeader,
  BaseButton,
  BaseText,
} from 'components'
import {
  HomeNavigateModes,
  FCWithNavigation,
} from 'types'

const NotAuthorized: FCWithNavigation = ({ navigation }) => {
  const { t } = useTranslation()
  const { navigate } = navigation
  return (
    <View style={styles.container}>
      <BaseHeader title="charger.chargeWitchCode" />
      <View style={styles.innerContainer}>
        <LinearGradient
          colors={['#009AF033', '#1065E333']}
          style={styles.infoLinearGradient}
        >
          <Image source={images.alertCircle} style={styles.alertCircle} />
          <BaseText style={styles.infoText}>
            {t('notAuthorized.notAuthorizedText')}
          </BaseText>
        </LinearGradient>
        <BaseButton
          onPress={() => navigate('Auth')}
          text="home.authorization"
          style={styles.authBtn}
          image={images.user}
          imageStyle={styles.authBtnImg}
        />
        <TouchableOpacity
          onPress={() => navigate('Home', {
            mode: HomeNavigateModes.showAllChargers,
          })}
          style={styles.allChargersTextWrapper}
        >
          <BaseText style={styles.allChargersText}>
            {t('charger.allChargerList')}
          </BaseText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NotAuthorized

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.primaryBackground,
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
    color: colors.primaryGreen,
    fontSize: 13,
  },
})
