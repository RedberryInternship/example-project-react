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

  const {
    mapRef,
    showAll,
    onMapFilteredChargers,
    context,
    selectedFiltersOnMap,
    onFilterClickOnMap,
    setShowAll,
    mainInputRef,
    bottomSheetRef,
    onFilterClick,
    selectedFilters,
    onFilteredItemClick,
    bottomSheetChargers,
    searchInputTextChangeHandler,
  } = useHome(navigation)

  return (
    <HomeContext.Provider value={{state, dispatch}}>
      <View style={styles.mainContainer}>
        <MapView
          ref={mapRef}
          showAll={showAll}
          filteredChargersOnMap={onMapFilteredChargers}
          navigation={navigation}
        />
        <HomeMainComponent
          allchargers={context?.state.AllChargers ?? []}
          mapRef={mapRef}
          selectedFiltersOnMap={selectedFiltersOnMap}
          onFilterClickOnMap={onFilterClickOnMap}
          setShowAll={setShowAll}
          mainInputRef={mainInputRef}
        />
        <BottomSheetReanimated
          ref={bottomSheetRef}
          onFilterClick={onFilterClick}
          selectedFilters={selectedFilters}
          onFilteredItemClick={onFilteredItemClick}
          filteredChargers={bottomSheetChargers ?? []}
          textHandler={searchInputTextChangeHandler}
        />
      </View>
    </HomeContext.Provider>
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
