import  { useState,useRef} from "react";
import { Alert, TextInput} from "react-native"
import {useTranslation} from 'react-i18next';


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

const services = [ 
  require("../../../assets/images/icons/arrow_left.png"),
  require("../../../assets/images/icons/arrow_left.png"),
]
export default () => {

  const [loading, SetLoading] = useState<Boolean>(true);
  const [activeChargerType, setActiveChargerType] = useState<Number>(0);

  const _this : React.RefObject<_This> = useRef({chargeWitchCode :""})

  const chargeWitchCode  : React.RefObject<TextInput> = useRef(null);
  const passwordRef : any = useRef(null);

  const { t,} = useTranslation();



  const codeTextHandler = (val : string) => {
    chargeWitchCode.current?.setNativeProps({
      text : val
      
    })
    _this.current!.chargeWitchCode = val;
    // Ajax.get()
  }

  const codeInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  const lastUsed = () =>{
    // Ajax.get()

    return lastUsedDummy
  }
  const chargerTypes = () =>{
    // Ajax.get()

    return chargerTypesDummy
  }

  return {loading, SetLoading, codeTextHandler, codeInputSubmit , _this, passwordRef, t , 
    chargeWitchCode, lastUsed, chargerTypes, activeChargerType, setActiveChargerType, services}
}