import React, {useEffect, useState,useRef, useCallback} from "react";
import {AppState, Keyboard, Alert, } from "react-native"
import { useAppState } from 'react-native-hooks';
import {useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage, {useAsyncStorage} from "@react-native-community/async-storage";
import { Defaults, NavigationActions } from "../utils";
import {useTranslation} from 'react-i18next';



export function  useRoot(){

    const currentAppState = useAppState()
    const networkState = useNetInfo()
    const { t, i18n } = useTranslation();

    const [token, setToken] = useState<null | string>('')
    const [locale, setLocale] = useState<null | string>('');
    const {getItem, setItem} = useAsyncStorage("token")
    const {getItem : getLocaleStorage, setItem : setLocaleStorage} = useAsyncStorage("locale")

    const [appReady, setAppReady] = useState(false);
    const [navigationState, setNavigationState] = useState(false);

    const ref = useRef(null)



    useEffect(() => {
        // setItem("token");
        readUserToken();
        readUserLocale()
        AsyncStorage.clear()
    }, [])

    useEffect(() => {
        if(currentAppState === "active"){
            //call userState Update
        }
        else if(currentAppState.match(/inactive|background/)){
            //do some background tasks
        }

        if(networkState.isConnected){
            //call userState Update
        }
        else if (!networkState.isConnected){
            //show alert
        }

    }, [currentAppState, networkState])

    const readUserToken = async () => {
        let _token = await getItem();
        Defaults.token= _token;
        setToken(_token)
    }

    const readUserLocale =  async () => {
        let _locale = await getLocaleStorage();

        if(_locale === null) {
            _locale = "ka";
            setLocaleStorage("ka");
        }
        else {
            i18n.changeLanguage(_locale)
        }
        
        Defaults.locale = _locale;
        setLocale(_locale)
    }


    const setNavigationTopLevelElement = (ref : any) =>{
        console.log("settingNavigationTopLevelElement");

        if( ref === null ) return

        NavigationActions.default.setTopLevelNavigator(ref)
        setNavigationState(true);
    }


    useEffect(() => {
        if(navigationState && token !== '' && Defaults && Defaults.token !== '' && locale !== '' && appReady === false ){
            setAppReady(true)
            NavigationActions.default.navigate("MainDrawer")
            // NavigationActions.default.navigate("authenticationFlow")
            console.log("app ready to boot");
        }
        else setAppReady(false)
    },[token,navigationState, locale])

    return {currentAppState,networkState, token, setNavigationTopLevelElement, appReady, locale, t}
}