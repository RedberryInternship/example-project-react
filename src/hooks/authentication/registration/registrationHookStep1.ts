/* eslint-disable no-unused-vars */
import  {useRef, RefObject,} from "react";
import {TextInput} from "react-native"
import { Defaults} from "../../../utils";
import ajax from "../../../utils/ajax";





export default (setActivePage : any , setStartCodeAnimation : any, t : any) => {

  const flatListRef : any = useRef(null);

  const phoneRef : RefObject<TextInput> = useRef(null);
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
          Defaults.dropdown.alertWithType("success", t("dropDownAlert.registration.codeSentSuccessfully"))
        }
      })
      .catch(({error}) =>{
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
    .then(({status}) => {
      if(status == 200 ){
        setActivePage(1)
      }
    })
    .catch((error) =>{
        if(error.data.status === 401){
          Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.incorrectCode"))
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