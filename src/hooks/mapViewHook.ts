import React, {useEffect, useState,useRef, useContext, RefObject} from "react";
import { Defaults, NavigationActions, Ajax } from "../utils";

import RNLocation, {Location} from 'react-native-location';
import useLocation from "./locationHook";
import  { MapView } from 'react-native-maps'; 
import { Chargers, AppContextType } from "../../@types/allTypes";
import { getAllChargers } from "./actions/rootActions";
import { AppContext } from "../../App";
import { Alert, StatusBar } from "react-native";
import { determineTimePeriod } from "../../src/utils/mapAndLocation/mapFunctions";



export default function  useMap(mapRef){

  const {state, dispatch} : AppContextType  = useContext(AppContext)

  // const mapRef : RefObject<MapView> = useRef(null);

  const location = useLocation({mapRef})

  useEffect(() => {
    return () => {
      StatusBar.setBarStyle(  "light-content")
    };
  }, [])

  const mapReady = () => {
    location.locate()
    getChargerPins()
  }

  const getChargerPins = () =>{
    getAllChargers(dispatch)
  }

  useEffect(() => {
    console.log('====================================');
    console.log(state, "context.state");
    // Todo Vobi: What is the purpose of this listener
    // Todo Vobi: remove this kind of things after using them to debug something
    console.log('====================================');
  }, [state])

  return {
    location,
    mapReady,
    state,
    dispatch
  }
}