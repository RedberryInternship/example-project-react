import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

import React, {useRef} from 'react';
import { StyleSheet,  View, StatusBar,} from 'react-native';
import { useMap } from '../../../src/hooks';
import { mapStyles, mapStyle2, Colors } from '../../../src/utils';
import moment from 'moment';
import  SunCalc from 'suncalc';


const mapView = () => {
  // eslint-disable-next-line no-unused-vars
  const hook = useMap()

  return (
      <View style={styles.mapContainer}>
      <StatusBar barStyle={determinetime() ? "dark-content" : "light-content"} />

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
          onMapReady={hook.location.locate}
          showsUserLocation
          showsPointsOfInterest
          showsTraffic
          customMapStyle={determinetime() ? mapStyle2 : mapStyles}
          ref={hook.mapRef}
        >
        </MapView>
      </View>
  );
};


export default mapView;


function determinetime() {
  var times = SunCalc.getTimes(new Date(),41.716667, 44.783333);

  console.log('====================================');
  console.log(times.sunset,times.sunrise, moment(times.sunset).diff(moment()),  "times.sunset");
  console.log('====================================');

  return moment(moment()).isBetween(times.sunrise,times.sunset ) 
}



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
