/* eslint-disable no-unused-vars */
import  { useState,useRef, useContext} from "react";
import { Alert, TextInput} from "react-native"
import {useTranslation} from 'react-i18next';
import { AppContext } from "../../../App";
import { AppContextType, Charger } from "../../../@types/allTypes";
import { NavigationState ,NavigationScreenProp, NavigationParams } from "react-navigation";
import { Defaults } from "../../../src/utils";


type _This = {
  chargeWitchCode: string, 
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

export default (navigation : NavigationScreenProp<NavigationState, NavigationParams>) =>  {


  const context : AppContextType = useContext(AppContext)
  const [loading, SetLoading] = useState<Boolean>(true);
  const [activeChargerType, setActiveChargerType] = useState<Number>(0);

  const _this : React.RefObject<_This> = useRef({chargeWitchCode :""})

  const chargeWitchCode  : React.RefObject<TextInput> = useRef(null);
  const passwordRef : any = useRef(null);

  const { t,} = useTranslation();



  const codeTextHandler = (val : string) => {
    _this.current!.chargeWitchCode = val;
    // Ajax.get()
  }

  const codeInputSubmit = () => {

    if(_this.current?.chargeWitchCode == ''){
      return Defaults.dropdown.alertWithType("error", t("dropDownAlert.fillCode"))
    }

    let charger = context.state.AllChargers?.filter((val : Charger) => {
      return val.code == _this.current?.chargeWitchCode 
    }) ?? []

    if(charger.length == 0) {
      return Defaults.dropdown.alertWithType("error", t("dropDownAlert.chargerNotExist"))
    }
    console.log('====================================');
    console.log(charger, _this.current?.chargeWitchCode, "charger");
    console.log('====================================');

    navigation.navigate("ChargerDetail", {chargerDetails : charger[0] } )
    
  }

  const lastUsed = () =>{
    context
    // Ajax.get()

    return lastUsedDummy
  }
  const chargerTypes = () =>{
    // Ajax.get()

    return chargerTypesDummy
  }

  return {loading, SetLoading, codeTextHandler, codeInputSubmit , _this, passwordRef, t , 
    chargeWitchCode, lastUsed, chargerTypes, activeChargerType, setActiveChargerType}
}