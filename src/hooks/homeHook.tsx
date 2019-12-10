import React, {useEffect, useState,useRef, useCallback} from "react";
import {AppState, Keyboard, Alert, } from "react-native"
import { useAppState } from 'react-native-hooks';
import {useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage, {useAsyncStorage} from "@react-native-community/async-storage";
import { Defaults, NavigationActions } from "../utils";
import {useTranslation} from 'react-i18next';
import RNLocation, {Location} from 'react-native-location';
import useLocation from "./locationHook";


export default function  useMap({map : mapRef} : any){

  const [loading, SetLoading] = useState<Boolean>(true);



    return {loading, SetLoading}
}