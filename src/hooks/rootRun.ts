import {useEffect, useState,useRef} from "react";
import { useAppState } from 'react-native-hooks';
import {useNetInfo} from "@react-native-community/netinfo";
import  {useAsyncStorage} from "@react-native-community/async-storage";
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

    const _this : any = useRef(null)

    Defaults.modal = useRef(null);



    useEffect(() => {

        setItem("token");
        readUserToken();
        readUserLocale()
        // AsyncStorage.clear()
        onReady()
        console.log("remounted", appReady , " appReady");
        
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
        Defaults.token = _token;
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
        console.log("settingNavigationTopLevelElement",ref, NavigationActions()._navigator);

        if( ref === null  ) return

        NavigationActions().setTopLevelNavigator(ref)
        setNavigationState(true);
        onReady()
    }


    useEffect(() => {
        onReady()
    }, [token,navigationState, locale] )

    const onReady =() =>{
        if(navigationState && token !== '' && Defaults && Defaults.token !== '' && locale !== ''){
            if(!appReady)
                setAppReady(true)

            // NavigationActions().navigate("MainDrawer")
            // NavigationActions().navigate("authenticationFlow")
            // NavigationActions().navigate("ForgotPassword")
            // NavigationActions().navigate("Registration")
            // NavigationActions().navigate("Settings");
            // NavigationActions().navigate("ProfileChange");
            // NavigationActions().navigate("ChargerWithCode");
            // NavigationActions().navigate("ChargerDetail");
            // NavigationActions().navigate("NotAuthorized");
            // NavigationActions().navigate("ChoosingCard");
            // NavigationActions().navigate("ChooseChargeMethod");
            // NavigationActions().navigate("Charging");
            // NavigationActions().navigate("Favourites");
            // NavigationActions().navigate("Faq");
            // NavigationActions().navigate("Charging");
            // NavigationActions().navigate("Favorites");
            NavigationActions().navigate("Contact");

        }
        else setAppReady(false)

        console.log(Defaults.token, "App ready to boot");

    }
    return {currentAppState,networkState, token, setNavigationTopLevelElement, appReady, locale, t, _this}
}