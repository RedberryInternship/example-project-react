import React, { ReactElement, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { ScreenPropsWithNavigation } from 'allTypes'

import { BaseHeader } from 'components'
import { Colors, Const } from 'utils'
import useSettings from './useSettings'
import { SettingsListItem } from './components'

const Settings = ({ navigation }: ScreenPropsWithNavigation): ReactElement => {
  const { userData, onPressHandler } = useSettings(navigation)

  const SettingsListItems = useMemo(
    () => Const.SettingsListFields.map((item) => {
      const value: string = userData?.[item.type] ?? ''
      return (
        <SettingsListItem
          onPress={() => onPressHandler(item, value)}
          key={item.type}
          {...item}
          value={value}
        />
      )
    }),
    [userData],
  )

  return (
    <View style={styles.container}>
      <BaseHeader
        onPressLeft={navigation.navigate.bind(Settings, 'MainDrawer')}
        title="settings.settings"
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.listItemsContainer}>{SettingsListItems}</View>
        <View />
      </ScrollView>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  listItemsContainer: {
    marginTop: 35,
  },
})
