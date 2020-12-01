import React, { ReactElement } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { BaseButton, BaseText } from 'components'
import { Colors } from 'utils'
import images from 'assets/images'

type FavoriteChargerItemProps = {
  title: string
  address: string
  turnon: () => void | undefined
  deleteItem: () => void | undefined
}

const FavoriteChargerListItem = ({
  title,
  address,
  turnon,
  deleteItem,
}: FavoriteChargerItemProps): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.innerLeftContainer}>
        <TouchableOpacity onPress={deleteItem}>
          <View style={styles.deleteButton}>
            <Image
              style={styles.deleteButtonImage}
              source={images.orangeTrash}
            />
          </View>
        </TouchableOpacity>
        <BaseText style={styles.title}>{title}</BaseText>
        <View style={styles.addressContainer}>
          <Image style={styles.addressImage} source={images.mapPin} />
          <BaseText style={styles.addressTitle}>{address}</BaseText>
        </View>
      </View>
      <View style={styles.customizedBaseButtonContainer}>
        <BaseButton
          onPress={turnon}
          text={'turnOn'}
          style={styles.customizedBaseButton}
          imageStyle={{ tintColor: Colors.primaryBlue }}
          image={images.arrowRight}
          textStyle={{ color: Colors.primaryBlue }}
        />
      </View>
    </View>
  )
}

export default FavoriteChargerListItem

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
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
