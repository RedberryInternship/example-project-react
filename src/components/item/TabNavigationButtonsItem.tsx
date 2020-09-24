import React, { ReactElement } from 'react'
import { Image, ImageSourcePropType, StyleSheet } from 'react-native'
import BaseNativeTouchable from 'components/baseUI/BaseNativeTouchable'
import Colors from 'utils/colors'

type TabNavigationButtonsItemProps = {
  navigate: () => void
  image: ImageSourcePropType
  active: boolean
}

/** Vobi Done: no inline styles */
const TabNavigationButtonsItem = ({
  navigate,
  image,
  active,
}: TabNavigationButtonsItemProps): ReactElement => {
  return (
    <BaseNativeTouchable onPress={navigate} style={styles.baseNativeTouchable}>
      <Image
        source={image}
        style={[
          styles.image,
          { tintColor: active ? Colors.secondaryBlue : Colors.primaryGray },
        ]}
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
  },
  baseNativeTouchable: { height: '80%', justifyContent: 'center' },
})
