import React, {useEffect, useState,useRef, useCallback} from "react";
import {AppState, Keyboard, Alert, } from "react-native"
import { Defaults, NavigationActions, regionFrom } from "../utils";


import RNLocation, {Location, LocationPermissionStatus} from 'react-native-location';


type Ref = {
  interval : number,
  location : Location[]| null,

}
const ZOOM_LEVEL : number = 400;

export default function  useLocation({SetLoading, mapRef} : any){

    const [location, setLocation] = useState<Location[]| null>(null);
    const [permissionStatus, setPermissionStatus] = useState<LocationPermissionStatus | null>(null);

    const ref = useRef<Ref>({interval : 0, location : null })



    useEffect(() => {
      let subscribedLocation = RNLocation.subscribeToLocationUpdates(subscribeToLocationStatus)
      let subscribedPermissionUpdate = RNLocation.subscribeToPermissionUpdates(subscribePermissionUpdate);

      RNLocation.getLatestLocation({ timeout: 60000 })
        .then(getLatestLocation)

      RNLocation.getCurrentPermission()
        .then(getPermissionStatus)
        
      return() =>{
        subscribedLocation()
        subscribedPermissionUpdate()
        clearInterval(ref.current.interval)
      }
    }, [])

    const subscribeToLocationStatus = (_location : Location[]) => {
      ref.current.location=_location;
      SetLoading(false)
      //   setLocation(ref.current.location);
      //   mapRef.current.fitToCoordinates(newProps.data.polyline, {
      //     edgePadding: {
      //         top: 20,
      //         right: 20,
      //         bottom: 100,
      //         left: 20
      //     }, animated: true
      // })
    }
    const subscribePermissionUpdate = (status : LocationPermissionStatus) => {
      setPermissionStatus(status);
      console.log(status, "LocationPermissionStatus");
      if( status.match(/ denied | restricted | notDetermined /) ){
        navigateToLocation(mapRef)
      }
    }

    const getLatestLocation = (_location : Location | null) => {
      setLocation(_location as Location[] | null)
      navigateToLocation(mapRef)
    }

    const getPermissionStatus = (status : LocationPermissionStatus) => {
      setPermissionStatus(status)
      navigateToLocation(mapRef)

    }



    useEffect(() => {

    }, [location])

    return {ref, permissionStatus, location}
}


const navigateToLocation = (mapRef : any) => {
  RNLocation.getLatestLocation({ timeout: 60000 })
  .then(latestLocation => {
    if(latestLocation !== null)
      mapRef.current && mapRef.current.animateToRegion(
        regionFrom(latestLocation.latitude, latestLocation.longitude, ZOOM_LEVEL),
        400,
      )
})
}