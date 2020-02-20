import React, {createContext, useReducer, useMemo, ReactElement} from 'react'
import {StyleSheet, View} from 'react-native'

import {MapView, HomeComponentItems, BottomSheetReanimated} from 'components'
import {Colors} from 'utils'
import reducer, {initialState} from 'hooks/reducers/homeReducers'
import {useHomeHook} from 'hooks'
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
} from 'react-navigation'

export const HomeContext = createContext({})

type HomeProps = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}
const Home = ({navigation}: HomeProps): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const hook = useHomeHook(navigation)

  return useMemo(
    () => (
      <HomeContext.Provider value={{state, dispatch}}>
        <View style={styles.mainContainer}>
          <MapView
            ref={hook.mapRef}
            showAll={hook.showAll}
            filteredChargersOnMap={hook.filteredChargersOnMap}
          />
          <HomeComponentItems
            allchargers={hook.context.state.AllChargers}
            mapRef={hook.mapRef}
            selectedFiltersOnMap={hook.selectedFiltersOnMap}
            onFilterClickOnMap={hook.onFilterClickOnMap}
            setShowAll={hook.setShowAll}
            mainInputRef={hook.mainInputRef}
          />
          <BottomSheetReanimated
            ref={hook.bottomSheetRef}
            onFilterClick={hook.onFilterClick}
            selectedFilters={hook.selectedFilters}
            onFilteredItemClick={hook.onFilteredItemClick}
            filteredChargers={hook.filteredChargers}
            textHandler={hook.searchInputTextChangeHandler}
            inputSubmit={hook.searchInputTextSubmit}
          />
        </View>
      </HomeContext.Provider>
    ),
    [hook],
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.primaryBackground,
  },
})

export default Home
