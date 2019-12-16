import React, {useEffect, useState,useRef, useCallback} from "react";
import {AppState, Keyboard, Alert, Animated} from "react-native"
import { useAppState } from 'react-native-hooks';
import {useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage, {useAsyncStorage} from "@react-native-community/async-storage";
import { Defaults, NavigationActions } from "../../utils";
import {useTranslation} from 'react-i18next';
import RNLocation, {Location} from 'react-native-location';
import useLocation from "../locationHook";



type _This = {
  code : string,
  newPassword : string,
  phone : string,
  repeatPassword : string,
  codeReceiveAnimation : Animated.Value,
  codeReceiveDisabled : Boolean
}
const CodeInputWidth = 128

export default () => {

  const [loading, SetLoading] = useState<Boolean>(true);
  const [phoneFocused, setPhoneFocused] = useState<any>(false);
  const phoneRef : any = useRef(null);
  const newPasswordRef : any = useRef(null);
  const repeatPasswordRef : any = useRef(null);
  const codeRef : any = useRef(null);

  const { t, i18n } = useTranslation();

  const _this  = useRef<_This>({code:"", phone : '', newPassword : "", repeatPassword:"", codeReceiveAnimation: new Animated.Value(CodeInputWidth), codeReceiveDisabled : false })

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

  const newPasswordTextHandler = (val : string) => {
    newPasswordRef.current.setNativeProps({
      password : val
    })
    _this.current.newPassword = val;
    // Ajax.get()
  }

  const newPasswordInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  const codeTextHandler = (val : string) => {
    codeRef.current.setNativeProps({
      password : val
    })
    _this.current.code = val;
    // Ajax.get()
  }

  const codeInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }
  
  const repeatPasswordTextHandler = (val : string) => {
    repeatPasswordRef.current.setNativeProps({
      password : val
    })
    _this.current.repeatPassword = val;
    // Ajax.get()
  }

  const repeatPasswordInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  const onFocusPhone = () => {
    setPhoneFocused(true)
  }

  const codeReceiveHandler = () => {

    if(_this.current.codeReceiveDisabled) return;
    _this.current.codeReceiveDisabled = true
    _this.current.codeReceiveAnimation.setValue(0)
    //ajax
    Animated.timing(_this.current.codeReceiveAnimation, {
      toValue:CodeInputWidth,
      duration:2000
    }).start(()=>{
      _this.current.codeReceiveDisabled = false
    })

  }

  return {
      loading, SetLoading, phoneTextHandler, phoneInputSubmit,newPasswordTextHandler,newPasswordInputSubmit,
      codeTextHandler, codeInputSubmit,repeatPasswordTextHandler,repeatPasswordInputSubmit, _this, phoneRef,
      phoneFocused, t, codeReceiveHandler, newPasswordRef, repeatPasswordRef, codeRef, onFocusPhone, CodeInputWidth
    }
}