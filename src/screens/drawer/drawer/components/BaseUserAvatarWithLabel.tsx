import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Colors } from 'utils'
import images, { Avatars } from 'assets/images'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BaseText } from 'components'
import { AvatarWithLabelFC } from 'screens/drawer/drawer/types'

const UserAvatarWithLabel: AvatarWithLabelFC = (
  {
    firstName,
    lastName,
    onPress,
    avatar,
  }
) => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, height: 140 + insets.top },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        hitSlop={styles.imageHitSlop}
        style={styles.imageContainer}
      >
        <Image
          source={(avatar! > -1) ? Avatars[avatar!] : images.greenUser}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.usernameWrapper}>
        <BaseText style={styles.username}>{firstName}</BaseText>
        <BaseText style={styles.username}>{lastName}</BaseText>
      </View>
    </View>
  )
}

export default UserAvatarWithLabel

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 24,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    flexDirection: 'row',
  },

  imageContainer: {
    width: undefined,
    height: undefined,
    backgroundColor: 'rgba(76, 217, 100, .2)',
    borderRadius: 50,
    position: 'relative',
    marginLeft: 16,
  },
  imageHitSlop: {
    bottom: 15,
    right: 15,
    left: 15,
    top: 15,
  },
  image: {
    width: 44,
    height: 44,
    margin: 10,
    tintColor: '#4CD964',
    resizeMode: 'contain',
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
    right: 4,
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
    marginLeft: 16,
  },
  username: {
    color: Colors.primaryWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
