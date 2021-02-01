import React, { useMemo } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  View,
} from 'react-native'
import { Colors } from 'utils'
import BaseNativeTouchable from 'components/BaseNativeTouchable'
import BaseText from 'components/BaseText'
import { BottomSearchPanelFilterItemFC } from './types'

const BottomSearchPanelFilterItem: BottomSearchPanelFilterItemFC = (
  {
    text,
    onPress,
    active,
  },
) => {
  const child = useMemo(
    () => (
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.container,
            { backgroundColor: active ? '#008AEE' : 'white' },
          ]}
        >
          <BaseText
            style={[
              styles.text,
              { color: active ? 'white' : Colors.primaryDark },
            ]}
          >
            {text}
          </BaseText>
        </View>
      </View>
    ),
    [text, active],
  )

  if (Platform.OS === 'ios') {
    return <TouchableOpacity onPress={onPress}>{child}</TouchableOpacity>
  }
  return (
    <BaseNativeTouchable borderless={false} onPress={onPress}>
      {child}
    </BaseNativeTouchable>
  )
}

export default React.memo(BottomSearchPanelFilterItem)

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
