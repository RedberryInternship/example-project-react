import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import BaseButton from 'components/BaseButton'
import BaseText from 'components/BaseText'
import { Colors } from 'utils'
import images from 'assets/images'
import { FavoriteChargerItemFC } from 'screens/tabNavigation/favorites/types'
import colors from 'utils/colors'

const FavoriteChargerListItem: FavoriteChargerItemFC = (
  {
    title,
    address,
    turnon,
    deleteItem,
  },
) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <View style={styles.innerLeftContainer}>
        <TouchableOpacity onPress={deleteItem}>
          <View style={styles.deleteButton}>
            <Image
              style={styles.deleteButtonImage}
              source={images.remove}
            />
          </View>
        </TouchableOpacity>
        <BaseText style={styles.title}>{title}</BaseText>
      </View>
      <View style={styles.customizedBaseButtonContainer}>
        <BaseButton
          onPress={turnon}
          text="turnOn"
          style={styles.customizedBaseButton}
          imageStyle={{ tintColor: Colors.primaryBlue }}
          image={images.arrowRight}
          textStyle={{ color: Colors.primaryBlue }}
        />
      </View>
    </View>
    <View style={styles.addressContainer}>
      <Image style={styles.addressImage} source={images.mapPin} />
      <BaseText style={styles.addressTitle} numberOfLines={undefined}>{address}</BaseText>
    </View>
  </View>
)

export default FavoriteChargerListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryDark,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  innerLeftContainer: {
    flex: -1,
  },
  customizedBaseButtonContainer: {
    flex: 0,
    marginLeft: 8,
    justifyContent: 'center',
    width: 120,
  },
  customizedBaseButton: {
    marginTop: 0,
    marginHorizontal: 0,
    alignSelf: 'center',
    width: 120,
    backgroundColor: '#0199F033',
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 149, 0, 0.16)',
    width: 39,
    height: 39,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonImage: {
    width: 18,
    resizeMode: 'contain',
    tintColor: colors.primaryGold,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  addressImage: {
    width: 17,
    height: 17,
    marginRight: 10,
  },
  addressTitle: {
    color: Colors.primaryGray,
    fontSize: 13,
    lineHeight: 16,
    paddingRight: 30,
  },
  title: {
    color: Colors.primaryWhite,
    lineHeight: 30,
    fontSize: 15,
    marginVertical: 8,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
})
