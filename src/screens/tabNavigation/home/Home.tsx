import React, { useMemo, ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScreenPropsWithNavigation } from 'allTypes'
import { Defaults, Colors } from 'utils'
import { useHome } from './hooks'
import { MapView, HomeMainComponent, BottomSheetModalize } from './components'

const Home = ({ navigation }: ScreenPropsWithNavigation): ReactElement => {
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

  console.log(['Home - Layer'])

  return useMemo(
    () => (
      <View style={styles.mainContainer}>
        <MapView
          key={Defaults?.userDetail?.mapMode}
          ref={mapRef}
          showAll={showAll}
          filteredChargersOnMap={onMapFilteredChargers}
          navigation={navigation}
        />
        <HomeMainComponent
          allchargers={context?.state?.AllChargers ?? []}
          mapRef={mapRef}
          selectedFiltersOnMap={selectedFiltersOnMap}
          onFilterClickOnMap={onFilterClickOnMap}
          setShowAll={setShowAll}
          mainInputRef={mainInputRef}
        />
        {context?.state?.AllChargers?.length && (
          <BottomSheetModalize
            ref={bottomSheetRef}
            onFilterClick={onFilterClick}
            selectedFilters={selectedFilters}
            onFilteredItemClick={onFilteredItemClick}
            filteredChargers={bottomSheetChargers}
            textHandler={searchInputTextChangeHandler}
          />
        )}
      </View>
    ),
    [
      mapRef,
      showAll,
      onMapFilteredChargers,
      context.state,
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

export default Home
