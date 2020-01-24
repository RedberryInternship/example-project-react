/* eslint-disable no-unused-vars */
import  {useRef, RefObject,} from "react";
import {TextInput, Alert} from "react-native"
import { Defaults} from "../../../utils";
import ajax from "../../../utils/ajax";
import { BaseInputRefObject } from "../../../../@types/allTypes";





export default (setActivePage : any , t : any) => {

  const flatListRef : any = useRef(null);

  const phoneRef : BaseInputRefObject  = useRef(null);
  const codeRef : RefObject<TextInput  | any> = useRef(null);
  const _this : RefObject<any> = useRef({phone : '', code:""});


  const phoneInputSubmit = () => {
    let {phone} = _this.current
    if(phone == "") return Defaults.dropdown.alertWithType("error", "please, Fill Phone number")
    
    codeRef.current && codeRef.current.startCodeAnimation();

    ajax.post("/send-sms-code", {phone_number : phone})
      .then(({json_status} : any) => {
        if(json_status == "SMS Sent" ){
          codeRef.current && codeRef.current.focus()
          Defaults.dropdown.alertWithType("success", t("dropDownAlert.registration.codeSentSuccessfully"))
        }
      })
      .catch((error : any) =>{
          if (error){
            /* TODO */
            Defaults.dropdown.alertWithType("error", t("dropDownAlert.generalError")) 

          }
          else {
            Defaults.dropdown.alertWithType("error", t("dropDownAlert.generalError"))
          }
      })
  }

  const verifyCode = () =>{
    let {code, phone} = _this.current
    ajax.post("/verify-code", {phone_number : phone, code })
    .then(({status} : any) => {
      if(status == 200 ){
        setActivePage(1)
      }
    })
    .catch((error : any) =>{
        if(error.data.status === 401){
          Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.incorrectCode"))
        }
        else if(error.data.status === 409) {
          Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.phoneAlreadyToken"))
        }
        else {
          Defaults.dropdown.alertWithType("error", t("dropDownAlert.generalError"))
        }
    })
  }

  const buttonClickHandler = () =>{
    let {code, phone} = _this.current

    console.log( phone, code, "phone")

    if(phone == "") {
      Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.fillPhoneNumber"))
    } 
    else if(code == "") {
      phoneInputSubmit()
    }
    else if(code.length != 4) {
      Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.codeLengthError"))
    }
    else return verifyCode()

  }

  return {
      phoneInputSubmit,flatListRef,phoneRef,
      codeRef, buttonClickHandler,verifyCode,_this
    }
}