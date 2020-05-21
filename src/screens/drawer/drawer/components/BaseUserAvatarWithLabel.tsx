import React, {ReactElement} from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native'

import {Colors} from 'utils'
import images, {Avatars} from 'assets/images'
import {useSafeArea} from 'react-native-safe-area-context'
import {BaseText} from 'components'

type AvatarWithLabel = {
  onPress: (event?: GestureResponderEvent) => void | undefined
  firstName: string
  lastName: string
  avatar: number | undefined
}

const UserAvatarWithLabel = ({
  onPress,
  firstName,
  lastName,
  avatar,
}: AvatarWithLabel): ReactElement => {
  const insets = useSafeArea()

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, height: 140 + insets.top},
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={avatar ? Avatars[avatar] : images.greenUser}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={onPress}
          style={styles.editButton}
          hitSlop={{left: 15, top: 15, bottom: 15, right: 15}}
        >
          <Image source={images.bluePencil} style={styles.editButtonImage} />
        </TouchableOpacity>
      </View>

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
    fontSize: 17,
    fontWeight: 'bold',
  },
})
