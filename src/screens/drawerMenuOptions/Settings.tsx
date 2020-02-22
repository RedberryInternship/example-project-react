import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'

// components
import {BaseHeader, SettingsListItem} from 'components'

// utils
import {Colors, Const} from 'utils'
import {ScrollView} from 'react-native-gesture-handler'

// hooks
import {useSettings} from 'hooks'

import {ScreenPropsWithNavigation} from 'allTypes'

const Settings = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const {
    makeSettingsInfo,
    makeValue,
    isValueAdded,
    determineColor,
  } = useSettings()

  const settingsInfo = makeSettingsInfo()

  const SettingsListItems = Const.SettingsListFields.map((Item, key) => {
    const value = makeValue(key, settingsInfo)

    return (
      <SettingsListItem
        name={Item.name}
        onPress={navigation.navigate.bind(Settings, 'ProfileChange', {
          type: Item.type,
          name: Item.editableComponentName,
          value: value,
        })}
        key={Item.type}
        image={Item.image}
        value={value}
        confirmed={isValueAdded(key, settingsInfo)}
        valueColor={determineColor(key, settingsInfo)}
      />
    )
  })

  return (
    <View style={styles.container}>
      <BaseHeader
        onPressLeft={navigation.navigate.bind(Settings, 'MainDrawer')}
        title={'settings.settings'}
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles.listItemsContainer}>{SettingsListItems}</View>
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
