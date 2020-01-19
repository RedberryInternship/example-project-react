import React, {useEffect, useState,useRef, useCallback, RefObject} from "react";
import { Defaults, NavigationActions } from "../utils";

import RNLocation, {Location} from 'react-native-location';
import useLocation from "./locationHook";
import  { MapView } from 'react-native-maps'; 


export default function  useMap(){

  const mapRef : RefObject<MapView> = useRef(null);


  const location = useLocation({mapRef})



  return {
    mapRef,
    location
  }
}