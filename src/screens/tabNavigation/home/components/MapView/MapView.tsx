import React, {
  forwardRef,
  RefObject,
  useMemo,
  useRef,
} from 'react'
import { StyleSheet, View } from 'react-native'
import Map, {
  PROVIDER_GOOGLE,
} from 'react-native-maps'
import { Colors } from 'utils'
import { determineTimePeriod } from 'utils/map'
import { darkMode, lightMode } from './mapStyles'
import { MapViewProps } from './types'
import { Pins, Polyline } from '../index'
import useMapView from './useMapView'

const MapView = forwardRef<Map, MapViewProps>(
  (
    {
      showAll,
      filteredChargersOnMap,
    },
    ref,
  ) => {
    const mapRef: RefObject<Map> = useRef(null)

    const {
      onMarkerPress,
      mapReady,
      polyline,
    } = useMapView(
      {
        mapRef,
        ref,
      },
    )

    return useMemo(() => (
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
          showsPointsOfInterest={false}
          showsTraffic={false}
          customMapStyle={determineTimePeriod() ? darkMode : lightMode}
          ref={mapRef}
          showsCompass={false}
          loadingBackgroundColor={determineTimePeriod() ? Colors.primaryBackground : 'white'}
          showsMyLocationButton={false}
        >
          <Pins
            showAll={showAll}
            filteredChargersOnMap={filteredChargersOnMap}
            onMarkerPress={onMarkerPress}
          />
          <Polyline polyline={polyline} />
        </Map>
      </View>
    ), [
      filteredChargersOnMap,
      onMarkerPress,
      mapReady,
      polyline,
      showAll,
      mapRef,
    ])
  },
)

export default React.memo(MapView)

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
