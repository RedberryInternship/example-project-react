import React from 'react'
import {
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { Colors } from 'utils'
import {
  BaseNativeTouchable,
  BaseText,
} from 'components'
import images from 'assets/images'
import { CarListItemFC } from './types'

const CarListItem: CarListItemFC = () => {
  const selected = true;
  const code = '0000000000000000000'

  const selectedStatus = selected
    ? (
      <Image source={images.greenTick} style={styles.selectedCardCircle} />
    )
    : (
      <View style={styles.selectableCardCircle} />
    )

  return (
    <BaseNativeTouchable onPress={() => { }}>
      <View style={styles.container}>
        <View style={styles.innerLeftContainer}>
          <Image source={images.creditCard} style={styles.image} resizeMode="contain" />
          <BaseText style={{ color: Colors.primaryGray }}>
            {'xxxx xxxx xxxx '}
          </BaseText>
          <BaseText
            style={{
              color: selected ? Colors.primaryWhite : Colors.primaryGray,
            }}
          >
            {code.slice(12, 16)}
          </BaseText>
        </View>
        {selectedStatus}
      </View>
    </BaseNativeTouchable>
  )
}

export default CarListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDark,
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
  selectableCardCircle: {
    width: 26.81,
    height: 26.81,
    borderRadius: 15,
    borderColor: Colors.primaryWhite,
    borderWidth: 2,
    marginRight: 20,
  },
  selectedCardCircle: {
    width: 26.81,
    height: 26.81,
    marginRight: 20,
  },
})
