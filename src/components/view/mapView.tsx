import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

import React, {useRef} from 'react';
import { StyleSheet,  View,} from 'react-native';
import { useMap } from '../../../src/hooks';
import { mapStyles, mapStyle2, Colors } from '../../../src/utils';
import moment from 'moment';
import  SunCalc from 'suncalc';


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
          customMapStyle={determinetime()}
          ref={map}
        >
        </MapView>
      </View>
  );
};


export default mapView;


function determinetime() {
  var times = SunCalc.getTimes(new Date(),41.716667, 44.783333);
  // console.log('====================================');
  // console.log(times.sunset, moment(times.sunset).diff(moment()),  "times.sunset");
  // console.log('====================================');
  return moment(times.sunset).diff(moment()) > 0  ? mapStyle2 : mapStyles
}