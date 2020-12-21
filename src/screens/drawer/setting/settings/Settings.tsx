import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { BaseHeader } from 'components'
import * as Const from 'utils/const'
import colors from 'utils/colors'
import { FCWithNavigation } from 'types'
import useSettings from './useSettings'
import { SettingsListItem } from './components'

const Settings: FCWithNavigation = ({ navigation }) => {
  const { userData, onPressHandler } = useSettings(navigation)

  const SettingsListItems = useMemo(
    () => Const.SettingsListFields.map((item) => {
      const value: string = userData?.[item.type] ?? ''
      return (
        <SettingsListItem
          onPress={() => onPressHandler(item, value)}
          key={item.type}
          onEmptyText={item.onEmptyText}
          image={item.image}
          color={item.color}
          name={item.name}
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
      <ScrollView style={styles.listItemsScrollView}>
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
    backgroundColor: colors.primaryBackground,
  },
  listItemsContainer: {
    marginTop: 35,
  },
  listItemsScrollView: {
    flex: 1,
  },
})
