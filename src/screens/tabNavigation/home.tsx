import React, { createContext, useReducer, useMemo, useCallback} from 'react';// Vobi Todo: remove unused imports
import {
  StyleSheet,
  View,
} from 'react-native';

import { MapView, CollapsibleModal, HomeComponentItems } from '../../components';// Vobi Todo: remove unused imports
import { Colors } from '../../../src/utils';
import BottomSheetReanimated from '../../../src/components/view/bottomSheetReanimated';
import reducer, { initialState } from '../../../src/hooks/reducers/homeReducers';
import  { useHomeHook } from '../../../src/hooks';
import { NavigationParams, NavigationScreenProp,NavigationState } from 'react-navigation';// Vobi Todo: remove unused imports
export const HomeContext = createContext()

const Home = ({navigation} : any ) => {

  const [state, dispatch] = useReducer(reducer, initialState )

  const hook = useHomeHook(navigation)

  return useMemo (() =>(
    <HomeContext.Provider value={{state, dispatch}}>
      <View style={styles.mainContainer}>
        <MapView mapRef={hook.mapRef} 
          showAll={hook.showAll}
          filteredChargersOnMap={hook.filteredChargersOnMap}
        />
        <HomeComponentItems 
          allchargers={hook.context.state.AllChargers}
          mapRef={hook.mapRef}
          selectedFiltersOnMap={hook.selectedFiltersOnMap}
          onFilterClickOnMap={hook.onFilterClickOnMap}
          setShowAll={hook.setShowAll}
        />
        <BottomSheetReanimated 
          ref={ hook.bottomSheetRef } 
          onFilterClick={ hook.onFilterClick } 
          selectedFilters={ hook.selectedFilters } 
          onFilteredItemClick={ hook.onFilteredItemClick }
          filteredChargers={hook.filteredChargers }
          textHandler={hook.searchInputTextChangeHandler}
          inputSubmit={hook.searchInputTextSubmit}
        />
      </View>
    </HomeContext.Provider>
  ),
  [hook, ] ); // Vobi Todo: what is purpose of [hook, ] use [hook]
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position:"relative",
    backgroundColor: Colors.primaryBackground,
    // minHeight : Const.Height
  },
});

export default Home;
