import React, { useContext, ReactElement } from 'react'
import {
  withNavigation,
  NavigationParams,
  NavigationState,
  NavigationScreenProp,
} from 'react-navigation'
import { View, StyleSheet, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HomeContextType, Charger, MapImperativeRefObject } from 'allTypes'

import { BaseButton, MultiChargingTopModal } from 'components'
import { Defaults, Helpers } from 'utils'
import { HomeContext } from '../Home'
import images from 'assets/images'
import {
  HomeMainSearchView,
  HomeFilterView,
  OnMapRoundButton,
} from '../components'

type HomeMainComponentProps = {
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>
  allchargers: Charger[]
  mapRef: MapImperativeRefObject
  selectedFiltersOnMap: number[]
  onFilterClickOnMap: (index: number) => void
  setShowAll: (bool: boolean) => void
  mainInputRef: any
}

const HomeMainComponent = ({
  navigation,
  allchargers,
  mapRef,
  selectedFiltersOnMap,
  onFilterClickOnMap,
  setShowAll,
  mainInputRef,
}: HomeMainComponentProps): ReactElement => {
  const insets = useSafeAreaInsets()

  const context: HomeContextType = useContext(HomeContext)

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
      pointerEvents={'box-none'}
    >
      {Defaults.token ? null : (
        <BaseButton
          image={images.user}
          onPress={navigation?.navigate.bind(HomeMainComponent, 'Auth')}
          text={'home.authorization'}
          style={styles.authorizeBtn}
        />
      )}
      <View style={styles.onMapRoundContainer} pointerEvents={'box-none'}>
        <OnMapRoundButton
          style={styles.onMapRoundBtn}
          onPress={(): void => {
            Defaults.modal.current?.customUpdate(true, {
              type: 2,
            })
          }}
          image={images.alertCircle2}
        />
        <HomeMainSearchView
          allChargers={allchargers}
          mapRef={mapRef}
          setShowAll={setShowAll}
          ref={mainInputRef}
        />
      </View>
      <View style={styles.modalContainer} pointerEvents={'box-none'}>
        <View style={styles.modalOnMapRoundContainer}></View>
        
        <OnMapRoundButton
          style={styles.modalOnMapRound}
          onPress={(): void => {
            if (
              // Vobi Todo: this must be declared as function and validation in validationHelpers
              !Defaults.locationPermissionStatus.match(
                /denied|restricted|notDetermined/,
              )
            ) {
              mapRef.current?.locate()
            } else {
              Helpers.getAndRequestLocation()
            }
          }}
          image={context.state.locationImageType}
          imageStyle={styles.onMapRoundImage}
        />
        <HomeFilterView
          selectedFiltersOnMap={selectedFiltersOnMap}
          onFilterClickOnMap={onFilterClickOnMap}
        />
      </View>

      <MultiChargingTopModal />
    </View>
  )
}

export default withNavigation(React.memo(HomeMainComponent))

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  authorizeBtn: {
    marginTop: 12,
  },
  onMapRoundContainer: {
    zIndex: 44,
    elevation: 12,
    height: 100,
    flex: 1,
  },
  onMapRoundBtn: {
    backgroundColor: '#FFFFFF',
    width: 38,
    height: 38,
    borderRadius: 19,
    position: 'absolute',
    marginTop: 60,
    right: 24,
    alignSelf: 'flex-end',
  },
  onMapRoundImage: {
    width: 24,
    height: 24,
  },
  modalContainer: {
    flex: 0,
    position: 'relative',
  },
  modalOnMapRound: {
    right: 24,
    bottom: 138,
    backgroundColor: '#FFFFFF',
  },
  modalOnMapRoundContainer: {
    flex: 0,
    position: 'absolute',
    right: 0,
    bottom: 130,
    paddingRight: 24,
    paddingBottom: 60,
    backgroundColor: 'transparent',
  },
})
