import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

import React, {useMemo} from 'react';
import { StyleSheet,  View, StatusBar,} from 'react-native';
import { useMap } from '../../../src/hooks';
import { mapStyles, mapStyle2, Colors } from '../../../src/utils';
import moment from 'moment';
import  SunCalc from 'suncalc';
import { Chargers } from '../../../@types/allTypes';
import { MapMarkerItem } from '..';


const mapView = () => {
  const hook = useMap()

  return (
      <View style={styles.mapContainer}>
      <StatusBar barStyle={determinetime() ? "dark-content" : "light-content"} />

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
          customMapStyle={determinetime() ? mapStyle2 : mapStyles}
          ref={hook.mapRef}
        >
          {
            useMemo(() =>
              hook.state.AllChargers?.map((val : Chargers , index : number) => 
                  (<MapMarkerItem
                    key={index}
                    lat={parseFloat( val.lat.toString() )}
                    lng={parseFloat( val.lng.toString() )}
                  />)
                )
            , [hook.state])
          }
          
          
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
