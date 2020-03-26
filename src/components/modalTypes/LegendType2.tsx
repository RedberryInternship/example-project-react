/* eslint-disable react/display-name */
import React, {ReactElement} from 'react'
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {Colors} from 'utils'
import {LegendItem, LegendColorItem} from 'components'
import {useTranslation} from 'react-i18next'
import Imgs from '../../../assets/images'

import {ChargerMarkerType} from '../../../@types/allTypes.d'

const legendTypes = [
  {
    text: 'popup.fastNonCommercial',
    type: ChargerMarkerType.fast__nonPublic,
  },
  {
    text: 'popup.fastCommercial',
    type: ChargerMarkerType.fast__public,
  },
  {
    text: 'popup.lvl2NonCommercial',
    type: ChargerMarkerType.lvl2__nonPublic,
  },
  {
    text: 'popup.lvl2Commercial',
    type: ChargerMarkerType.lvl2__public,
  },
]
const legendColorTypes = [
  {text: 'popup.busy', color: '#FF9500'},
  {text: 'popup.notWorking', color: '#FF3B3B'},
  {text: 'popup.free', color: '#3FD560'},
]
type LegendType2Props = {
  onPress: () => void
}
const LegendType2 = ({onPress}: LegendType2Props): ReactElement => {
  const {t} = useTranslation()
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.legendText}>{t('popup.legend')}</Text>
        {legendTypes &&
          legendTypes.map((val, ind) => <LegendItem key={ind} {...val} />)}
        <View style={styles.gapView}>
          <View style={styles.gapInnerView} />
        </View>
        <View style={styles.legendTypesContainer}>
          {legendColorTypes &&
            legendColorTypes.map((val, ind) => (
              <LegendColorItem key={ind} {...val} />
            ))}
        </View>
      </View>
      <View style={styles.closeButtonView}>
        <TouchableOpacity style={styles.closeButtonTouchable} onPress={onPress}>
          <Image source={Imgs.close} style={styles.closeButtonImage} />
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
