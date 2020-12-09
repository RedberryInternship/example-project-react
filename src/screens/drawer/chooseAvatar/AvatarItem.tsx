import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import colors from 'utils/colors'
import images from 'assets/images'
import { BaseNativeTouchable } from 'components'
import { AvatarItemFC } from './types'

const AvatarItem: AvatarItemFC = (
  {
    onPress,
    image,
    active,
  },
) => (
    <View style={styles.imageContainer}>
      <View>
        <BaseNativeTouchable
          onPress={onPress}
          style={[
            styles.selectAvatar,
            { backgroundColor: active ? '#4CD96433' : '#0199F033' },
          ]}
          hitSlop={styles.hitSlop}
        >
          <Image
            source={image}
            style={[styles.image, { tintColor: active ? '#4CD964' : '#0199F0' }]}
          />
        </BaseNativeTouchable>
        <View style={styles.editButtonImageContainer}>
          <Image
            source={active ? images.checkmark : undefined}
            style={styles.editButtonImage}
          />
        </View>
      </View>
    </View>
  )

export default AvatarItem

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get('window').width / 3,
    alignItems: 'center',
    position: 'relative',
    marginVertical: 24,
  },
  image: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  selectAvatar: {
    borderRadius: 40,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0199F020',
  },
  hitSlop: {
    bottom: 10,
    right: 10,
    left: 10,
    top: 10,
  },
  editButtonImageContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -4,
    top: -6,
    backgroundColor: colors.primaryDark,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0199F0',
  },
  editButtonImage: {
    width: 10,
    height: 6,
    resizeMode: 'contain',
    tintColor: '#0199F0',
  },
})
