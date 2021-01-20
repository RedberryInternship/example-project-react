import React from 'react'
import {
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from 'utils'
import images from 'assets/images'
import { BaseText } from 'components'
import { ChargerDetailTopInfoFC } from 'screens/tabNavigation/charger/chargerDetail/types'

const ChargerDetailTopInfo: ChargerDetailTopInfoFC = (
  {
    chargerLocationDirectionPress,
    showChargerLocationPress,
    favoritePress,
    location,
    distance,
    favorite,
    code,
  },
) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.nameAndFavoriteIconContainer}>
        <View style={styles.nameAndCodeContainer}>
          <BaseText style={styles.codeContainer}>
            {t('chargerDetail.code', { code })}
          </BaseText>
        </View>
        <View>
          <TouchableOpacity
            onPress={favoritePress}
            style={styles.favIconContainer}
          >
            <Image
              source={favorite ? images.filledHart : images.favorite}
              style={[styles.favIcon]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divisor} />
      <View style={styles.locationContainer}>
        <Image source={images.mapPin} style={styles.locationIcon} />
        <Text style={styles.locationText}>
          {location}
        </Text>
      </View>
      <View style={styles.divisor} />
      <View style={styles.locationAndDistanceContainer}>
        <View style={styles.locationAndMapPressContainer}>

          <TouchableOpacity
            onPress={showChargerLocationPress}
            style={styles.seeOnMapContainer}
          >
            <BaseText style={styles.seeOnMapText} numberOfLines={1}>
              {t('chargerDetail.seeOnMap')}
            </BaseText>
            <Image source={images.arrowRight} style={styles.arrowRightIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.distanceContainer}>
          <TouchableOpacity
            onPress={chargerLocationDirectionPress}
            style={styles.distanceTouchable}
          >
            <Image source={images.cornerUpRight} style={styles.distanceIcon} />
            <BaseText style={styles.distanceText} numberOfLines={1}>
              {distance}
            </BaseText>
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
  nameAndFavoriteIconContainer: {
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
    marginTop: 10,
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
    paddingRight: 30,
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
