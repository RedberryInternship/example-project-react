import React, {useEffect, useState,useRef, useCallback} from "react";
import {AppState, Keyboard, Alert, Animated} from "react-native"
import { useAppState } from 'react-native-hooks';
import {useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage, {useAsyncStorage} from "@react-native-community/async-storage";
import { Defaults, NavigationActions, Const } from "../../utils";
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

const allPageLength = 4;
export default () => {

  const flatListRef : any = useRef(null);

  const [loading, SetLoading] = useState<Boolean>(true);
  const [phoneFocused, setPhoneFocused] = useState<any>(false);
  const [activePage, setActivePage] = useState<number>(0);

  const phoneRef : any = useRef(null);
  const newPasswordRef : any = useRef(null);
  const repeatPasswordRef : any = useRef(null);
  const codeRef : any = useRef(null);

  const { t, i18n } = useTranslation();

  const _this  = useRef<_This>({ phone : '',code:"", newPassword : "", repeatPassword:"", codeReceiveAnimation: new Animated.Value(CodeInputWidth), codeReceiveDisabled : false })

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


  const paginationClickHandler = (index : number) =>{
    flatListRef.current.scrollToIndex({index, animated: true})
    setActivePage(index)
  }

  const headerRightClick = () =>{
    // show modal 
    Defaults.modal.current.showModal(1)
  }
  const registrationStepHandler = () =>{
    // validate input and continue

    if(activePage === allPageLength-1){
      Defaults.modal.current.showModal(2)
      return
    }
    paginationClickHandler(activePage+1)
    
  }

  return {
      loading, SetLoading, phoneTextHandler, phoneInputSubmit, _this, phoneRef,flatListRef,paginationClickHandler,
      phoneFocused, t, newPasswordRef, repeatPasswordRef, codeRef,  CodeInputWidth, activePage, headerRightClick,registrationStepHandler
    }
}