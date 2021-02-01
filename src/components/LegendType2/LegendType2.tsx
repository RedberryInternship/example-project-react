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
import LegendColorItem from 'components/LegendColorItem'
import LegendItem from 'components/LegendItem'
import BaseText from 'components/BaseText'
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
          && legendTypes.map(({ text, fastCharger, privateCharger }) => (
            <LegendItem
              key={text}
              fastCharger={fastCharger}
              privateCharger={privateCharger}
              text={text}
            />
          ))}
        <View style={styles.gapView} />
        <View style={styles.legendTypesContainer}>
          {legendColorTypes
            && legendColorTypes.map(({ color, text }) => (
              <LegendColorItem
                key={text}
                color={color}
                text={text}
              />
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
  legendTypesContainer: {
    flex: 0,
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexWrap: 'wrap',
    borderRadius: 25,
    backgroundColor: 'rgba(144,163,173,0.1)',
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
