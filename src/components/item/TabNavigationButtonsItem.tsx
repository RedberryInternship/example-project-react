import React, {ReactElement} from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native'
import BaseNativeTouchable from 'components/baseUI/BaseNativeTouchable'

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
    <BaseNativeTouchable
      onPress={navigate}
      {/** Vobi Todo: no inline styles */}
      style={{height: '80%', justifyContent: 'center'}}
    >
      <Image
        source={image}
        style={[styles.image, {tintColor: active ? '#008AEE' : '#9A99A2'}]}
      />
    </BaseNativeTouchable>
  )
}

export default TabNavigationButtonsItem

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    // marginTop: 10,
  },
})
