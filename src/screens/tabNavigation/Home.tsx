import React, {createContext, useReducer, useMemo, ReactElement} from 'react'
import {StyleSheet, View} from 'react-native'

import {MapView, HomeComponentItems, BottomSheetReanimated} from 'components'
import {Colors} from 'utils'
import reducer, {initialState} from 'hooks/reducers/homeReducers'
import {useHomeHook} from 'hooks'
import {ScreenPropsWithNavigation} from 'allTypes'

export const HomeContext = createContext({})

const Home = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
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
            allchargers={hook.context?.state.AllChargers}
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
