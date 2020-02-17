import React, {ReactElement} from 'react'

import {View, StyleSheet, Image, GestureResponderEvent} from 'react-native'

import {Colors} from 'utils'
import {BaseNativeTouchable, BaseText} from 'components'

type AvatarWithLabel = {
  onPress: (event?: GestureResponderEvent) => void | undefined
  firstName: string
  lastName: string
}

const BaseUserAvatarWithLabel = ({
  onPress,
  firstName,
  lastName,
}: AvatarWithLabel): ReactElement => {
  const userDefaultIcon = require('../../../assets/images/icons/green-user.png')

  return (
    <View style={[styles.container]}>
      <View style={styles.imageContainer}>
        <Image source={userDefaultIcon} style={styles.image} />
        <BaseNativeTouchable
          onPress={onPress}
          style={styles.editButton}
          hitSlop={{left: 10, top: 10, bottom: 10, right: 10}}>
          <Image
            source={require('../../../assets/images/icons/blue-pencil.png')}
            style={styles.editButtonImawge}
          />
        </BaseNativeTouchable>
      </View>

      <View style={styles.usernameWrapper}>
        <BaseText style={styles.username}>{firstName}</BaseText>
        <BaseText style={styles.username}>{lastName}</BaseText>
      </View>
    </View>
  )
}

export default BaseUserAvatarWithLabel

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: "space-evenly"
  },

  imageContainer: {
    width: undefined,
    height: undefined,
    backgroundColor: 'rgba(76, 217, 100, .2)',
    borderRadius: 50,
    position: 'relative',
    marginLeft: '10%',
  },
  image: {
    width: 44,
    height: 44,
    margin: 10,
  },

  editButton: {
    position: 'absolute',
    backgroundColor: Colors.primaryDark,
    width: 18,
    height: 18,
    zIndex: 1,
    borderRadius: 9,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    right: 8,
    top: -4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonImage: {
    width: 11,
    height: 11,
    position: 'relative',
    top: -1,
    resizeMode: 'contain',
  },

  usernameWrapper: {
    marginLeft: 24,
  },
  username: {
    color: Colors.primaryWhite,
    fontSize: 17,
    fontWeight: 'bold',
  },
})
