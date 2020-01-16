import React, {useEffect, useState,useRef, RefObject,} from "react";
import {AppState, Keyboard, Alert, Animated, TextInput} from "react-native"
import { Defaults, NavigationActions, Const } from "../../../utils";
import {useTranslation} from 'react-i18next';

import useRegistrationHookStep1 from "./registrationHookStep1"
import useRegistrationHookStep2 from "./registrationHookStep2"
import useRegistrationHookStep3 from "./registrationHookStep3"


type _This = {
  code : string,
  newPassword : string,
  phone : string,
  repeatPassword : string,
  codeReceiveAnimation : Animated.Value,
  codeReceiveDisabled : Boolean,
  userRegistrationState : string,
}
const CodeInputWidth = 128

const allPageLength = 4;
export default () => {

  const flatListRef : any = useRef(null);

  const [loading, setLoading] = useState<Boolean>(true);
  const [startCodeAnimation, setStartCodeAnimation] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(0);

  const newPasswordRef : any = useRef(null);
  const repeatPasswordRef : any = useRef(null);

  const { t } = useTranslation();

  const _this : any = useRef({userRegistrationState : 0, codeReceiveAnimation: new Animated.Value(CodeInputWidth)})
  
  const regStep1 = useRegistrationHookStep1(setActivePage, setStartCodeAnimation, t)
  const regStep2 = useRegistrationHookStep2(setActivePage, t)
  const regStep3 = useRegistrationHookStep3(setActivePage, t,regStep1._this,regStep2._this  )

  useEffect(() => {
    _this.current.userRegistrationState = Math.max(activePage, _this.current.userRegistrationState)
    
    paginationClickHandler(activePage)
    
  }, [activePage])

  const paginationClickHandler = (index : number) =>{
    // if(index> _this.current.userRegistrationState) return
    flatListRef.current.scrollToIndex({index, animated: true})
    setActivePage(index)
  }

  const headerRightClick = () =>{
    // show modal 
    Defaults.modal.current &&  Defaults.modal.current.customUpdate(true, {type:1,})
  }

  const registrationStepHandler = () =>{

    if(activePage === allPageLength-1){
      Defaults.modal.current && Defaults.modal.current.customUpdate(true, {type:2,})
      return
    }

    // validate input and continue
    switch (activePage) {
      case 0:
        regStep1.buttonClickHandler()
        break;
      case 1:
        regStep2.buttonClickHandler()
        break;
      case 2:
        regStep3.buttonClickHandler()
        break;
    
      default:
        break;
    }
    
    
  }

  return {
      loading, setLoading, _this,flatListRef,paginationClickHandler,
      startCodeAnimation , t, newPasswordRef, repeatPasswordRef, activePage,
      headerRightClick,registrationStepHandler, regStep1,regStep2,regStep3
    }
}