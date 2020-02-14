import React from 'react'

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

import {Colors} from 'utils'

type Card = {
  code: string
  selected: boolean
  onPress: () => void | null
}

const cardListItem = ({code, onPress, selected = false}: Card) => {
  const selectedStatus = selected ? (
    <Image
      source={require('../../../assets/images/icons/green-tick.png')}
      style={styles.selectedCardCircle}
    />
  ) : (
    <View style={styles.selectableCardCircle} />
  )

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.innerLeftContainer}>
          <Image
            source={require('../../../assets/images/icons/credit-card.png')}
            style={styles.image}
          />
          <Text style={{color: Colors.primaryGray}}>{'xxxx xxxx xxxx '}</Text>
          <Text
            style={{
              color: selected ? Colors.primaryWhite : Colors.primaryGray,
            }}>
            {code.slice(12, 16)}
          </Text>
        </View>
        {selectedStatus}
      </View>
    </TouchableOpacity>
  )
}

export default cardListItem

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
