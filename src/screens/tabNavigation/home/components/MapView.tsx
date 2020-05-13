import React, {useMemo, RefObject, forwardRef, Ref, useRef} from 'react'
import {StyleSheet, View, StatusBar} from 'react-native'
import Map, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps'
import {
  NavigationParams,
  NavigationState,
  NavigationScreenProp,
} from 'react-navigation'

import {Charger} from 'allTypes'

import {mapStyles, mapStyle2, Colors} from 'utils'
import {MapMarkerItem} from 'components'
import {determineTimePeriod} from 'utils'
import {useMapView} from '../hooks'

type MapViewProps = {
  showAll: boolean
  filteredChargersOnMap: Charger[]
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

// eslint-disable-next-line react/display-name
const MapView = forwardRef(
  (
    {showAll, filteredChargersOnMap, navigation}: MapViewProps,
    ref: Ref<Map>,
  ) => {
    const mapRef: RefObject<Map> = useRef(null)

    const {state, onMarkerPress, polyline, mapReady} = useMapView(
      ref,
      mapRef,
      navigation,
    )

    const pins = useMemo(
      () =>
        (showAll
          ? state?.AllChargers
          : filteredChargersOnMap
        )?.map((charger: Charger) => (
          <MapMarkerItem
            key={charger.id}
            lat={parseFloat(charger.lat.toString())}
            lng={parseFloat(charger.lng.toString())}
            onPress={() => onMarkerPress(charger)}
            fastCharger={charger.connector_types?.[0]?.name !== 'Type 2'}
            privateCharger={!charger.public}
            active={!!charger.active}
            free={charger.is_free}
            groupChargerCount={charger.charger_group?.chargers?.length ?? 0}
          />
        )),

      [state?.AllChargers, showAll, filteredChargersOnMap],
    )

    const polylineRoute = useMemo(
      () => (
        <>
          <Polyline
            key={1.4}
            coordinates={polyline}
            strokeWidth={8}
            strokeColor={Colors.primaryGreen}
            zIndex={Number.MAX_VALUE}
            geodesic={true}
          />
          <Polyline
            key={1}
            coordinates={polyline}
            strokeWidth={4}
            fillColor={Colors.primaryBlue}
            zIndex={Number.MAX_VALUE}
          />
        </>
      ),
      [polyline],
    )

    return (
      <View style={styles.mapContainer}>
        <Map
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 41.720787,
            longitude: 44.745651,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onMapReady={mapReady}
          showsUserLocation
          showsPointsOfInterest
          showsTraffic
          customMapStyle={determineTimePeriod() ? mapStyle2 : mapStyles}
          ref={mapRef}
        >
          {pins}
          {polylineRoute}
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
