/* eslint-disable no-unused-vars */
import {useRef, RefObject,} from "react";
import {TextInput} from "react-native"
import { Defaults} from "../../../utils";
import ajax from "../../../utils/ajax";
import { useAsyncStorage } from "@react-native-community/async-storage";


type RegisterSuccess = {
  json_status: string,
  user: {
    first_name: string,
    last_name: string,
    phone_number: string,
    email: string,
    verified: number,
    id: number
  },
  token: string
}
type RegisterError = {
  email : Array<String>,
  phone_number : Array<String>
}


export default (setActivePage : any, t : any, _this1 : any, _this2 : any ) => {


  const password : RefObject<TextInput> = useRef(null);
  const confirmedPassword : RefObject<TextInput> = useRef(null);

  const { setItem : setToken} = useAsyncStorage("token")
  const { setItem : setUserDetail} = useAsyncStorage("userDetail")

  const _this : RefObject<any> = useRef({password : '', confirmedPassword:''});

  const postData = () =>{
    let {password} = _this.current
    let {phone} = _this1.current
    let {name, surname, email} = _this2.current
    
    ajax.post("/register", 
      {
        first_name : name,
        last_name : surname,
        phone_number : phone ,
        email,
        password
      })
      .then( (data : RegisterSuccess) =>{
        if(data.json_status === "Registered"){
          onSuccessRegistration(data)
        }
      })
      .catch(error => {
          if(typeof error.data === "string"){
            let data :  RegisterError = JSON.parse(error.data)

            if(Object.prototype.hasOwnProperty.call(data, "email") ){
              if(data.email[0] == "The email has already been taken."){
                Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.emailAlreadyToken"))
              }
              else {
                Defaults.dropdown.alertWithType("error", t("dropDownAlert.generalError"))
              }
            }
            else if( Object.prototype.hasOwnProperty.call(data,"phone_number") ){
              if(data.phone_number[0] == "The phone number has already been taken."){
                Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.phoneAlreadyToken"))
              }
              else {
                Defaults.dropdown.alertWithType("error", t("dropDownAlert.generalError"))
              }
            }
            else {
              Defaults.dropdown.alertWithType("error", t("dropDownAlert.generalError"))
            }
          }
          else {
            Defaults.dropdown.alertWithType("error", t("dropDownAlert.generalError"))
          }

      })
  }

  const onSuccessRegistration = async (data : any ) =>{


    Defaults.token = data.token
    Defaults.userDetail = data.user

    await setToken(data.token)
    await setUserDetail(JSON.stringify(data.user) )

    setActivePage(3)

  }

  const buttonClickHandler = () =>{
    let {password, confirmedPassword} = _this.current

    console.log( password, confirmedPassword, "password, confirmedPassword,") ;

    if(password != confirmedPassword ){
      Defaults.dropdown.alertWithType('error', "შეცდომა 😞",'პაროლები ერთმანეთს არ ემთხვევა');
    }
    else if(password.length < 6){
      Defaults.dropdown.alertWithType('error', "შეცდომა 😞",'მინიმუმ 6 სიმბოლო უნდა იყოს პაროლში');
    }
    else postData()
    
  }

  return {
      buttonClickHandler,_this,
      password, confirmedPassword
    }
}