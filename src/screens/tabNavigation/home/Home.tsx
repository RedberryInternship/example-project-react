import React, { createContext, useReducer, useMemo, ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'

import { ScreenPropsWithNavigation } from 'allTypes'

import { Defaults, Colors } from 'utils'
import reducer, { initialState } from 'hooks/reducers/homeReducers'
import { useHome } from './hooks'
import {
  MapView,
  HomeMainComponent,
  BottomSheetModalize,
} from './components'

export const HomeContext = createContext({})

const Home = ({ navigation }: ScreenPropsWithNavigation): ReactElement => {
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

  return useMemo(
    () => (
      <HomeContext.Provider value={{ state, dispatch }}>
        <View style={styles.mainContainer}>
          <MapView
            key={Defaults?.userDetail?.mapMode}
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
          {/* <BottomSheetReanimated
          ref={bottomSheetRef}
          onFilterClick={onFilterClick}
          selectedFilters={selectedFilters}
          onFilteredItemClick={onFilteredItemClick}
          filteredChargers={bottomSheetChargers ?? []}
          textHandler={searchInputTextChangeHandler}
        /> */}
          {
            context?.state.AllChargers?.length &&
            <BottomSheetModalize
              ref={bottomSheetRef}
              onFilterClick={onFilterClick}
              selectedFilters={selectedFilters}
              onFilteredItemClick={onFilteredItemClick}
              filteredChargers={
                bottomSheetChargers
              }
              textHandler={searchInputTextChangeHandler}
            />
          }
        </View>
      </HomeContext.Provider>
    ),
    [
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
    ],
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.primaryBackground,
  },
})

export default React.memo(Home)
