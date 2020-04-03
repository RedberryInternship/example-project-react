import React, {useMemo, RefObject, forwardRef, Ref, useRef} from 'react'
import {StyleSheet, View, StatusBar} from 'react-native'
import Map, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps'
import {
  NavigationParams,
  NavigationState,
  NavigationScreenProp,
} from 'react-navigation'

import {Charger} from 'allTypes'

import {useMap} from 'hooks'
import {mapStyles, mapStyle2, Colors} from 'utils'
import {MapMarkerItem} from 'components'
import {determineTimePeriod} from 'utils'
type MapViewProps = {
  showAll: boolean
  filteredChargersOnMap: Charger[]
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

// Vobi Todo: remove line below and fix naming
// Redberry: if I remove line bellow it shows me an errror and I don't know why
// eslint-disable-next-line react/display-name
const MapView = forwardRef(
  (
    {showAll, filteredChargersOnMap, navigation}: MapViewProps,
    ref: Ref<Map>,
  ) => {
    const mapRef: RefObject<Map> = useRef(null)

    const hook = useMap(ref, mapRef, navigation)

    const statusBarStyle = useMemo(
      () => (determineTimePeriod() ? 'dark-content' : 'light-content'),
      [],
    )

    const pins = useMemo(
      () =>
        (showAll
          ? hook.state?.AllChargers
          : filteredChargersOnMap
        )?.map((charger: Charger) => (
          <MapMarkerItem
            key={charger.id}
            lat={parseFloat(charger.lat.toString())}
            lng={parseFloat(charger.lng.toString())}
            onPress={hook.onMarkerPress.bind(this, charger)}
            connectorType={charger.charger_types?.[0]?.name}
            publicCharger={charger.public}
            active={charger.active}
          />
        )),

      [hook.state?.AllChargers, showAll, filteredChargersOnMap],
    )

    const polyline = useMemo(
      () => (
        <Polyline
          key={1.4}
          coordinates={hook.polyline}
          strokeWidth={4}
          strokeColor={Colors.faqBlue}
        />
      ),
      [hook.polyline],
    )
    return (
      <View style={styles.mapContainer}>
        <StatusBar
          barStyle={statusBarStyle ? 'dark-content' : 'light-content'}
        />
        <Map
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 41.720787,
            longitude: 44.745651,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onMapReady={hook.mapReady}
          showsUserLocation
          showsPointsOfInterest
          showsTraffic
          customMapStyle={statusBarStyle ? mapStyle2 : mapStyles}
          ref={mapRef}>
          {pins}
          {polyline}
        </Map>
      </View>
    )
  },
)

export default MapView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.primaryBackground,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primaryBackground,
  },
})
