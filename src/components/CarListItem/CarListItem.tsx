import React from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native'
import {
  BaseText,
} from 'components'
import images from 'assets/images'
import colors from 'utils/colors'
import { CarListItemFC } from './types'

const CarListItem: CarListItemFC = ({ data, onDeletePress }) => {
  const { mark_name, model_name } = data.user_car
  return (
    <View style={styles.container}>
      <View style={styles.innerLeftContainer}>
        <View style={styles.blueBackground}>
          <Image source={images.addCarInput} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.detailsWrapper}>
          <BaseText style={styles.manufacturer}>{mark_name}</BaseText>
          <BaseText style={styles.model}>{model_name}</BaseText>
        </View>

      </View>

      <TouchableOpacity onPress={onDeletePress}>
        <Image source={images.deleteAction} style={styles.image} resizeMode="contain" />
      </TouchableOpacity>

    </View>
  )
}

export default CarListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    height: 66,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },

  innerLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 23,
    height: 23,
    marginHorizontal: 30,
  },
  blueBackground: {
    backgroundColor: colors.lightBlue,
    width: 60,
    height: 66,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsWrapper: {
    marginLeft: 15,
  },
  manufacturer: {
    color: colors.primaryWhite,
    fontSize: 13,
    marginBottom: 5,
  },
  model: {
    color: colors.primaryGray,
    fontSize: 11,
  },
})
