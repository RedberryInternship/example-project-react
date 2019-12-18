import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

import React, {useRef} from 'react';
import { StyleSheet,  View,} from 'react-native';
import { useMap } from '../../../src/hooks';
import { mapStyles, Colors } from '../../../src/utils';


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
    backgroundColor:Colors.primaryBackground

  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:Colors.primaryBackground
  },
});

const mapView = () => {
  const map = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const mapHook = useMap({map})


  return (
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE} 
          style={styles.map}
          region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
          }}
          onKmlReady={()=>{}}
          onMapReady={()=>{}}
          showsUserLocation
          showsPointsOfInterest
          showsTraffic
          customMapStyle={mapStyles}
          ref={map}
        >
        </MapView>
      </View>
  );
};


export default mapView;
