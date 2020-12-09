import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors, Defaults } from 'utils'
import images from 'assets/images'
import { BaseText } from 'components'
import { RegistrationType1FC } from './types'

const RegistrationType1: RegistrationType1FC = ({ onPress }) => {
  const { t } = useTranslation()

  return (
    <>
      <View style={styles.container}>
        <Image source={images.user} style={styles.useIcon} />
        <BaseText style={styles.titleText}>{t('welcome')}</BaseText>
        <BaseText style={styles.nameSurnameText}>
          {Defaults.userDetail?.first_name}
          {' '}
          {Defaults.userDetail?.last_name}
        </BaseText>
      </View>
      <View style={styles.descriptionContainer}>
        <BaseText style={styles.descriptionText}>
          {t('authentication.registration.success')}
        </BaseText>
      </View>
      <View style={styles.closeContainer}>
        <TouchableOpacity style={styles.closeTouchable} onPress={onPress}>
          <Image source={images.close} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}
export default RegistrationType1

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  useIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginVertical: 8,
    tintColor: Colors.primaryBlue,
    marginTop: 80,
  },
  titleText: {
    fontSize: 17,
    lineHeight: 22,
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  nameSurnameText: {
    fontSize: 13,
    lineHeight: 22,
    color: '#436880',
    marginVertical: 8,
  },
  descriptionContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 22,
    color: '#436880',
    marginVertical: 24,
    paddingHorizontal: 32,
    textAlign: 'center',
  },
  closeContainer: {
    alignItems: 'center',
  },
  closeTouchable: {
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: '#0199F011',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: Colors.primaryBlue,
  },
})
