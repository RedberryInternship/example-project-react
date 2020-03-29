import React, {ReactElement, useRef, useContext, useEffect} from 'react'
import {View, StyleSheet, Alert} from 'react-native'

// components
import {
  BaseHeader,
  SettingsListItem,
  BasePickerSelect,
  useBaseActionSheetPicker,
} from 'components'

// utils
import {Colors, Const} from 'utils'
import {ScrollView} from 'react-native-gesture-handler'

// hooks
import {useSettings} from 'hooks'

import {ScreenPropsWithNavigation} from 'allTypes'
import {useTranslation} from 'react-i18next'
import {AppContext} from '../../../App'
import {editUserInfo} from 'hooks/actions/rootActions'

const Settings = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const context: any = useContext(AppContext)
  const {selectedItem, renderPicker} = useBaseActionSheetPicker()
  const {
    makeSettingsInfo,
    makeValue,
    isValueAdded,
    determineColor,
  } = useSettings()

  const settingsInfo = makeSettingsInfo()

  useEffect(() => {
    if (selectedItem) {
      editUserInfo(context.dispatch, selectedItem, 'mapMode')
    }
  }, [selectedItem])

  const onPressHandler = (item, value): void => {
    if (item.type === 'mapColorChange') {
      renderPicker([
        'settings.automatic',
        'settings.mapColorLight',
        'settings.mapColorDark',
      ])
    } else {
      navigation.navigate.bind(Settings, 'ProfileChange', {
        type: item.type,
        name: item.editableComponentName,
        value: value,
      })
    }
  }

  const SettingsListItems = Const.SettingsListFields.map((item, key) => {
    const value = makeValue(key, settingsInfo)

    return (
      <SettingsListItem
        name={item.name}
        onPress={() => onPressHandler(item, value)}
        key={item.type}
        image={item.image}
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
