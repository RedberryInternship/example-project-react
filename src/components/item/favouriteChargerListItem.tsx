import React, {ReactElement} from 'react'

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

import {BaseButton} from '..'

import {Colors} from 'utils'

type FavouriteChargerItemProps = {
  title: string
  address: string
  turnon: () => void | undefined
  deleteItem: () => void | undefined
}

const FavouriteChargerListItem = ({
  title,
  address,
  turnon,
  deleteItem,
}: FavouriteChargerItemProps): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.innerLeftContainer}>
        <TouchableOpacity onPress={deleteItem}>
          <View style={styles.deleteButton}>
            <Image
              style={styles.deleteButtonImage}
              source={require('../../../assets/images/icons/orange-trash.png')}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.addressContainer}>
          <Image
            style={styles.addressImage}
            source={require('../../../assets/images/icons/ic_map_pin.png')}
          />
          <Text style={styles.addressTitle}>{address}</Text>
        </View>
      </View>
      <View style={styles.customizedBaseButtonContainer}>
        <BaseButton
          onPress={turnon}
          text={'turnOn'}
          style={styles.customizedBaseButton}
          imageStyle={{tintColor: Colors.primaryBlue}}
          image={require('../../../assets/images/icons/arrow_right.png')}
          textStyle={{color: Colors.primaryBlue}}
        />
      </View>
    </View>
  )
}

export default FavouriteChargerListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
  },
  innerLeftContainer: {
    flex: -1,
  },
  customizedBaseButtonContainer: {
    flex: 0,
    height: '100%',
    marginLeft: 8,
    justifyContent: 'center',
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
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
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
