/* eslint-disable no-unused-vars */
import  { useState,useRef, useContext, useEffect} from "react";
import { Alert, TextInput} from "react-native"
import {useTranslation} from 'react-i18next';
import { AppContext } from "../../../App";
import { AppContextType, Charger, HomeNavigateModes } from "../../../@types/allTypes.d";
import { NavigationState ,NavigationScreenProp, NavigationParams } from "react-navigation";
import { Ajax, Defaults } from "../../../src/utils";
import { MAP_API, MAP_URL, locationIfNoGPS } from "../../../src/utils/const";
import { mergeCoords } from "../../../src/utils/mapAndLocation/mapFunctions";
import Axios from "axios";


type _This = {
  charger: Charger | undefined, 
}


const lastUsedDummy = [
  { address : "ადფასდფას ადფ  ად ასდფასდ ას დფ ასდფ ასდფ ასდფ ასდ ", code : "23423"},
  { address : "ადფასდფას ადფ  ად ასდფასდ ას დფ ასდფ ასდფ ასდფ ასდ ", code : "23423"},
  { address : "ადფასდფას ადფ  ად ასდფასდ ას დფ ასდფ ასდფ ასდფ ასდ ", code : "23423"}
]
const chargerTypesDummy = [
  { type : "ადფასდფას  ", power : "233"},
  { type : "ადფასდფას  ", power : "233"},
  { type : "ადფასდფას  ", power : "233"},
]

const services = [ 
  require("../../../assets/images/icons/arrow_left.png"),
  require("../../../assets/images/icons/arrow_left.png"),
]
export default   (navigation : NavigationScreenProp<NavigationState, NavigationParams>) =>  {


  const context : AppContextType = useContext(AppContext)
  const [loading, SetLoading] = useState<Boolean>(true);
  const [activeChargerType, setActiveChargerType] = useState<Number>(0);

  const _this : React.RefObject<_This> = useRef({charger : navigation.getParam("chargerDetails" , undefined)})

  const chargeWitchCode  : React.RefObject<TextInput> = useRef(null);
  const passwordRef : any = useRef(null);

  const { t,i18n} = useTranslation();

  const lastUsed = () =>{
    // context.state
    // Ajax.get()

    return lastUsedDummy
  }
  const chargerTypes = () =>{
    // Ajax.get()

    return chargerTypesDummy
  }

  const showChargerLocationHandler = () =>{
    navigation.navigate("Home", {mode : HomeNavigateModes.chargerLocateOnMap});
  }

  const chargerLocationDirectionHandler = () =>{
    navigation.navigate("Home", {mode : HomeNavigateModes.showRoutesToCharger});
  }

  const onFavoritePress = () =>{
    Ajax.post("/add-favorite", {charger_id : _this.current?.charger?.charger_id})
      .then(() =>{
        Defaults.dropdown.alertWithType("success", "დაემატა წარმატებით")
      })
      .catch(() =>{
        Defaults.dropdown.alertWithType("error", "დაფიქსიდა შეცდომა")
      })
  }

  const mainButtonClickHandler = () =>{
    navigation.navigate("ChooseChargeMethod")
  }

  const getDistance = () => {
    return Axios.get(`${MAP_URL}/distancematrix/json?origins=${mergeCoords(locationIfNoGPS.lat, locationIfNoGPS.lng)}
      &destinations=${mergeCoords(_this.current?.charger?.lat ?? locationIfNoGPS.lat ,_this.current?.charger?.lng ?? locationIfNoGPS.lng )}
      &mode=driving&units=metric&language=${i18n.language}&key=${MAP_API}`)
  }

  return {loading, SetLoading , _this, passwordRef, t , getDistance,onFavoritePress,showChargerLocationHandler,chargerLocationDirectionHandler,
    chargeWitchCode, lastUsed, chargerTypes, activeChargerType, setActiveChargerType, services, mainButtonClickHandler }
}

