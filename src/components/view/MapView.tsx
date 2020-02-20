import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps'

import React, {useMemo, RefObject, forwardRef, Ref, useRef} from 'react'
import {StyleSheet, View, StatusBar} from 'react-native'
import {useMap} from 'hooks'
import {mapStyles, mapStyle2, Colors} from 'utils'
import {Charger} from 'allTypes'
import {MapMarkerItem} from 'components'
import {determineTimePeriod} from 'utils'

type MapViewProps = {
  showAll: boolean
  filteredChargersOnMap: Charger[]
}

// eslint-disable-next-line react/display-name
const _mapView = forwardRef(
  ({showAll, filteredChargersOnMap}: MapViewProps, ref: Ref<MapView>) => {
    const mapRef: RefObject<MapView> = useRef(null)

    const hook = useMap(ref, mapRef)

    return (
      <View style={styles.mapContainer}>
        <StatusBar
          barStyle={determineTimePeriod() ? 'dark-content' : 'light-content'}
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 41.720787,
            longitude: 44.745651,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          // onKmlReady={()=>{}}
          onMapReady={hook.mapReady}
          showsUserLocation
          showsPointsOfInterest
          showsTraffic
          customMapStyle={determineTimePeriod() ? mapStyle2 : mapStyles}
          ref={mapRef}>
          {useMemo(
            () =>
              (showAll
                ? hook.state.AllChargers
                : filteredChargersOnMap
              )?.map((val: Charger) => (
                <MapMarkerItem
                  key={val.id}
                  lat={parseFloat(val.lat.toString())}
                  lng={parseFloat(val.lng.toString())}
                />
              )),

            [hook.state.AllChargers, showAll, filteredChargersOnMap],
          )}
          {useMemo(
            () => (
              <Polyline
                key={1.4}
                coordinates={hook.polyline}
                strokeWidth={4}
                strokeColor={Colors.faqBlue}
              />
            ),
            [hook.polyline],
          )}
        </MapView>
      </View>
    )
  },
)

export default _mapView

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
