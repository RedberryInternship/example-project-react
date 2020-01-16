import React, {useEffect, useState,useRef, RefObject,} from "react";
import {AppState, Keyboard, Alert, Animated, TextInput} from "react-native"
import { Defaults, NavigationActions, Const } from "../../../utils";
import {useTranslation} from 'react-i18next';
import ajax from "../../../utils/ajax";





export default (setActivePage : any , setStartCodeAnimation : any, t : any) => {

  const flatListRef : any = useRef(null);

  const codeRef : RefObject<TextInput> = useRef(null);
  const _this : RefObject<any> = useRef({phone : '', code:""});


  const phoneInputSubmit = () => {
    // Alert.alert(JSON.stringify(_this.current))
    let {phone} = _this.current
    setStartCodeAnimation(true)
    if(phone == "") return Defaults.dropdown.alertWithType("error", "please, Fill Phone number")
    ajax.post("/send-sms-code", {phone_number : phone})
      .then(({json_status}) => {
        if(json_status == "SMS Sent" ){
          codeRef.current && codeRef.current.focus()
          setStartCodeAnimation(false) 
          Defaults.dropdown.alertWithType("success", "code sent successfully")
        }
      })
      .catch(({error}) =>{
          // if (error)
      })
  }

  const verifyCode = () =>{
    let {code, phone} = _this.current
    ajax.post("/verify-code", {phone_number : phone, code })
    .then(({status, json_status}) => {
      setActivePage(1)

      if(status == 200 ){
        setActivePage(1)
      }
    })
    .catch(({error}) =>{
        // if (error)
    })
  }

  const buttonClickHandler = () =>{
    let {code, phone} = _this.current

    console.log( phone, code, "phone") ;
    if(phone == "") Defaults.dropdown.alertWithType("error", "please, Fill Phone number")
    else  if(code == "") phoneInputSubmit()
    else return verifyCode()

  }

  return {
      phoneInputSubmit,flatListRef,
      codeRef, buttonClickHandler,verifyCode,_this
    }
}