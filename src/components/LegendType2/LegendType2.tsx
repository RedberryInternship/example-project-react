import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors } from 'utils'
import images from 'assets/images'
import {
  LegendColorItem,
  LegendItem,
  BaseText,
} from 'components'
import { LegendType2FC } from './types'
import {
  legendColorTypes,
  legendTypes,
} from './config'

const LegendType2: LegendType2FC = ({ onPress }) => {
  const { t } = useTranslation()
  return (
    <>
      <View style={styles.container}>
        <BaseText style={styles.legendText}>{t('popup.legend')}</BaseText>
        {legendTypes
          && legendTypes.map((val) => <LegendItem key={val.text} {...val} />)}
        <View style={styles.gapView}>
          <View style={styles.gapInnerView} />
        </View>
        <View style={styles.legendTypesContainer}>
          {legendColorTypes
            && legendColorTypes.map((val) => (
              <LegendColorItem key={val.text} {...val} />
            ))}
        </View>
      </View>
      <View style={styles.closeButtonView}>
        <TouchableOpacity style={styles.closeButtonTouchable} onPress={onPress}>
          <Image source={images.close} style={styles.closeButtonImage} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default LegendType2

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  legendText: {
    fontSize: 17,
    lineHeight: 22,
    color: Colors.primaryBackground,
    marginBottom: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  gapView: {
    marginHorizontal: 16,
    marginVertical: 24,
    marginTop: 0,
  },
  gapInnerView: {
    borderBottomWidth: 1,
    opacity: 0.1,
    height: 0,
    borderBottomColor: Colors.primaryBackground,
    width: '100%',
  },
  legendTypesContainer: {
    flex: 0,
    flexDirection: 'row',
    marginRight: 32,
    flexWrap: 'wrap',
    borderRadius: 25,
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
