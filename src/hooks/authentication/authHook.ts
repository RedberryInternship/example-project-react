import {useEffect, useState,useRef, useCallback} from "react";
import { Alert, } from "react-native"
import {useTranslation} from 'react-i18next';


export default () => {

  const [loading, SetLoading] = useState<Boolean>(true);
  const [phoneFocused, setPhoneFocused] = useState<any>(false);
  const phoneRef : any = useRef(null);
  const passwordRef : any = useRef(null);

  const { t} = useTranslation();

  const _this : any = useRef({password:"", phone : ''})


  const phoneTextHandler = (val : string) => {
    phoneRef.current.setNativeProps({
      phone : val
    })
    _this.current.phone = val;
    // Ajax.get()
  }

  const phoneInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  const passwordTextHandler = (val : string) => {
    passwordRef.current.setNativeProps({
      password : val
    })
    _this.current.password = val;
    // Ajax.get()
  }

  const passwordInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  const onFocus = () => {
    setPhoneFocused(true)
  }

  return {loading, SetLoading, phoneTextHandler, phoneInputSubmit,passwordTextHandler,passwordInputSubmit, _this, phoneRef, onFocus, phoneFocused, passwordRef, t}
}