import React from 'react'
import { View, StyleSheet } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { Charger, ChargerDetail } from 'types'
import { getLocaleText } from 'utils'
import { MainSearchItem } from '../index'
import { BottomSearchPanelResultFC } from './types'

const BottomSearchPanelResult: BottomSearchPanelResultFC = (
  {
    filteredChargers,
    onFilteredItemClick,
  },
) => (
    <View style={styles.bodyContainer}>
      {filteredChargers?.map((chargerObj: Charger) => {
        const view = []
        if (chargerObj.charger_group?.chargers?.length !== 0) {
          view.push(
            <MainSearchItem
              key={chargerObj.id}
              text={getLocaleText(chargerObj.location)}
              mainTitle={getLocaleText(chargerObj.name)}
              onPress={() => onFilteredItemClick(chargerObj as ChargerDetail)}
            />,
          )
        } else {
          chargerObj.charger_group?.chargers?.map((val) => view.push(
            <MainSearchItem
              key={val.id}
              text={getLocaleText(val.location)}
              mainTitle={getLocaleText(val.name)}
              onPress={() => onFilteredItemClick(val)}
            />,
          ))
        }
        return view
      })}
      <KeyboardSpacer />
    </View>
  )

export default BottomSearchPanelResult

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#023D63',
    paddingBottom: 16,
    marginTop: 0,
    minHeight: '100%',
  },
})
