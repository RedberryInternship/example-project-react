import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import { BaseHeader, BaseButton } from 'components'
import { Colors } from 'utils'
import images, { Avatars } from 'assets/images'
import { ScreenPropsWithNavigation } from 'allTypes'
import AvatarItem from './AvatarItem'
import useChooseAvatar from './useChooseAvatar'

const ChooseAvatar = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const { updateAvatar, activeAvatar, onAvatarPress } = useChooseAvatar(
    navigation,
  )
  return (
    <View style={styles.container}>
      <BaseHeader
        title="drawer.changeAvatar"
        onPressLeft={navigation.navigate.bind(ChooseAvatar, 'Home')}
      />
      <View style={styles.avatarsWrapper}>
        <View style={styles.avatarsContainer}>
          {Avatars.map((image, index) => (
            <AvatarItem
              key={index}
              image={image}
              active={
                activeAvatar !== undefined ? index === activeAvatar : false
              }
              onPress={onAvatarPress.bind(ChooseAvatar, index)}
            />
          ))}
        </View>
      </View>
      <BaseButton
        onPress={updateAvatar}
        text="save"
        image={images.arrowLeft}
        isImageRight
      />
    </View>
  )
}

export default ChooseAvatar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: Colors.primaryBackground,
  },
  avatarsWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  avatarsContainer: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
