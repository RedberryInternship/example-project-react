import React, {useContext, ReactElement} from 'react'
import {
  withNavigation,
  NavigationParams,
  NavigationState,
  NavigationScreenProp,
} from 'react-navigation'
import {
  OnMapRoundButton,
  HomeFilterView,
  BaseButton,
  HomeMainInputView,
  MultiChargingTopModal,
} from 'components'
import {Defaults} from 'utils'
import {HomeContext} from 'screens/tabNavigation/Home'
import {View, StyleSheet} from 'react-native'
import {useSafeArea} from 'react-native-safe-area-context'
import {HomeContextType, Charger, MapImperativeRefObject} from 'allTypes'
import Imgs from '../../../assets/images'

type HomeComponentItemsProps = {
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>
  allchargers: Charger[]
  mapRef: MapImperativeRefObject
  selectedFiltersOnMap: number[]
  onFilterClickOnMap: (index: number) => void
  setShowAll: (bool: boolean) => void
  mainInputRef: any
}
const HomeComponentItems = ({
  navigation,
  allchargers,
  mapRef,
  selectedFiltersOnMap,
  onFilterClickOnMap,
  setShowAll,
  mainInputRef,
}: HomeComponentItemsProps): ReactElement => {
  const insets = useSafeArea()

  const context: HomeContextType = useContext(HomeContext)

  return (
    <View
      style={[styles.container, {paddingTop: insets.top}]}
      pointerEvents={'box-none'}>
      {Defaults.token ? null : (
        <BaseButton
          image={Imgs.user}
          onPress={navigation.navigate.bind(HomeComponentItems, 'Auth')}
          text={'home.authorization'}
          style={styles.authorizeBtn}
        />
      )}
      <View style={styles.onMapRoundContainer} pointerEvents={'box-none'}>
        <OnMapRoundButton
          style={styles.onMapRoundBtn}
          onPress={(): void => {
            mapRef.current?.locate()
          }}
          image={context.state.locationImageType}
          imageStyle={styles.onMapRoundImage}
        />
        <HomeMainInputView
          allChargers={allchargers}
          mapRef={mapRef}
          setShowAll={setShowAll}
          ref={mainInputRef}
        />
      </View>
      <View style={styles.modalContainer} pointerEvents={'box-none'}>
        <OnMapRoundButton
          style={styles.modalOnMapRound}
          onPress={(): void => {
            Defaults.modal.current?.customUpdate(true, {
              type: 2,
            })
          }}
          image={Imgs.alertCircle2}
        />
        <HomeFilterView
          context={context}
          selectedFiltersOnMap={selectedFiltersOnMap}
          onFilterClickOnMap={onFilterClickOnMap}
        />
      </View>

      <MultiChargingTopModal />
    </View>
  )
}

export default withNavigation(HomeComponentItems)

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
  },
  modalOnMapRound: {
    right: 24,
    bottom: 138,
    backgroundColor: '#FFFFFF',
  },
})
