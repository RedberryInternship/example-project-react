import React, {ReactElement} from 'react'
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native'

type TabNavigationButtonsItemProps = {
  navigate: () => void
  image: ImageSourcePropType
  active: boolean
}
const TabNavigationButtonsItem = ({
  navigate,
  image,
  active,
}: TabNavigationButtonsItemProps): ReactElement => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      hitSlop={{
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      }}
      onPress={navigate}>
      <Image
        source={image}
        style={[styles.image, {tintColor: active ? '#008AEE' : '#9A99A2'}]}
      />
    </TouchableOpacity>
  )
}

export default TabNavigationButtonsItem

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginTop: 10,
  },
})
