import React, {ReactElement, useMemo} from 'react'
import {StyleSheet, Text, Platform, TouchableOpacity, View} from 'react-native'

import {Colors} from 'utils'
import {BaseNativeTouchable, BaseText} from 'components'

type BottomSheetFilterItemProps = {
  text: string
  onPress: () => void
  active: boolean
}

const BottomSheetFilterItem = ({
  text,
  onPress,
  active,
}: BottomSheetFilterItemProps): ReactElement => {
  const child = useMemo(
    () => (
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.container,
            {backgroundColor: active ? '#008AEE' : 'white'},
          ]}
        >
          <BaseText
            style={[
              styles.text,
              {color: active ? 'white' : Colors.primaryDark},
            ]}
          >
            {text}
          </BaseText>
        </View>
      </View>
    ),
    [text],
  )
  return (
    <>
      {Platform.OS === 'ios' ? (
        <TouchableOpacity onPress={onPress}>{child}</TouchableOpacity>
      ) : (
        <BaseNativeTouchable borderless={false} onPress={onPress}>
          {child}
        </BaseNativeTouchable>
      )}
    </>
  )
}

export default BottomSheetFilterItem

const styles = StyleSheet.create({
  mainContainer: {
    minWidth: '33.33%',
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  container: {
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    backgroundColor: 'white',
    marginVertical: 6,
  },
  text: {
    fontSize: 11,
  },
})
