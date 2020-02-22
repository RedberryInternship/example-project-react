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
import {View} from 'react-native'
import {useSafeArea} from 'react-native-safe-area-context'
import {HomeContextType, Charger, MapImperativeRefObject} from 'allTypes'

type HomeComponentItemsProps = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
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
      style={{position: 'relative', flex: 1, paddingTop: insets.top}}
      pointerEvents={'box-none'}>
      {Defaults.token ? null : (
        <BaseButton
          image={require('../../../assets/images/icons/user.png')}
          onPress={navigation.navigate.bind(HomeComponentItems, 'Auth')}
          text={'home.authorization'}
          style={{marginTop: 12}}
        />
      )}
      <View
        style={{zIndex: 44, elevation: 12, height: 100, flex: 1}}
        pointerEvents={'box-none'}>
        <OnMapRoundButton
          style={{
            backgroundColor: '#FFFFFF',
            width: 38,
            height: 38,
            borderRadius: 19,
            position: 'absolute',
            marginTop: 60,
            right: 24,
            alignSelf: 'flex-end',
          }}
          onPress={(): void => {
            mapRef.current?.locate()
          }}
          image={context.state.locationImageType}
          imageStyle={{width: 24, height: 24}}
        />
        <HomeMainInputView
          allChargers={allchargers}
          mapRef={mapRef}
          setShowAll={setShowAll}
          ref={mainInputRef}
        />
      </View>
      <View style={{flex: 0}} pointerEvents={'box-none'}>
        <OnMapRoundButton
          style={{right: 24, bottom: 138, backgroundColor: '#FFFFFF'}}
          onPress={(): void => {
            Defaults.modal.current &&
              Defaults.modal.current.customUpdate.bind(
                HomeComponentItems,
                true,
                {
                  type: 2,
                },
              )
          }}
          image={require('../../../assets/images/icons/ic_alert-circle.png')}
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
