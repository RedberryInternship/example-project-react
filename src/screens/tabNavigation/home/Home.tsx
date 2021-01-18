import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import { FCWithNavigation } from 'types'
import colors from 'utils/colors'
import defaults from 'utils/defaults'
import useHome from './useHome'
import {
  BottomSearchPanel,
  HomeMainComponent,
  MapView,
} from './components'

const Home: FCWithNavigation = ({ navigation }) => {
  const {
    setBottomPanelSearchInputText,
    bottomSearchPanelChargers,
    onMapFilteredChargers,
    onFilteredItemClick,
    selectedFiltersOnMap,
    handleMapFilterClick,
    selectedFilters,
    bottomSheetRef,
    onFilterClick,
    mainInputRef,
    setShowAll,
    showAll,
    mapRef,
  } = useHome(navigation)

  const state = useSelector(selectUser)

  return useMemo(
    () => (
      <View style={styles.mainContainer}>
        <MapView
          key={defaults?.userDetail?.mapMode}
          showAll={showAll}
          filteredChargersOnMap={onMapFilteredChargers}
          navigation={navigation}
          ref={mapRef}
        />
        <HomeMainComponent
          allChargers={state?.AllChargers ?? []}
          mapRef={mapRef}
          setShowAll={setShowAll}
          mainInputRef={mainInputRef}
          selectedFiltersOnMap={selectedFiltersOnMap}
          handleMapFilterClick={handleMapFilterClick}
        />
        {
          state?.AllChargers?.length
            ? (
              <BottomSearchPanel
                ref={bottomSheetRef}
                onFilterClick={onFilterClick}
                selectedFilters={selectedFilters}
                onFilteredItemClick={onFilteredItemClick}
                filteredChargers={bottomSearchPanelChargers}
                textHandler={setBottomPanelSearchInputText}
              />
            )
            : null
        }
      </View>
    ),
    [
      setBottomPanelSearchInputText,
      bottomSearchPanelChargers,
      onMapFilteredChargers,
      selectedFiltersOnMap,
      handleMapFilterClick,
      onFilteredItemClick,
      selectedFilters,
      bottomSheetRef,
      onFilterClick,
      mainInputRef,
      setShowAll,
      navigation,
      showAll,
      mapRef,
      state,

    ],
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.primaryBackground,
  },
})

export default Home
