import React, {useEffect, useState,useRef, useCallback} from "react";
import {AppState, Keyboard, Alert, Animated} from "react-native"
import { useAppState } from 'react-native-hooks';
import {useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage, {useAsyncStorage} from "@react-native-community/async-storage";
import { Defaults, NavigationActions } from "../../utils";
import {useTranslation} from 'react-i18next';
import RNLocation, {Location} from 'react-native-location';
import useLocation from "../locationHook";


export default () => {

  const [loading, SetLoading] = useState<Boolean>(true);
  const [phoneFocused, setPhoneFocused] = useState<any>(false);
  const phoneRef : any = useRef(null);
  const passwordRef : any = useRef(null);

  const { t, i18n } = useTranslation();

  const _this : any = useRef({code:"", phone : '', newPassword : "", repeatPassword:""})

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
    passwordRef.current.setNativeProps({
      password : val
    })
    _this.current.password = val;
    // Ajax.get()
  }

  const newPasswordInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  const codeTextHandler = (val : string) => {
    passwordRef.current.setNativeProps({
      password : val
    })
    _this.current.password = val;
    // Ajax.get()
  }

  const codeInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }
  
  const repeatPasswordTextHandler = (val : string) => {
    passwordRef.current.setNativeProps({
      password : val
    })
    _this.current.password = val;
    // Ajax.get()
  }

  const repeatPasswordInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  const onFocus = () => {
    setPhoneFocused(true)
  }

  return {
      loading, SetLoading, phoneTextHandler, phoneInputSubmit,newPasswordTextHandler,newPasswordInputSubmit,
      codeTextHandler, codeInputSubmit,repeatPasswordTextHandler,repeatPasswordInputSubmit, _this, phoneRef,
      onFocus, phoneFocused, passwordRef, t
    }
}