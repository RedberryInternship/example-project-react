/* eslint-disable react/display-name */
import React, {ReactElement} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import HTML from 'react-native-render-html'
import {useTranslation} from 'react-i18next'

import {Colors} from '../../utils'
import images from 'assets/images'
import BaseText from 'components/baseUI/BaseText'

type PrivacyPolicyProps = {
  onPress: () => void
}
const PrivacyPolicy = ({onPress}: PrivacyPolicyProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <BaseText style={styles.title}>{t('drawer.termsAndConditions')}</BaseText>
      <ScrollView style={{ marginVertical: 32 }}>
        <TouchableOpacity>
          <HTML html={t('privacyPolicy')} />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.closeButtonView}>
        <TouchableOpacity style={styles.closeButtonTouchable} onPress={onPress}>
          <Image source={images.close} style={styles.closeButtonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default PrivacyPolicy

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 2,
    flex: 1,
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  contentStyle: {
    color: Colors.primaryDark,
    fontSize: 13,
    marginLeft: 12,
    lineHeight: 16,
    marginVertical: 12,
  },
  contentStyleTitle: {
    fontWeight: 'bold'
  },
  closeButtonView: {
    alignItems: 'stretch',
  },
  closeButtonTouchable: {
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: '#0199F011',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  closeButtonImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: Colors.primaryBlue,
  },
})
