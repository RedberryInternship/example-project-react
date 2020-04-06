import React, {createContext, useReducer, useMemo, ReactElement} from 'react'
import {StyleSheet, View} from 'react-native'

import {ScreenPropsWithNavigation} from 'allTypes'

import {Colors} from 'utils'
import reducer, {initialState} from 'hooks/reducers/homeReducers'
import {useHome} from './hooks'
import {MapView, HomeMainComponent, BottomSheetReanimated} from './components'

export const HomeContext = createContext({})

const Home = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const hook = useHome(navigation)

  return useMemo(
    () => (
      <HomeContext.Provider value={{state, dispatch}}>
        <View style={styles.mainContainer}>
          <MapView
            ref={hook.mapRef}
            showAll={hook.showAll}
            filteredChargersOnMap={hook.onMapFilteredChargers}
            navigation={navigation}
          />
          <HomeMainComponent
            allchargers={hook.context?.state.AllChargers ?? []}
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
            filteredChargers={hook.bottomSheetChargers ?? []}
            textHandler={hook.searchInputTextChangeHandler}
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
