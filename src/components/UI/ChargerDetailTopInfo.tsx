import React, {useEffect, useState, ReactElement} from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Colors} from 'utils'
import {AxiosResponse} from 'axios'
import Imgs from '../../../assets/images'

type ChargerDetailTopInfoProps = {
  chargerLocationDirectionPress: () => void
  showChargerLocationPress: () => void
  favoritePress: () => void
  code: string | number | undefined
  name: string
  location: string
  distance: number
}

const ChargerDetailTopInfo = ({
  chargerLocationDirectionPress,
  showChargerLocationPress,
  favoritePress,
  code,
  name,
  location,
  distance,
}: ChargerDetailTopInfoProps): ReactElement => {
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.nameAndfavIconContainer}>
        <View style={styles.nameAndCodeContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.codeContainer}>კოდი:#{code}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={favoritePress}
            style={styles.favIconContainer}>
            <Image source={Imgs.favorite} style={styles.favIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divisor} />
      <View style={styles.locationAndDistanceContainer}>
        <View style={styles.locationAndMapPressContainer}>
          <View style={styles.locationContainer}>
            <Image source={Imgs.mapPin} style={styles.locationIcon} />
            <Text style={styles.locationText} numberOfLines={2}>
              {location}
            </Text>
          </View>
          <TouchableOpacity
            onPress={showChargerLocationPress}
            style={styles.seeOnMapContainer}>
            <Text style={styles.seeOnMapText} numberOfLines={1}>
              {t('chargerDetail.seeOnMap')}
            </Text>
            <Image source={Imgs.arrowRight} style={styles.arrowRightIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.distanceContainer}>
          <TouchableOpacity
            onPress={chargerLocationDirectionPress}
            style={styles.distanceTouchable}>
            <Image source={Imgs.cornerUpRight} style={styles.distanceIcon} />
            <Text style={styles.distanceText} numberOfLines={1}>
              {distance} {t('km')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ChargerDetailTopInfo

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 16,
    backgroundColor: Colors.primaryBlue.concat('16'),
    borderRadius: 8,
    height: 152,
  },
  nameAndfavIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  nameAndCodeContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nameText: {
    opacity: 0.8,
    color: 'white',
  },
  codeContainer: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  favIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0199F016',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favIcon: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    tintColor: Colors.primaryBlue,
  },
  divisor: {
    height: 24,
  },
  locationAndDistanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  locationAndMapPressContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  locationIcon: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
  },
  locationText: {
    color: Colors.primaryGray,
    fontSize: 11,
    marginLeft: 8,
  },
  seeOnMapContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  seeOnMapText: {
    color: Colors.primaryGreen,
    marginLeft: 8,
  },
  arrowRightIcon: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    tintColor: Colors.primaryGreen,
  },
  distanceContainer: {
    justifyContent: 'flex-end',
  },
  distanceTouchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBlue,
    height: 41,
    borderRadius: 6,
    width: 100,
  },
  distanceIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  distanceText: {
    color: Colors.primaryWhite,
    fontSize: 13,
    marginLeft: 8,
    fontWeight: 'bold',
  },
})
